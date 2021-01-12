import { Schema } from 'mongoose';

const NoteService = class {
  private noteModel: Schema;
  constructor(model) {
    this.noteModel = model;
  }
  findAll({ id }) {
    return this.noteModel.find({ user_id: id });
  }
  createNote({ repositoryId, text, createdAt, userId }) {
    return new this.noteModel({
      repository_id: repositoryId,
      text,
      created_at: createdAt,
      user_id: userId,
    }).save();
  }
  deleteOne({ userId, noteId }) {
    return this.noteModel.deleteOne({
      user_id: userId,
      _id: noteId,
    });
  }
  async updateOne({ text, userId, noteId }) {
    const note: Schema = await this.noteModel.findOne({
      user_id: userId,
      _id: noteId,
    });
    if (note) {
      note.text = text;
      return note.save();
    }
  }
  findOne({ userId, noteId }) {
    return this.noteModel.findOne({
      user_id: userId,
      _id: noteId
    })
  }
};

export default NoteService;
