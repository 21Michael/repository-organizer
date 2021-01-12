import mongoose, { Schema } from "mongoose";
import { NoteModel } from '../../../types/databases/models/mongo/note'

const noteSchema: Schema = new mongoose.Schema(
  {
    repository_id: { type: String, required: true },
    text: { type: String, required: true },
    created_at: { type: Date, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    id: true,
  }
);

export default mongoose.model<NoteModel>("Note", noteSchema);

