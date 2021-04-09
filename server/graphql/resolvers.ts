import { paramsToRequest } from '../utiles/graphql';
import { localAuthorization } from '../middlewares/passportAuthorization';
import { UserInputError } from "apollo-server-express";
import db from "../services/index";
import { combineResolvers as combine } from 'graphql-resolvers'
import authentication from '../middlewares/authentication';

const { User, Repository, Note } = db;

const resolvers = {
	Query: {
		currentUser: combine(
			authentication,
			(parent, params, { req }) => {
				if (!req.user) throw new UserInputError("No one user currently logged in");
				return req.user;
			}),
		repositories: () => {
			return Repository.findAll();
		},
		notes: combine(
			authentication,
			(parent, params, { req }) => {
				return Note.findAll({ id: req.user.id });
			})
	},
	Mutation: {
		signIn: combine(
			paramsToRequest,
			localAuthorization,
			(parent, params, { req }) => {
				const { error } = req.body
				if (error) throw new UserInputError(error);
				return 'User signed in!';
			}),
		signUp: combine(
			paramsToRequest,
			async (parent, { name, email, password }, { req }) => {
			const { error } = req.body
			const user = await User.findOneByEmail({ email });

			if (error) throw new UserInputError(error);
			if (user) throw new UserInputError("User with same email already exists!")

			const newUser = await User.createUser({ user_name: name, email, password, signed_by: 'local' });

			return newUser && 'User signed up!';
		}),
		signOut: combine(
			authentication,
			(parent, params, { res }) => {
				res.clearCookie('token');
				return 'User signed out!';
			}),
		removeRepository: combine(
			authentication,
			async (parent, { id }) => {
				await Repository.deleteOne({ id });
				return { _id: id };
			}),
		updateRepository: combine(
			authentication,
			(parent, { data }) => {
				return Repository.updateOne(data);
			}),
		addRepository: combine(
			authentication,
			(parent, { data }, { req }) => {
				return Repository.createRepository({ ...data, user_id: req.user.id });
			}),
		removeNote: combine(
			authentication,
			async (parent, { note_id }, { req }) => {
				await Note.deleteOne({ note_id, user_id: req.user.id });
				return { _id: note_id };
			}),
		updateNote: combine(
			authentication,
			(parent, { data }, { req }) => {
				return Note.updateOne({ ...data, user_id: req.user.id });
			}),
		addNote: combine(
			authentication,
			(parent, { data }, { req }) => {
				return Note.createNote({ ...data, user_id: req.user.id });
			}),
	}
};

export default resolvers;