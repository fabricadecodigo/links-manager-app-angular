import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRepository } from '@core/repositories/base.repository';
import { IChangePassword } from '@users/models/change-password';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordRepository extends BaseRepository<IChangePassword> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/users');
  }
}
