import express, { Request, Response, Express } from "express";
import path from 'path';
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import 'dotenv/config';
import morgan from "morgan";

import { CookieOptions } from "./types/server";
import mongoDBConnection from "./config/mongoose";
import logger, { morganOption } from "./config/winston";
import routes from "./routes/index";

const app = express();
const port: string | number = process.env.PORT || 4000;

const cookieOptions: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
  resave: false,
  saveUninitialized: false,
}

app.use(morgan("combined", morganOption));
app.use(cors());
app.use(express.json());
app.use(cookieSession(cookieOptions));
app.use(passport.initialize());
app.use(passport.session());

const start = async () => {
  try {
    await mongoDBConnection()
    app.use('/', routes);
    app.listen(port, () => {
      console.log("Server works on port: " + port);
    });
  } catch (error) {
    console.log("Error: " + error);
    process.exit(1);
  }
}

start()

export default app

