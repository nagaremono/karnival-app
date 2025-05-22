import CognitoProvider from 'next-auth/providers/cognito';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';

export const config = {
  providers: [
    CognitoProvider({
      issuer: process.env.COGNITO_ISSUER || '',
      clientId: process.env.COGNITO_CLIENT_ID || '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
      region: 'ap-southeast-3',
      client: {
        client_id: process.env.COGNITO_CLIENT_ID || '',
        client_secret: process.env.COGNITO_CLIENT_SECRET || '',
        redirect_uris: [process.env.COGNITO_REDIRECT_URI || ''],
        response_types: ['code'],
      },
    }),
  ],
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
