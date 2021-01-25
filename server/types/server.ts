export interface CookieOptions {
    maxAge: number;
    keys: string[],
    resave: boolean,
    saveUninitialized: boolean,
    secure: boolean,
    httpOnly: boolean
}