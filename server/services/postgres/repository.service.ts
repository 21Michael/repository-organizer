import { RepositoryStatic } from './../../types/databases/models/postgres/repository';

const RepositoryService = class {
  private repositoryModel: RepositoryStatic;
  constructor(model) {
    this.repositoryModel = model;
  }
  findAll() {
    return this.repositoryModel.findAll();
  }

  findOne({ id }) {
    return this.repositoryModel.findOne({ where: { id } })
  }

  createRepository({ name, description, stars, creatorName, createdAt }) {
    return this.repositoryModel.create({
      name,
      description,
      stars,
      creator_name: creatorName,
      created_at: createdAt,
    });
  }

  deleteOne({ id }) {
    return this.repositoryModel.destroy({
      where: { id },
    });
  }

  updateOne({ id, name, description, stars, creatorName, createdAt }) {
    return this.repositoryModel.update(
      {
        name,
        description,
        stars,
        creator_name: creatorName,
        created_at: createdAt,
      },
      {
        where: { id },
      }
    );
  }
};

export default RepositoryService;
