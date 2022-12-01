import { NoteStatic } from '../../types/databases/models/postgres/note';

const NoteService = class {
  private db: NoteStatic;
  private cache: any;
  private cacheFieldKey: string;

  constructor({ db, cache }) {
    this.db = db;
    this.cache = cache;
    this.cacheFieldKey = JSON.stringify(this.db.tableName);
  }

  async findAll({ id }) {
    try {
      const hashKey = JSON.stringify(id);

      const cachedValues = await this.cache.hGet(hashKey, this.cacheFieldKey);

      if(cachedValues) {
        console.log(`!!!!!!!!!!!!!!!RETURN CACHED VALUES FROM ${this.cacheFieldKey}`)
        return JSON.parse(cachedValues);
      }

      const values = await this.db.findAll({ where: { user_id: id } });

      await this.cache.hSet(hashKey, this.cacheFieldKey, JSON.stringify(values));
      await this.cache.expire(hashKey, 60 * 60 * 24);

      console.log(`!!!!!!!!!!!!!!!RETURN UNCACHED VALUES FROM ${this.cacheFieldKey}`)
      return values;
    } catch (e) {
      console.log(e)
    }
  }

  async createNote({ repositoryId, text, createdAt, userId }) {
    const value = await this.db.create({
      repository_id: repositoryId,
      text,
      created_at: createdAt,
      user_id: userId,
    });

    const hashKey = JSON.stringify(userId);
    await this.cache.hDel(hashKey, this.cacheFieldKey);

    return value;
  }

  async deleteOne({ userId, noteId }) {
    const value = await this.db.destroy({
      where: {
        user_id: userId,
        id: noteId,
      },
    });

    const hashKey = JSON.stringify(userId);
    await this.cache.hDel(hashKey, this.cacheFieldKey);

    return value;
  }

  async updateOne({ text, userId, noteId }) {
    const value = await this.db.update({ text }, { where: { user_id: userId, id: noteId } });

    const hashKey = JSON.stringify(userId);
    await this.cache.hDel(hashKey, this.cacheFieldKey);

    return value;
  }

  findOne({ userId, noteId }) {
    return this.db.findOne({ where: { user_id: userId, id: noteId } });
  }
};

export default NoteService;
