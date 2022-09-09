import { Schema } from 'mongoose';

const RepositoryService = class {
  private repositoryModel: Schema;
  constructor(model) {
    this.repositoryModel = model;
  }
  findAll() {
    try {
      return this.repositoryModel.find();
    } catch (e) {
      console.log('Error:', e)
    }
  }
  findOne({ id }) {
    return this.repositoryModel.findOne({
      _id: id,
    });
  }
  createRepository({ name, description, stars, creatorName, createdAt }) {
    return new this.repositoryModel({
      name,
      description,
      stars,
      creator_name: creatorName,
      created_at: createdAt,
    }).save();
  }
  deleteOne({ id }) {
    return this.repositoryModel.deleteOne({
      _id: id,
    });
  }
  async updateOne({ id, name, description, stars, creatorName, createdAt }) {
    const repository: Schema = await this.repositoryModel.findOne({
      _id: id,
    });
    if (repository) {
      repository.name = name;
      repository.description = description;
      repository.stars = stars;
      repository.creator_name = creatorName;
      repository.created_at = createdAt;
      return repository.save();
    }
  }
};

export default RepositoryService;
