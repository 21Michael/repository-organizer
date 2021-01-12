import bcrypt from 'bcryptjs';
import validator from 'validator';
import mongoose, { Schema } from "mongoose";
import { UserModel } from '../../../types/databases/models/mongo/user'
validator
const userSchema: Schema = new mongoose.Schema(
  {
    user_name: { type: String, required: [true, 'User name is required!'] },
    signed_by: { type: String, required: [true, 'Signed by is required!'] },
    email: {
      type: String,
      lowercase: [true, 'Invalid error: email must be lowercase'],
      unique: true,
      validate: {
        validator: (val) => validator.isEmail(val),
        message: 'Invalid error: invalid email!'
      },
    },
    password: { type: String },
    github_id: { type: String },
    avatar_url: { type: String },
    profile_url: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validatePassword = (val) => /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/.test(val);

userSchema.pre("save", async function (next) {
  const User: Schema = this;
  if (User.password) {
    if (!userSchema.methods.validatePassword(User.password)) {
      return next(Error('Invalid error: invalid password!'));
    }
    User.password = await bcrypt.hash(User.password, 12);
    return next()
  }
});

export default mongoose.model<UserModel>("User", userSchema);
