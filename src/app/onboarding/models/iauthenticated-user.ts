export interface IAuthenticatedUser {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    name: string;
  };
}
