import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../lib/auth';
import { MyContext } from '../types';
import { MiddlewareFn } from 'type-graphql';

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
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(context.req.headers),
  });
  if (session) {
    context.req.user = session?.user;
  }

  return next();
};
