import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEntity } from '@core/models/ientity';

export abstract class BaseRepository<TResponse> {
  constructor(private httpClient: HttpClient, private path: string) {}

  create(entity: IEntity): Promise<TResponse> {
    return this.httpClient.post<TResponse>(`${environment.api}${this.path}`, entity).toPromise();
  }

  update(entity: IEntity): Promise<TResponse> {
    const { id, ...data } = entity;
    return this.httpClient.put<TResponse>(`${environment.api}${this.path}/${id}`, data).toPromise();
  }

  getById(id: number): Promise<TResponse> {
    return this.httpClient.get<TResponse>(`${environment.api}${this.path}/${id}`).toPromise();
  }

  getAll(params: HttpParams): Promise<TResponse[]> {
    return this.httpClient
      .get<TResponse[]>(`${environment.api}${this.path}/`, { params })
      .toPromise();
  }

  getByParams(params: HttpParams): Promise<TResponse[]> {
    return this.httpClient
      .get<TResponse[]>(`${environment.api}${this.path}/`, { params })
      .toPromise();
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete(`${environment.api}${this.path}/${id}`).toPromise();
    return;
  }
}
