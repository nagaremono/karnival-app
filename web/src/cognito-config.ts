import { AuthProviderProps } from 'react-oidc-context';

export const cognitoAuthConfig: AuthProviderProps = {
  authority: process.env.NEXT_PUBLIC_OIDC_AUTHORITY || '',
  client_id: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID || '',
  redirect_uri: process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI || '',
  response_type: 'code',
  scope: 'email openid phone profile',
};

export default cognitoAuthConfig;
