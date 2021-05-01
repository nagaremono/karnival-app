import 'reflect-metadata';
import 'dotenv-safe/config';
import { COOKIE_NAME, __prod__ } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { createConnection, In } from 'typeorm';
import { UserResolver } from './resolvers/user';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { AgendaResolver } from './resolvers/agenda';
import { createUserLoader } from './utils/createUserLoader';
import { MyContext } from './types';
import { createParticipationLoader } from './utils/createParticipationLoader';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from './entities/User';

const main = async () => {
  await createConnection();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set('trust proxy', 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
        domain: __prod__ ? '.guruhedi.com' : undefined,
      },
      saveUninitialized: false,
    })
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRETS,
        callbackURL: 'http://localhost:4000/auth/github/callback',
        scope: ['user:email'],
      },
      async function (_: any, __: any, profile: any, done: any) {
        const { id, emails, username } = profile;

        const emailList = emails.map((e: any) => e.value);

        const user = await User.findOne({
          where: [{ email: In(emailList) }, { githubId: id }],
        });

        if (!user) {
          const newUser = await User.create({
            githubId: id,
            email: emailList[0] || undefined,
            username: username,
          }).save();

          return done(null, newUser);
        }

        if (!user.githubId) {
          user.githubId = id;
          await user.save();
        }

        return done(null, user);
      }
    )
  );

  app.use(passport.initialize());

  app.get(
    '/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
  );

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { session: false }),
    (req, res) => {
      req!.session!.userId = (req.user as any).id;

      console.log(req.user);

      res.status(200).send({ done: true });
    }
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, AgendaResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext =>
      <MyContext>{
        req,
        res,
        userLoader: createUserLoader(),
        participationLoader: createParticipationLoader(),
      },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
