import { MyContext } from 'src/types';
import { MiddlewareFn } from 'type-graphql';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  tokenUse: 'access',
  clientId: process.env.COGNITO_CLIENT_ID!,
});

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authHeader = context.req.header('authorization');
  if (!authHeader) {
    throw new Error('Not Authenticated');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = await verifier.verify(token);
    context.req.user = payload;
  } catch {
    throw new Error('Not Authenticated');
  }

  return next();
};
