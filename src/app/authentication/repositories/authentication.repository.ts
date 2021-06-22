import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthenticatedUser } from '@onboarding/models/iauthenticated-user';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationRepository {
  private httpClient: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  login(email: string, password: string): Promise<IAuthenticatedUser | undefined> {
    return this.httpClient
      .post<IAuthenticatedUser>(`${environment.api}/auth/local`, {
        identifier: email,
        password,
      })
      .toPromise();
  }
}
