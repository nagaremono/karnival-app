import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';
import { HelloResolver } from './resolvers/hello';
// import { UserResolver } from './resolvers/user';
import cors from 'cors';
import { AgendaResolver } from './resolvers/agenda';
// import { createUserLoader } from './utils/createUserLoader';
import { createParticipationLoader } from './utils/createParticipationLoader';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { MyContext } from './types';
import dataSource from './datasource';

const main = async () => {
  await dataSource.initialize();

  const app = express();

  app.set('trust proxy', 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        // UserResolver,
        AgendaResolver,
      ],
      validate: false,
    }),
  });
  await apolloServer.start();

  // app.use(gitHubAuth);

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<MyContext> =>
        <MyContext>{
          req,
          res,
          // userLoader: createUserLoader(),
          participationLoader: createParticipationLoader(),
        },
    }),
  );

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
