import { Request, Response } from 'express';
import { createParticipationLoader } from './utils/createParticipationLoader';
import { createUserLoader } from './utils/createUserLoader';

export type MyContext = {
  req: Request & { user: { sub: string } };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  participationLoader: ReturnType<typeof createParticipationLoader>;
};
