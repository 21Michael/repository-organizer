import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import cookieExtraktor from '../utiles/cookieExtractor';

export const checkCsrfMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cryptedHeaderToken: string = decodeURIComponent(req.get('XSRF-TOKEN-CRYPTED'));
        const cookieToken: string = decodeURIComponent(cookieExtraktor(req.headers.cookie)['XSRF-TOKEN']);
        const cryptedCookieToken: string = await crypto.createHash('sha256').update(cookieToken).digest('base64');
        const validTokens: boolean = cryptedHeaderToken === cryptedCookieToken;
        if (!validTokens) { throw new Error(); }
        return next();
    } catch (error) {
        return res.status(403).send("Invalid XSRF-Token!");
    }
};

export const createCsrfMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.cookie && cookieExtraktor(req.headers.cookie)['XSRF-TOKEN'];
    if (!token) {
        const token: string = await crypto.randomBytes(75).toString('base64');
        const cryptedToken: string = await crypto.createHash('sha256').update(token).digest('base64');
        res.cookie('XSRF-TOKEN', token, { httpOnly: true, secure: true })
        res.cookie('XSRF-TOKEN-CRYPTED', cryptedToken, { secure: true })
    }
    return next();
};

