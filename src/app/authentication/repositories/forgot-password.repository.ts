import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordRepository {
  private httpClient: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  forgotPassword(email: string): Promise<{ ok: boolean }> {
    return this.httpClient
      .post<{ ok: boolean }>(`${environment.api}/auth/forgot-password`, {
        email,
      })
      .toPromise();
  }
}
