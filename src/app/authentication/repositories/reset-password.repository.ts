import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthenticatedUser } from '@onboarding/models/iauthenticated-user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordRepository {
  private httpClient: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  resetPassword(code: string, password: string): Promise<IAuthenticatedUser | undefined> {
    return this.httpClient
      .post<IAuthenticatedUser>(`${environment.api}/auth/reset-password`, {
        code,
        password,
        passwordConfirmation: password,
      })
      .toPromise();
  }
}
