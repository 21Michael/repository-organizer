import { Model } from "sequelize";

export interface UserAttributes {
  id?: string;
  user_name: string
  signed_by: string
  email?: string
  password?: string;
  github_id?: string,
  avatar_url?: string,
  profile_url?: string,
}

export interface UserModel extends Model<UserAttributes>, UserAttributes { }
export class User extends Model<UserModel, UserAttributes> { }

export type UserStatic = typeof Model & {
  new(values?: object): UserModel;
};

