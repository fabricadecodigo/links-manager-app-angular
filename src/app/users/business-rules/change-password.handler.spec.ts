import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { IEntity } from '@core/models/ientity';
import { IApiError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { ChangePasswordRepository } from '@users/repositories/change-passoword.repository';
import { ChangePasswordHandler } from './change-password.handler';

describe('ChangePasswordHandler', () => {
  let service: ChangePasswordHandler;
  const changePasswordRepositorySpy = jasmine.createSpyObj<ChangePasswordRepository>('ChangePasswordRepository', [
    'update',
  ]);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ChangePasswordRepository, useValue: changePasswordRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });
    service = TestBed.inject(ChangePasswordHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero alterar a senha usuário Quando passo as informações corretas Então a senha é alterada com sucesso', async () => {
    changePasswordRepositorySpy.update.and.returnValue(
      Promise.resolve({
        password: '123',
        id: '1',
      })
    );

    await service.execute({
      password: '123',
      id: '1',
    });

    expect(changePasswordRepositorySpy.update).toHaveBeenCalledWith({
      password: '123',
      id: '1',
    } as IEntity);
    expect(toastSpy.showSuccess).toHaveBeenCalledWith('Senha alterada com sucesso');
  });

  it('Dado que eu quero alterar a senha usuário Quando não passo as informações corretas Então exibe mensagem de erro', async () => {
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

    changePasswordRepositorySpy.update.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          error,
          status: 500,
          statusText: 'Internal server error',
        })
      )
    );

    await service.execute({
      password: '123',
      id: '1',
    });

    expect(toastSpy.showError).toHaveBeenCalledWith('Erro da api');
  });

  afterEach(() => {
    changePasswordRepositorySpy.update.calls.reset();
    toastSpy.showSuccess.calls.reset();
    toastSpy.showError.calls.reset();
  });
});
