import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';
import { UserResolver } from './resolvers/user';
import cors from 'cors';
import { AgendaResolver } from './resolvers/agenda';
import { createUserLoader } from './utils/createUserLoader';
import { createParticipationLoader } from './utils/createParticipationLoader';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { MyContext } from './types';
import dataSource from './datasource';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const main = async () => {
  await dataSource.initialize();

  const app = express();

  app.set('trust proxy', 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN,
      methods: ['GET', 'POST'],
    }),
  );

  app.all('/api/auth/*', toNodeHandler(auth));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, AgendaResolver],
      validate: false,
    }),
  });
  await apolloServer.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<MyContext> =>
        <MyContext>{
          req,
          res,
          userLoader: createUserLoader(),
          participationLoader: createParticipationLoader(),
        },
    }),
  );

  app.get('/health', (_, res) => {
    res.sendStatus(200);
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
