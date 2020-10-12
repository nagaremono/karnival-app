import { ApolloClient, InMemoryCache } from '@apollo/client';
import { withApollo as createWithApollo } from 'next-apollo';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          agendas: {
            keyArgs: [],
            merge(existing: [] = [], incoming: []) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export const withApollo = createWithApollo(client);
