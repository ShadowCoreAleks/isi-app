import { UserTypeEnum } from './user-type.enum';

export interface IUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: UserTypeEnum;
  password?: string;
}
