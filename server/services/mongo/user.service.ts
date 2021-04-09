import { Schema } from 'mongoose';

const UserService = class {
  private userModel: Schema;
  constructor(model) {
    this.userModel = model;
  }
  async findOne({ id }) {
    return await this.userModel.findOne({ _id: id });
  }
  async findOneByEmail({ email }) {
    return await this.userModel.findOne({ email });
  }
  async findOneByGitHubId({ id }) {
    return await this.userModel.findOne({ github_id: id });
  }
  async createUser({ user_name, email, signed_by, password }) {
    return await new this.userModel({
      user_name,
      signed_by,
      email,
      password,
    }).save();
  }
  async createUserGitHub({ user_name, signed_by, github_id, avatar_url, profile_url }) {
    return await new this.userModel({
      user_name,
      signed_by,
      github_id,
      avatar_url,
      profile_url,
    }).save();
  }
  async createUserGoogle({ user_name, signed_by, avatar_url, email }) {
    return await new this.userModel({
      user_name,
      signed_by,
      avatar_url,
      email
    }).save();
  }
  async deleteOne({ id }) {
    return await this.userModel.deleteOne({ _id: id });
  }
};

export default UserService;
