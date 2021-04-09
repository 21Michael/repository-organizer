import { formatDate } from './../../utiles/date';
import { Schema } from 'mongoose';

const NoteService = class {
  private noteModel: Schema;
  constructor(model) {
    this.noteModel = model;
  }
  async findAll({ id }) {
    const notes = await this.noteModel.find({ user_id: id });
    return formatDate(notes, 'YYYY-MM-DD');
  }
  async createNote({ repository_id, text, created_at, user_id }) {
    return await new this.noteModel({
      repository_id,
      text,
      created_at,
      user_id,
    }).save();
  }
  async deleteOne({ user_id, note_id }) {
    return await this.noteModel.deleteOne({
      user_id,
      _id: note_id,
    });
  }
  async updateOne({ text, user_id, note_id }) {
    const note: Schema = await this.noteModel.findOne({
      user_id,
      _id: note_id,
    });
    if (note) {
      note.text = text;
      return note.save();
    }
  }
  async findOne({ user_id, note_id }) {
    return await this.noteModel.findOne({
      user_id,
      _id: note_id
    })
  }
};

export default NoteService;
