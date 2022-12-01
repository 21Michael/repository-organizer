import { noteModel, repositoryModel, userModel } from "../../databases/models";
import cacheClient from '../../config/redis';
import UserService from "./user.service";
import NoteService from "./note.service";
import RepositoryService from "./repository.service";

export default {
  User: new UserService(userModel),
  Note: new NoteService({ db: noteModel, cache: cacheClient }),
  Repository: new RepositoryService({ db:repositoryModel, cache: cacheClient })
};
