import { UserInputError } from "apollo-server-express";
import db from "../services/index";
import { UserModel as UserModelMongo } from './../types/databases/models/mongo/user';
import { UserModel as UserModelPostgres } from './../types/databases/models/postgres/user';

const { User, Repository, Note } = db;

export const isUserExists = async (parent, params) => {
    const { email } = params.args;
    const user: UserModelMongo | UserModelPostgres = await User.findOneByEmail({ email });
    if (user) throw new UserInputError('User with same email already exists!', { invalidArgs: email });
};