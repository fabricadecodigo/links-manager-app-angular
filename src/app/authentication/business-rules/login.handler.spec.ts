import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationRepository } from '@authentication/repositories/authentication.repository';
import { AuthService } from '@authentication/services/auth.service';
import { IApiError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { IAuthenticatedUser } from '@onboarding/models/iauthenticated-user';
import { LoginHandler } from './login.handler';

describe('LoginHandler', () => {
  let service: LoginHandler;
  const authenticationRepositorySpy = jasmine.createSpyObj<AuthenticationRepository>('AuthenticationRepository', [
    'login',
  ]);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showError', 'showSuccess']);
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['setToken', 'setUser']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthenticationRepository, useValue: authenticationRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
    service = TestBed.inject(LoginHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero me autenticar Quando passo um usuário e senha validos Então sou logado com sucesso', async () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    authenticationRepositorySpy.login.and.returnValue(
      Promise.resolve({
        jwt: '123',
        user: {
          id: 1,
          email: 'test@test.com',
          Name: 'Teste',
          username: 'teste',
        },
      })
    );

    await service.execute('test@test.com', '123456');
    expect(authServiceSpy.setToken).toHaveBeenCalledWith('123');
    expect(authServiceSpy.setUser).toHaveBeenCalledWith({
      id: 1,
      email: 'test@test.com',
      Name: 'Teste',
      username: 'teste',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/admin/links']);
    expect(toastSpy.showSuccess).toHaveBeenCalledWith('Login efetuado com sucesso');
  });

  it('Dado que eu quero me autenticar Quando a autenticação retorna null Então exibe uma mensagem de erro', async () => {
    authenticationRepositorySpy.login.and.returnValue(Promise.resolve(undefined));

    await service.execute('test@test.com', '123456');
    expect(toastSpy.showError).toHaveBeenCalledWith(
      'Ocorreu algum erro ao efetuar o login. Recarregue a página e tente novamente'
    );
  });

  it('Dado que eu quero me autenticar Quando passo um usuário ou senha invalidos Então exibe uma mensagem de erro', async () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const error: IApiError = {
      error: 'Bad Requeset',
      statusCode: 400,
      message: [
        {
          messages: [
            {
              id: 'Auth.form.error.invalid',
              message: 'email ou senha inválido(s)',
            },
          ],
        },
      ],
    };

    authenticationRepositorySpy.login.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          error,
        })
      )
    );

    await service.execute('test@test.com', '123456');
    expect(toastSpy.showError).toHaveBeenCalledWith('Usuário ou senha invalido(s)');
  });

  afterEach(() => {
    authServiceSpy.setToken.calls.reset();
    authenticationRepositorySpy.login.calls.reset();
    toastSpy.showError.calls.reset();
    toastSpy.showSuccess.calls.reset();
  });
});
