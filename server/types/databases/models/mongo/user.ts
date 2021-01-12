import { Document } from "mongoose";

export interface UserModel extends Document {
  id?: string;
  user_name: string
  signed_by: string
  email?: string
  password?: string;
  github_id?: string,
  avatar_url?: string,
  profile_url?: string,
}

