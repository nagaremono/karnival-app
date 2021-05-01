import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from '../entities/User';
import { In } from 'typeorm';
import express from 'express';

const router = express.Router();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRETS,
      callbackURL: `${process.env.SERVER_BASE_URL}/auth/github/callback`,
      scope: ['user:email'],
    },
    async function (_: any, __: any, profile: any, done: any) {
      const { id, emails, username } = profile;

      const emailList = emails.map((e: any) => e.value);

      const user = await User.findOne({
        where: [{ email: In(emailList) }, { githubId: id }],
      });

      if (!user) {
        const newUser = await User.create({
          githubId: id,
          email: emailList[0] || undefined,
          username: username,
        }).save();

        return done(null, newUser);
      }

      if (!user.githubId) {
        user.githubId = id;
        await user.save();
      }

      return done(null, user);
    }
  )
);

router.use(passport.initialize());

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    req!.session!.userId = (req.user as any).id;

    res.redirect(process.env.ORIGIN);
  }
);

export { router as gitHubAuth };
