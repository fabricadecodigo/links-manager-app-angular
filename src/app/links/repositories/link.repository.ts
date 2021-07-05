import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRepository } from '@core/repositories/base.repository';
import { ILink } from '@links/models/ilink';

@Injectable({
  providedIn: 'root',
})
export class LinkRepository extends BaseRepository<ILink> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/links');
  }
}
