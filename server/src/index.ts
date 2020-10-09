import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user';

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'karnivaldev',
    username: 'postgres',
    password: 'postgres',
    synchronize: true,
    entities: [User],
    logging: true,
  });
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server started on port 4000');
  });
};

main().catch((err) => {
  console.error(err);
});
