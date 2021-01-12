import createDOMPurify, { DOMPurifyI } from "dompurify";
import { JSDOM } from "jsdom";
import { Request, Response, NextFunction } from 'express'

const windowEmulator: any = new JSDOM("").window;
const DOMPurify: DOMPurifyI = createDOMPurify(windowEmulator);

const sanitize = (req: Request, res: Response, next: NextFunction) => {
  Object.keys(req.body).forEach(
    (key) => (req.body[key] = DOMPurify.sanitize(req.body[key]))
  );
  return next();
};

export default sanitize;
