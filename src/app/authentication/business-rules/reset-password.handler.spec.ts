import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ResetPasswordRepository } from '@authentication/repositories/reset-password.repository';
import { AuthService } from '@authentication/services/auth.service';
import { IApiError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { ResetPasswordHandler } from './reset-password.handler';

describe('ResetPasswordHandler', () => {
  let service: ResetPasswordHandler;
  const resetPasswordRepositorySpy = jasmine.createSpyObj<ResetPasswordRepository>('ResetPasswordRepository', [
    'resetPassword',
  ]);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showError', 'showSuccess']);
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['setToken']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: ResetPasswordRepository, useValue: resetPasswordRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
    service = TestBed.inject(ResetPasswordHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que quero resetar minha senha Quando informo dados validos Então minha senha é resetada com sucesso', async () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    resetPasswordRepositorySpy.resetPassword.and.returnValue(
      Promise.resolve({
        jwt: '123',
        user: {
          email: 'teste@teste.com',
          id: 1,
          name: 'Teste',
          username: 'teste',
        },
      })
    );

    await service.execute('123', '12345');

    expect(toastSpy.showSuccess).toHaveBeenCalledWith('Senha resetada com sucesso');
    expect(authServiceSpy.setToken).toHaveBeenCalledWith('123');
    expect(router.navigate).toHaveBeenCalledWith(['/admin/links']);
  });

  it('Dado que quero resetar minha senha Quando informo um code invalido Então exibe uma mensagem de erro', async () => {
    const error: IApiError = {
      error: 'Bad Requeset',
      statusCode: 400,
      message: [
        {
          messages: [
            {
              id: 'Auth.form.error.code.provide',
              message: 'message',
            },
          ],
        },
      ],
    };

    resetPasswordRepositorySpy.resetPassword.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          error,
        })
      )
    );

    await service.execute('123', '12345');

    expect(toastSpy.showError).toHaveBeenCalledWith('O código informado não é valido');
  });

  it('Dado que quero resetar minha senha Quando não informo um code Então exibe uma mensagem de erro', async () => {
    const error: IApiError = {
      error: 'Bad Requeset',
      statusCode: 400,
      message: [
        {
          messages: [
            {
              id: 'Auth.form.error.params.provide',
              message: 'message',
            },
          ],
        },
      ],
    };

    resetPasswordRepositorySpy.resetPassword.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          error,
        })
      )
    );

    await service.execute('', '12345');

    expect(toastSpy.showError).toHaveBeenCalledWith('O código para o reset de senha não foi informado');
  });

  it('Dado que quero resetar minha senha Quando a solicitação retorna null Então exibe uma mensagem de erro', async () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    resetPasswordRepositorySpy.resetPassword.and.returnValue(Promise.resolve(undefined));

    await service.execute('123', '12345');

    expect(toastSpy.showError).toHaveBeenCalledWith(
      'Ocorreu algum erro ao tentar o reset da senha. Recarregue a página e tente novamente'
    );
  });

  afterEach(() => {
    toastSpy.showError.calls.reset();
    toastSpy.showSuccess.calls.reset();
    authServiceSpy.setToken.calls.reset();
  });
});
