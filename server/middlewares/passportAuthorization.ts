import { UserModel as UserModelMongo } from '../types/databases/models/mongo/user';
import { UserModel as UserModelPostgres } from '../types/databases/models/postgres/user';
import { DbError } from "../types/routes/auth";
import passport from "./passportStrategies";
import jwt from 'jsonwebtoken';
import fs from 'fs';

export const localAuthorization = async (parent, params, { req, res }) => {
	req.body = await new Promise((resolve) => {
		passport.authenticate("local", function (error: DbError, user: UserModelMongo | UserModelPostgres, info: { message: string }) {
			if (error) resolve({ error: error.message });
			if (!user) resolve({ error: info.message });

			const privateKey = fs.readFileSync('./config/keys/private.key', 'utf8');
			const payload = JSON.stringify(user);
			const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' }, { expiresIn: '1h' });
			res.cookie('token', token, { httpOnly: true, sameSite: true });

			resolve({ error: false });
		})(req, res);
	})
};

