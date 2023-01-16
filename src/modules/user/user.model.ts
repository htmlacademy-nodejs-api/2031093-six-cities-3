import * as Mongoose from 'mongoose';

import { User } from '../../types/user.type.js';

export interface UserDocument extends User, Mongoose.Document {}

const userSchema = new Mongoose.Schema({
  name: String,
  email: String,
  avatarPath: String,
  password: String,
  type: String,
});

export const UserModel = Mongoose.model<UserDocument>('User', userSchema);
