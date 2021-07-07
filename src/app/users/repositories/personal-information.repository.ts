import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRepository } from '@core/repositories/base.repository';
import { IPersonalInformation } from '@users/models/ipersonal-information';

@Injectable({
  providedIn: 'root',
})
export class PersonalInformationRepository extends BaseRepository<IPersonalInformation> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/users');
  }
}
