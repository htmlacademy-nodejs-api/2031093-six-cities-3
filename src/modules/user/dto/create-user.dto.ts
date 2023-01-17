import { UserType } from '../../../types/user-type.enum';

export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatarPath?: string;
  public password!: string;
  public type!: UserType;
}
