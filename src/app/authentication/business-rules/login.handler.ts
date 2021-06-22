import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRepository } from '@authentication/repositories/authentication.repository';
import { AuthService } from '@authentication/services/auth.service';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class LoginHandler {
  constructor(
    private router: Router,
    private repository: AuthenticationRepository,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  async execute(email: string, password: string): Promise<void> {
    try {
      const authenticatedUser = await this.repository.login(email, password);
      if (authenticatedUser) {
        this.authService.setToken(authenticatedUser.jwt);
        this.router.navigate(['/admin/links']);
        this.toast.showSuccess('Login efetuado com sucesso');
      } else {
        throw new Error('Ocorreu algum erro ao efetuar o login. Recarregue a página e tente novamente');
      }
    } catch (error) {
      const responseError = new LoginResponseError(error).getMessage();
      this.toast.showError(responseError);
    }
  }
}

class LoginResponseError extends ResponseError {
  constructor(responseError: HttpErrorResponse | Error) {
    super(responseError);
  }

  getMessage(): string {
    if (this.errorId === 'Auth.form.error.invalid') {
      return 'Usuário ou senha invalido(s)';
    }

    return super.getMessage();
  }
}
