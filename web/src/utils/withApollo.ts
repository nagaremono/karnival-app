import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createWithApollo } from './createWithApollo';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
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

export const withApollo = createWithApollo(createClient);
