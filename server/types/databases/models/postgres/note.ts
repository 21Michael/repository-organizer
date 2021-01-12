import { Model } from "sequelize";


export interface NoteAttributes {
  id?: string
  repository_id: string
  text: string
  created_at: Date
  user_id: string
}

export interface NoteModel extends Model<NoteAttributes>, NoteAttributes { }
export class User extends Model<NoteModel, NoteAttributes> { }

export type NoteStatic = typeof Model & {
  new(values?: object): NoteModel;
};

