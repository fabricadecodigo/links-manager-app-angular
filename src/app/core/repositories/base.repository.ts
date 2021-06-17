import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IEntity } from '@core/models/ientity';

export abstract class BaseRepository<TResponse> {
  constructor(private httpClient: HttpClient, private path: string) {}

  create(entity: IEntity): Promise<TResponse> {
    return this.httpClient.post<TResponse>(`${environment.api}${this.path}`, entity).toPromise();
  }
}
