import { UserType } from '../../../types/user-type.enum';

export default class UpdateUserDto {
  public name?: string;
  public avatarPath?: string;
  public password?: string;
  public userType?: UserType;
}
