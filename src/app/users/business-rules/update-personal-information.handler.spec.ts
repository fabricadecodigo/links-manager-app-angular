import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@authentication/services/auth.service';
import { IEntity } from '@core/models/ientity';
import { IApiError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { PersonalInformationRepository } from '@users/repositories/personal-information.repository';
import { UpdatePersonalInformationHandler } from './update-personal-information.handler';

describe('UpdatePersonalInformationHandler', () => {
  let service: UpdatePersonalInformationHandler;
  const personalInformationRepositorySpy = jasmine.createSpyObj<PersonalInformationRepository>(
    'PersonalInformationRepository',
    ['update']
  );
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['updateUser']);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PersonalInformationRepository, useValue: personalInformationRepositorySpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });
    service = TestBed.inject(UpdatePersonalInformationHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero atualizar o nome do usuário Quando passo as informações corretas Então o nome é alterado com sucesso', async () => {
    personalInformationRepositorySpy.update.and.returnValue(
      Promise.resolve({
        Name: 'Teste',
        id: '1',
      })
    );

    await service.execute({
      Name: 'Teste',
      id: '1',
    });

    expect(personalInformationRepositorySpy.update).toHaveBeenCalledWith({
      Name: 'Teste',
      id: '1',
    } as IEntity);
    expect(authServiceSpy.updateUser).toHaveBeenCalledWith('Teste');
    expect(toastSpy.showSuccess).toHaveBeenCalledWith('Nome alterado com sucesso');
  });

  it('Dado que eu quero atualizar o nome do usuário Quando passo as informações corretas Então o nome é alterado com sucesso', async () => {
    const error: IApiError = {
      error: 'Error',
      message: [
        {
          messages: [
            {
              id: 'error_id',
              message: 'Erro da api',
            },
          ],
        },
      ],
      statusCode: 500,
    };

    personalInformationRepositorySpy.update.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          error,
          status: 500,
          statusText: 'Internal server error',
        })
      )
    );

    await service.execute({
      Name: 'Teste',
      id: '1',
    });

    expect(toastSpy.showError).toHaveBeenCalledWith('Erro da api');
  });

  afterEach(() => {
    personalInformationRepositorySpy.update.calls.reset();
    authServiceSpy.updateUser.calls.reset();
    toastSpy.showSuccess.calls.reset();
    toastSpy.showError.calls.reset();
  });
});
