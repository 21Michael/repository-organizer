import { CookieOptions } from './types/server';
import express, { Request, Response, Express } from "express";
import path from 'path'
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import 'dotenv/config';
import logger, { morganOption } from "./config/winston";
import morgan from "morgan";
import routes from './routes/index'
import cookieParser from 'cookie-parser';
import { createCsrfMiddleware } from './middlewares/csrf'

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

const httpsOptions = {
  key: fs.readFileSync("./config/www/keys/key.pem"),
  cert: fs.readFileSync("./config/www/keys/cert.pem")
};

const cookieOptions: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
  resave: false,
  saveUninitialized: false,
  secure: true,
  httpOnly: true
}

app.use(morgan("combined", morganOption));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser())
app.use(cookieSession(cookieOptions));
app.use(passport.initialize());
app.use('*', createCsrfMiddleware);
app.use('/', routes);

const mode: string = process.env.NODE_ENV;

try {
  if (mode === "production ") {
    app.use(express.static("../client/build"));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "/index.html"));
    });
  }
  https.createServer(httpsOptions, app).listen(port, () => {
    console.log("Server works on port: " + port);
  });
} catch (error) {
  console.log("Error: " + error);
  process.exit(1);
}

export default app

