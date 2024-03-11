import { IUser } from '../models/user.interface';
import { UserTypeEnum } from '../models/user-type.enum';

export const USERS: IUser[] = [
  {
    username: 'mperry1992',
    first_name: 'Matthew',
    last_name: 'Perry',
    email: 'matthew@mail.com',
    user_type: UserTypeEnum.Admin
  },
  {
    username: 'johnweak',
    first_name: 'Keanu',
    last_name: 'Reeves',
    email: 'charlesreeves@mail.com',
    user_type: UserTypeEnum.Admin
  },
  {
    username: 'stathamdriver',
    first_name: 'Jason',
    last_name: 'Statham',
    email: 'stathamdriver@mail.com',
    user_type: UserTypeEnum.Driver
  },
]