import mongoDBConnection from "../../config/mongoose";
import UserService from "./user.service";
import NoteService from "./note.service";
import RepositoryService from "./repository.service";
import Note from "../../databases/models/mongo/note.model";
import Repository from "../../databases/models/mongo/repository.model";
import User from "../../databases/models/mongo/user.model";

mongoDBConnection();

export default {
  User: new UserService(User),
  Note: new NoteService(Note),
  Repository: new RepositoryService(Repository),
};
