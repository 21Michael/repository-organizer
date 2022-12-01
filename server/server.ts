import { CookieOptions } from './types/server';
import express, { Request, Response, Express } from "express";
import path from 'path';
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import 'dotenv/config';
import logger, { morganOption } from "./config/winston";
import morgan from "morgan";
import routes from './routes/index';
import sequelize from './config/sequelize';
import redis from './config/redis';

const app = express();
const port: string | number = process.env.PORT || 4000;

const cookieOptions: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
  resave: false,
  saveUninitialized: true,
}

app.use(morgan("combined", morganOption));
app.use(
  cors({
    credentials: true,
    origin: process.env.REDIRECT_URL,
    exposedHeaders: ['location']
  }),
);
app.use(express.json());
app.use(cookieSession(cookieOptions));
app.use(passport.initialize());
app.use(passport.session());

const mode = process.env.NODE_ENV;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await redis.connect();

    app.use('/', routes);
    if (mode === "production ") {
      app.use(express.static("../client/build"));
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "/index.html"));
      });
    }
    app.listen(port, () => {
      console.log("Server works on port: " + port);
    });
  } catch (error) {
    console.log("Error: " + error);
    process.exit(1);
  }
}

start();

export default app;

