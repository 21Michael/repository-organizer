import { formatDate } from '../../utiles/date';
import { Schema } from 'mongoose';

const RepositoryService = class {
  private repositoryModel: Schema;
  constructor(model) {
    this.repositoryModel = model;
  }
  async findAll() {
    const repositories = await this.repositoryModel.find();
    return formatDate(repositories, 'YYYY-MM-DD');
  }
  async findOne({ id }) {
    return await this.repositoryModel.findOne({
      _id: id,
    });
  }
  async createRepository({ name, description, stars, creator_name, created_at }) {
    const newRepository = await new this.repositoryModel({
      name,
      description,
      stars,
      creator_name,
      created_at
    }).save();
    return formatDate(newRepository, 'YYYY-MM-DD');
  }
  async deleteOne({ id }) {
    return await this.repositoryModel.deleteOne({
      _id: id,
    });
  }
  async updateOne({ _id, ...rest }) {
    const repository: Schema = await this.repositoryModel.findOne({ _id });
    for (let key in rest) {
      repository[key] = rest[key]
    }
    await repository.save();
    return formatDate(repository, 'YYYY-MM-DD');
  }
};

export default RepositoryService;
