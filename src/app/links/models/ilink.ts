import { IEntity } from '@core/models/ientity';

export interface ILink extends IEntity {
  title: string;
  url: string;
  ativo: boolean;
}
