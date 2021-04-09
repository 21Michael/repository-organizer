import { UserModel as UserModelMongo } from '../types/databases/models/mongo/user';
import { UserModel as UserModelPostgres } from '../types/databases/models/postgres/user';
import passport from "passport";
import LocalStrategy from "passport-local";
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

export default passport;
