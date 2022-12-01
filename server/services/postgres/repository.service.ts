import { RepositoryStatic } from '../../types/databases/models/postgres/repository';

const RepositoryService = class {
  private db: RepositoryStatic;
  private cache: any;
  private cacheKey: string;

  constructor({ db, cache }) {
    this.db = db;
    this.cache = cache;
    this.cacheKey = JSON.stringify(this.db.tableName);
  }

  async findAll() {
    const cachedValues = await this.cache.get(this.cacheKey);

    if(cachedValues) {
      console.log(`!!!!!!!!!!!!!!!RETURN CACHED VALUES FROM ${this.cacheKey}`)
      return JSON.parse(cachedValues);
    }
    const values = await this.db.findAll();

    await this.cache.set(this.cacheKey, JSON.stringify(values));
    await this.cache.expire(this.cacheKey, 60 * 60 * 24);

    console.log(`!!!!!!!!!!!!!!!RETURN UNCACHED VALUES FROM ${this.cacheKey}`)
    return values;
  }

  findOne({ id }) {
    return this.db.findOne({ where: { id } })
  }

  async createRepository({ name, description, stars, creatorName, createdAt }) {
    const value = await this.db.create({
      name,
      description,
      stars,
      creator_name: creatorName,
      created_at: createdAt,
    });

    await this.cache.del(this.cacheKey);

    return value;
  }

  async deleteOne({ id }) {
    const value = this.db.destroy({
      where: { id },
    });

    await this.cache.del(this.cacheKey);

    return value;
  }

  async updateOne({ id, name, description, stars, creatorName, createdAt }) {
    const value = this.db.update(
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

    await this.cache.del(this.cacheKey);

    return value;
  }
};

export default RepositoryService;
