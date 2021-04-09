import { UserInputError } from 'apollo-server-express';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const authentication = async (parent, params, { req }) => {
  try {
    const publicKey = fs.readFileSync('./config/keys/public.key', 'utf8');
    const token = req.headers.cookie.match(/(?<=token=).+/g)[0];
    req.user = jwt.verify(token, publicKey, { algorithm: 'RS256' });
  } catch (error) {
    throw new UserInputError("Authentication denied!");
  }
};

export default authentication;
