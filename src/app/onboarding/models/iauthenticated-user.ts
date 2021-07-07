export interface IAuthenticatedUser {
  jwt: string;
  user: IAuthenticatedUserData;
}

export interface IAuthenticatedUserData {
  id: number;
  username: string;
  email: string;
  Name: string;
}
