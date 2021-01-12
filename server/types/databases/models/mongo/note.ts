import { Document } from "mongoose";

export interface NoteModel extends Document {
  id: string
  repository_id: string
  text: string
  created_at: Date
  user_id: string
}



