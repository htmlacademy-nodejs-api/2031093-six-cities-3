import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';

import { UserType } from '../../types/user-type.enum.js';
import { User } from '../../types/user.type.js';

const { prop } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

export class UserEntity extends defaultClasses.TimeStamps implements User {

  @prop({
    required: true,
    minlength: [1, 'Min length for name is 1 symbol'],
    maxlength: [15, 'Max length for name is 15 symbols'],
  })
  public name!: string;

  @prop({
    unique: true,
    required: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  })
  public email!: string;

  @prop({
    match: [/[^\s]+(\.(jpg|png))$/i, 'File extension must be "jpg" or "png"'],
  })
  public avatarPath!: string;

  @prop({
    required: true,
    minlength: [6, 'Min length for password is 6 symbols'],
    maxlength: [12, 'Max length for password is 12 symbols'],
  })
  public password!: string;

  @prop({
    required: true,
    enum: Object.values(UserType),
  })
  public type!: UserType;
}

export const UserModel = getModelForClass(UserEntity);
