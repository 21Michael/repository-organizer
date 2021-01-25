import { UserModel as UserModelMongo } from './../types/databases/models/mongo/user';
import { UserModel as UserModelPostgres } from './../types/databases/models/postgres/user';
import passport from "passport";
import LocalStrategy from "passport-local";
import GitHubStrategy from "passport-github";
import bcrypt from "bcryptjs";
import db from "../services/index";

const User = db.User;

passport.use(
  new LocalStrategy.Strategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user: UserModelMongo | UserModelPostgres = await User.findOneByEmail({ email });
        if (!user) {
          return done(null, false, { message: "User doesn't exist!" });
        }
        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Wrong password!" });
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new GitHubStrategy.Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_KEY,
      callbackURL: "/auth/github/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user: UserModelMongo | UserModelPostgres = await User.findOneByGitHubId({ id: profile.id });
        if (user) {
          return done(null, user);
        }
        if (!user) {
          const { login, id, avatar_url, html_url } = profile._json;
          const newUser: UserModelMongo | UserModelPostgres = await User.createUserGitHub({
            name: login,
            signedBy: 'github',
            githubId: id,
            avatarURL: avatar_url,
            profileURL: html_url
          });
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
