import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPasswordRepository } from '@authentication/repositories/reset-password.repository';
import { AuthService } from '@authentication/services/auth.service';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordHandler {
  constructor(
    private router: Router,
    private repository: ResetPasswordRepository,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  async execute(code: string, password: string): Promise<void> {
    try {
      const response = await this.repository.resetPassword(code, password);
      if (response) {
        this.toast.showSuccess('Senha resetada com sucesso');
        this.authService.setToken(response.jwt);
        this.router.navigate(['/admin/links']);
      } else {
        throw new Error('Ocorreu algum erro ao tentar o reset da senha. Recarregue a página e tente novamente');
      }
    } catch (error) {
      const responseError = new ResetPasswordResponseError(error).getMessage();
      this.toast.showError(responseError);
    }
  }
}

class ResetPasswordResponseError extends ResponseError {
  constructor(responseError: HttpErrorResponse | Error) {
    super(responseError);
  }

  getMessage(): string {
    if (this.errorId === 'Auth.form.error.code.provide') {
      return 'O código informado não é valido';
    } else if (this.errorId === 'Auth.form.error.params.provide') {
      return 'O código para o reset de senha não foi informado';
    }

    return super.getMessage();
  }
}
