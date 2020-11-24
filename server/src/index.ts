import 'reflect-metadata';
import 'dotenv-safe/config';
import { COOKIE_NAME, __prod__ } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { Agenda } from './entities/Agenda';
import { AgendaResolver } from './resolvers/agenda';
import { Participation } from './entities/Participation';
import { createUserLoader } from './utils/createUserLoader';
import { MyContext } from './types';
import { createParticipationLoader } from './utils/createParticipationLoader';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [Agenda, User, Participation],
    logging: true,
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

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
      },
      saveUninitialized: false,
    })
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
