import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ForgotPasswordRepository } from '@authentication/repositories/forgot-password.repository';
import { IApiError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { ForgotPasswordHandler } from './forgot-password.handler';

describe('ForgotPasswordHandler', () => {
  let service: ForgotPasswordHandler;
  const forgotPasswordRepositorySpy = jasmine.createSpyObj<ForgotPasswordRepository>('ForgotPasswordRepository', [
    'forgotPassword',
  ]);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showError', 'showSuccess']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ForgotPasswordRepository, useValue: forgotPasswordRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });
    service = TestBed.inject(ForgotPasswordHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero resetar minha senha Quando preencho com email valido Então o processo inicia com sucesso', async () => {
    forgotPasswordRepositorySpy.forgotPassword.and.returnValue(Promise.resolve({ ok: true }));

    await service.execute('teste@teste.com');

    expect(toastSpy.showSuccess).toHaveBeenCalledWith(
      'Um email com o passo a passo para resetar sua senha foi enviado para o email informado.'
    );
  });

  it('Dado que eu quero resetar minha senha Quando preencho com email invalido Então exibe mensgem de erro', async () => {
    const error: IApiError = {
      error: 'Bad Requeset',
      statusCode: 400,
      message: [
        {
          messages: [
            {
              id: 'Auth.form.error.user.not-exist',
              message: 'message',
            },
          ],
        },
      ],
    };

    forgotPasswordRepositorySpy.forgotPassword.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          error,
        })
      )
    );

    await service.execute('email_invalido@teste.com');

    expect(toastSpy.showError).toHaveBeenCalledWith('Esse e-mail não foi encontrado');
  });

  it('Dado que eu quero resetar minha senha Quando a solicitação não é recebida Então exibe mensgem de erro', async () => {
    forgotPasswordRepositorySpy.forgotPassword.and.returnValue(Promise.resolve({ ok: false }));

    await service.execute('teste@teste.com');

    expect(toastSpy.showError).toHaveBeenCalledWith(
      'Ocorreu algum erro ao tentar iniciar o reset da senha. Recarregue a página e tente novamente'
    );
  });

  afterEach(() => {
    toastSpy.showError.calls.reset();
    toastSpy.showSuccess.calls.reset();
  });
});
