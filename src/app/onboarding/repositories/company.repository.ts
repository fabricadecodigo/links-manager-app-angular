import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRepository } from '@core/repositories/base.repository';
import { ICompany } from '@onboarding/models/icompany';

@Injectable({
  providedIn: 'root',
})
export class CompanyRepository extends BaseRepository<ICompany> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/companies');
  }
}
