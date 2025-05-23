import CognitoProvider from 'next-auth/providers/cognito';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions, Session } from 'next-auth';
import { getServerSession } from 'next-auth';

export type UserSession = {
  accessToken?: string;
  idToken?: string;
} & Session;

export const config = {
  providers: [
    CognitoProvider({
      issuer: process.env.COGNITO_ISSUER || '',
      clientId: process.env.COGNITO_CLIENT_ID || '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
      region: 'ap-southeast-3',
      client: {
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
