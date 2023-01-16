import * as Mongoose from 'mongoose';

import { User } from '../../types/user.type.js';

export interface UserDocument extends User, Mongoose.Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name is 1 symbol'],
    maxlength: [15, 'Max length for name is 15 symbols'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  },
  avatarPath: {
    type: String,
    match: [/[^\s]+(\.(jpg|png))$/i, 'File extension must be "jpg" or "png"'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Min length for password is 6 symbols'],
    maxlength: [12, 'Max length for password is 12 symbols'],
  },
  type: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const UserModel = Mongoose.model<UserDocument>('User', userSchema);
