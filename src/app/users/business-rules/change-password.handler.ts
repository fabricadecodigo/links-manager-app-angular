import { Injectable } from '@angular/core';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { IChangePassword } from '@users/models/change-password';
import { ChangePasswordRepository } from '@users/repositories/change-passoword.repository';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordHandler {
  constructor(private repository: ChangePasswordRepository, private toast: ToastService) {}

  async execute(entity: IChangePassword): Promise<void> {
    try {
      await this.repository.update(entity);
      this.toast.showSuccess('Senha alterada com sucesso');
    } catch (error) {
      const message = new ResponseError(error).getMessage();
      this.toast.showError(message);
    }
  }
}
