import { Request, Response, NextFunction } from 'express'
import fs from 'fs';
import jwt from 'jsonwebtoken';

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const publicKey = fs.readFileSync('./config/keys/public.key', 'utf8');
    const token = req.headers.cookie.match(/(?<=token=).+/g)[0];
    req.user = jwt.verify(token, publicKey, { algorithm: 'RS256' });
    return next();
  } catch (error) {
    return res.status(401).send("Authentication denied!");
  }
};

export default authentication;