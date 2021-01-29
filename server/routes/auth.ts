import { DbError } from './../types/routes/auth';
import { UserModel as UserModelMongo } from './../types/databases/models/mongo/user';
import { UserModel as UserModelPostgres } from './../types/databases/models/postgres/user';
import createRouter, { Request, Response } from "express";
import passport from "../middlewares/passport";
import sanitize from "../middlewares/sanitize";
import db from "../services/index";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import authentication from '../middlewares/authentication';
import { checkCsrfMiddleware } from '../middlewares/csrf';

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
    req.logIn(user, { session: false }, function (error: Error) {
      if (error) {
        return res.status(500).send(error.message);
      }
      const privateKey = fs.readFileSync('./config/keys/private.key', 'utf8');
      const payload = JSON.stringify(user);
      const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' }, { expiresIn: '1h' });

      return res.cookie('token', token, { httpOnly: true, secure: true }).redirect(`${process.env.LOCAL_HOST}`);
    });
  })(req, res);
}

const signOut = (req: Request, res: Response) => {
  try {
    res.clearCookie('token').send("Current user was logged out");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const currentUser = (req: Request, res: Response) => {
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

const signIn = (req: any, res: Response) => {
  passport.authenticate("local", function (error: DbError, user: UserModelMongo | UserModelPostgres, info: { message: string }) {
    if (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        error.message = 'Invalid email: email must be unique!';
      }
      return res.status(401).send(error.message);
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    req.logIn(user, { session: false }, function (err) {
      if (err) {
        return res.status(500).send(error.message);
      }
      const privateKey = fs.readFileSync('./config/keys/private.key', 'utf8');
      const payload = JSON.stringify(user);
      const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' }, { expiresIn: '1h' });
      return res.cookie('token', token, { httpOnly: true, secure: true }).send("User signed in!");
    });
  })(req, res)
}

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", signByGitHub);
router.get("/sign-out", signOut);
router.get("/current-user", checkCsrfMiddleware, authentication, currentUser);
router.post("/sign-up", sanitize, signUp);
router.post("/sign-in", signIn);

export default router;
