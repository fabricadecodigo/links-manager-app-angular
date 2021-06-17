import { IUser } from './../models/iuser';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRepository } from '@core/repositories/base.repository';
import { IEntity } from '@core/models/ientity';
import { IAuthenticatedUser } from '@onboarding/models/iauthenticated-user';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserRepository extends BaseRepository<IAuthenticatedUser> {
  constructor(httpBackend: HttpBackend) {
    // usando o HttpBackend eu não passo pelo interceptor
    super(new HttpClient(httpBackend), '/auth/local/register');
  }

  create(entity: IUser): Promise<IAuthenticatedUser> {
    const { name, ...rest } = entity;
    // Apenas para ajustar de name para Name pois a api espera Name
    return super.create({ ...rest, Name: name } as IEntity);
  }
}
