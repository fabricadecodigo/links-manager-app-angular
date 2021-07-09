import { Injectable } from '@angular/core';
import { IAuthenticatedUserData } from '@onboarding/models/iauthenticated-user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user-data');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  setUser(user: IAuthenticatedUserData): void {
    const data: IAuthenticatedUserData = {
      Name: user.Name,
      email: user.email,
      id: user.id,
      username: user.username,
      company: user.company
    };
    localStorage.setItem('user-data', JSON.stringify(data));
  }

  getUser(): IAuthenticatedUserData | undefined {
    const user = localStorage.getItem('user-data');
    if (user) {
      return JSON.parse(user) as IAuthenticatedUserData;
    }

    return undefined;
  }

  updateUser(name: string): void {
    const user = this.getUser();
    if (user) {
      user.Name = name;
      this.setUser(user);
    }
  }

  updateCompany(name: string, slug: string): void {
    const user = this.getUser();
    if (user && user.company) {
      user.company.name = name;
      user.company.slug = slug;
      this.setUser(user);
    }
  }

  getTokenExpirationDate(token: string): Date | undefined {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return undefined;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }

    return false;
  }

  logout(): void {
    this.clearLocalStorage();
  }
}
