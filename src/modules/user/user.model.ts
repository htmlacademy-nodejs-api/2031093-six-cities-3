import * as Mongoose from 'mongoose';

import { User } from '../../types/user.type.js';

export interface UserDocument extends User, Mongoose.Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Mongoose.Schema({
  name: String,
  email: String,
  avatarPath: String,
  password: String,
  type: String,
}, {
  timestamps: true,
});

export const UserModel = Mongoose.model<UserDocument>('User', userSchema);
