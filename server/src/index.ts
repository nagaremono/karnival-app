import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/user';
import cors from 'cors';
import { AgendaResolver } from './resolvers/agenda';
import { createUserLoader } from './utils/createUserLoader';
import { MyContext } from './types';
import { createParticipationLoader } from './utils/createParticipationLoader';
// import { gitHubAuth } from './middlewares/githubAuth';

const main = async () => {
  await createConnection();

  const app = express();

  app.set('trust proxy', 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN,
    })
  );

  // app.use(gitHubAuth);

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
