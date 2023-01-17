import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';

import { UserType } from '../../types/user-type.enum.js';
import { User } from '../../types/user.type.js';
import { createSHA256 } from '../../utils/common.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatarPath = data.avatarPath ?? '';
    this.type = data.type;
  }

  @prop({
    required: true,
    minlength: [1, 'Min length for name is 1 symbol'],
    maxlength: [15, 'Max length for name is 15 symbols'],
    default: '',
  })
  public name!: string;

  @prop({
    unique: true,
    required: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    default: '',
  })
  public email!: string;

  @prop({
    match: [/[^\s]+(\.(jpg|png))$/i, 'File extension must be "jpg" or "png"'],
    default: '',
  })
  public avatarPath!: string;

  @prop({
    required: true,
    minlength: [6, 'Min length for password is 6 symbols'],
    maxlength: [12, 'Max length for password is 12 symbols'],
    default: '',
  })
  private password!: string;

  @prop({
    required: true,
    enum: Object.values(UserType),
    default: UserType.Common,
  })
  public type!: UserType;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
