import { IsEmail, Matches, IsString, Length, IsEnum } from 'class-validator';

import { UserType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {

  @IsString({message: 'name is required'})
  @Length(1, 15, {message: 'name min length is 1 symbol, max is 15 symbols'})
  public name!: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @Matches(/[^\s]+(\.(jpg|png))$/i, {
    message: 'File extension must be "jpg" or "png"'
  })
  public avatarPath?: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'min length for password is 6, max is 12'})
  public password!: string;

  @IsEnum(UserType, {message: `userType must be one of: ${Object.values(UserType).join(', ')}`})
  public userType!: UserType;
}
