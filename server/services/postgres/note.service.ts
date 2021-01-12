import { NoteStatic } from './../../types/databases/models/postgres/note';

const NoteService = class {
  private noteModel: NoteStatic;
  constructor(model) {
    this.noteModel = model;
  }
  findAll({ id }) {
    return this.noteModel.findAll({ where: { user_id: id } });
  }

  createNote({ repositoryId, text, createdAt, userId }) {
    return this.noteModel.create({
      repository_id: repositoryId,
      text,
      created_at: createdAt,
      user_id: userId,
    });
  }

  deleteOne({ userId, noteId }) {
    return this.noteModel.destroy({
      where: {
        user_id: userId,
        id: noteId,
      },
    });
  }

  updateOne({ text, userId, noteId }) {
    return this.noteModel.update({ text }, { where: { user_id: userId, id: noteId } });
  }

  findOne({ userId, noteId }) {
    return this.noteModel.findOne({ where: { user_id: userId, id: noteId } });
  }
};

export default NoteService;
