import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRepository } from '@core/repositories/base.repository';
import { ICompanyLink } from '@users-links/models/icompany-link';

@Injectable({
  providedIn: 'root',
})
export class CompanyLinksRepository extends BaseRepository<ICompanyLink> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/companies');
  }
}
