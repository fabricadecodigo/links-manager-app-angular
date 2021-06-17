import { IEntity } from '@core/models/ientity';

export interface IUser extends IEntity {
  username: string;
  email: string;
  password: string;
  name: string;
}
