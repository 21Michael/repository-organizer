import { Schema } from 'mongoose';

const UserService = class {
  private userModel: Schema;
  constructor(model) {
    this.userModel = model;
  }
  findOne({ id }) {
    return this.userModel.findOne({ _id: id });
  }
  findOneByEmail({ email }) {
    return this.userModel.findOne({ email });
  }
  findOneByGitHubId({ id }) {
    return this.userModel.findOne({ github_id: id });
  }
  createUser({ name, email, signedBy, password }) {
    return new this.userModel({
      user_name: name,
      signed_by: signedBy,
      email,
      password,
    }).save();
  }
  createUserGitHub({ name, signedBy, githubId, avatarURL, profileURL }) {
    return new this.userModel({
      user_name: name,
      signed_by: signedBy,
      github_id: githubId,
      avatar_url: avatarURL,
      profile_url: profileURL,
    }).save();
  }
  createUserGoogle({ name, signedBy, avatarURL, email }) {
    return new this.userModel({
      user_name: name,
      signed_by: signedBy,
      avatar_url: avatarURL,
      email: email
    }).save();
  }
  deleteOne({ id }) {
    return this.userModel.deleteOne({ _id: id });
  }
};

export default UserService;
