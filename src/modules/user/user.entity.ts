import { UserType } from '../../types/user-type.enum';
import { User } from '../../types/user.type.js';

export class UserEntity implements User {
  public name!: string;
  public email!: string;
  public avatarPath!: string;
  public password!: string;
  public type!: UserType;
}
