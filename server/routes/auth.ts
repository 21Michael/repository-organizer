import { DbError } from '../types/routes/auth';
import { UserModel as UserModelMongo } from './../types/databases/models/mongo/user';
import { UserModel as UserModelPostgres } from './../types/databases/models/postgres/user';
import createRouter, { Request, Response } from "express";
import passport from "../middlewares/passport";
import sanitize from "../middlewares/sanitize";
import db from "../services/index";

const router = createRouter.Router()
const UserDB = db.User;

const signByGitHub = (req: Request, res: Response) => {
  passport.authenticate("github", function (error: Error, user: UserModelMongo | UserModelPostgres, info: { message: string }) {
    if (error) {
      return res.status(401).send(error.message);
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    req.logIn(user, function (error: Error) {
      if (error) {
        return res.status(500).send(error.message);
      }
      return res.redirect(`${process.env.REDIRECT_URL}`);
    });
  })(req, res);
}

const signOut = async (req: Request, res: Response) => {
  try {
    await req.logout();
    res.send("Current user was logged out");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const currentUser = (req: Request, res: Response) => {
  console.log('!!!!!!!!!!!!!!!currentUser:', req.user)
  return req.user
    ? res.json(req.user)
    : res.status(401).send("No one user currently logged in");
}

const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const signedBy = "local";
    const newUser: UserModelMongo | UserModelPostgres = await UserDB.createUser({ name, email, signedBy, password });
    const newUserId: string = newUser.id;
    res.setHeader("Location", `${req.baseUrl}/${newUserId}`);
    res.status(201).send("User signed up!");
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      error.message = 'Invalid email: email must be unique!';
    }
    res.status(400).send(error.message);
  }
}

const signIn = (req: Request, res: Response) => {
  passport.authenticate("local", function (error: DbError, user: UserModelMongo | UserModelPostgres, info: { message: string }) {
    if (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        error.message = 'Invalid email: user already logged in!';
      }
      return res.status(401).send(error.message);
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).send(error.message);
      }
      return res.send("User signed in!");
    });
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(req.user)
  })(req, res)
}

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", signByGitHub);
router.get("/sign-out", signOut);
router.get("/current-user", currentUser);
router.post("/sign-up", sanitize, signUp);
router.post("/sign-in", signIn);

export default router;
