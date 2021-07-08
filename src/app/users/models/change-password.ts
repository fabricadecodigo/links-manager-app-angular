import { IEntity } from '@core/models/ientity';

export interface IChangePassword extends IEntity {
  password: string;
}
