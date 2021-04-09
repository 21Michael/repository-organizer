import { CookieOptions } from './types/server';
import express, { Request, Response, Express } from "express";
import path from 'path'
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import 'dotenv/config';
import { morganOption } from "./config/winston";
import morgan from "morgan";
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { ApolloServer } from 'apollo-server-express';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => { return { req, res } }
});
const app: Express = express();
const port: string | number = process.env.PORT || 3000;

const cookieOptions: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
  resave: false,
  saveUninitialized: false,
}

app.use(morgan("combined", morganOption));
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieSession(cookieOptions));
app.use(passport.initialize());
app.use(passport.session());

const mode: string = process.env.NODE_ENV;

try {
  if (mode === "production ") {
    app.use(express.static("../client/build"));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "/index.html"));
    });
  }
  server.applyMiddleware({ app, path: '/' });
  app.listen(port, () => {
    console.log(`Server works on port: ${port}`);
  });
} catch (error) {
  console.log("Error: " + error);
  process.exit(1);
}

export default app

