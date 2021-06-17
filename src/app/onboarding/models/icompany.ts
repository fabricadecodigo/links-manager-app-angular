import { IEntity } from '../../core/models/ientity';

export interface ICompany extends IEntity {
  name: string;
  slug: string;
}
