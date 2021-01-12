import { Request, Response, NextFunction } from 'express'

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("Authentication denied!");
};

export default authentication;
