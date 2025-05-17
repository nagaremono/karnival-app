import { MyContext } from 'src/types';
import { MiddlewareFn } from 'type-graphql';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  tokenUse: 'access',
  clientId: process.env.COGNITO_CLIENT_ID!,
});

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.user) {
    throw new Error('Not Authenticated');
  }

  return next();
};

export const attachIdentity: MiddlewareFn<MyContext> = async (
  { context },
  next,
) => {
  const authHeader = context.req.header('authorization');
  if (!authHeader) {
    return next();
  }
  const token = authHeader.split(' ')[1];
  const payload = await verifier.verify(token).catch();
  context.req.user = payload;

  return next();
};
