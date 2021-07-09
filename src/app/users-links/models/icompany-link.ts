import { IEntity } from '@core/models/ientity';

export interface ICompanyLink extends IEntity {
  name: string;
  links: ICompanyLinkData[];
}

export interface ICompanyLinkData {
  title: string;
  url: string;
  ativo: boolean;
}
