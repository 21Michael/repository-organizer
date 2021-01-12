import Repository from "../../databases/models/postgres/repository.model";
import Note from '../../databases/models/postgres/note.model';
import User from '../../databases/models/postgres/user.model';
import UserService from "./user.service";
import NoteService from "./note.service";
import RepositoryService from "./repository.service";

export default {
  User: new UserService(User),
  Note: new NoteService(Note),
  Repository: new RepositoryService(Repository),
};
