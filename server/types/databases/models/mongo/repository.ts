import { Document } from "mongoose";

export interface RepositoryModel extends Document {
  id: string
  name: string,
  description: string,
  stars: number
  creator_name: string,
  created_at: Date
}

