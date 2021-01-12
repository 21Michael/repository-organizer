import { Model } from "sequelize";

export interface RepositoryAttribute {
  id?: string
  name: string,
  description: string,
  stars: number
  creator_name: string,
  created_at: Date
}

export interface RepositoryModel extends Model<RepositoryAttribute>, RepositoryAttribute { }
export class Repository extends Model<RepositoryModel, RepositoryAttribute> { }

export type RepositoryStatic = typeof Model & {
  new(values?: object): RepositoryModel;
};


