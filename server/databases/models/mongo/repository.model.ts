import mongoose, { Schema } from "mongoose";
import { RepositoryModel } from '../../../types/databases/models/mongo/repository'

const repositorySchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number, required: true },
    creator_name: { type: String, required: true },
    created_at: { type: Date, required: true },
  },
  {
    timestamps: true,
    id: true,
  }
);

export default mongoose.model<RepositoryModel>("Repository", repositorySchema);
