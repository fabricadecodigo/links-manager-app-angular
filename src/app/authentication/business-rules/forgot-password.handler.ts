import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPasswordRepository } from '@authentication/repositories/forgot-password.repository';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordHandler {
  constructor(private repository: ForgotPasswordRepository, private toast: ToastService) {}

  async execute(email: string): Promise<void> {
    try {
      const response = await this.repository.forgotPassword(email);
      if (response.ok) {
        this.toast.showSuccess(
          'Um email com o passo a passo para resetar sua senha foi enviado para o email informado.'
        );
      } else {
        throw new Error('Ocorreu algum erro ao tentar iniciar o reset da senha. Recarregue a página e tente novamente');
      }
    } catch (error) {
      const responseError = new ForgotPasswordResponseError(error).getMessage();
      this.toast.showError(responseError);
    }
  }
}

class ForgotPasswordResponseError extends ResponseError {
  constructor(responseError: HttpErrorResponse | Error) {
    super(responseError);
  }

  getMessage(): string {
    if (this.errorId === 'Auth.form.error.user.not-exist') {
      return 'Esse e-mail não foi encontrado';
    }

    return super.getMessage();
  }
}
