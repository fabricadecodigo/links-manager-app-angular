export interface IAuthenticatedUser {
  jwt: string;
  user: IAuthenticatedUserData;
}

export interface IAuthenticatedUserData {
  id: number;
  username: string;
  email: string;
  Name: string;
  company?: IAuthenticatedUserCompanyData;
}

export interface IAuthenticatedUserCompanyData {
  id: number;
  name: string;
  slug: string;
}
