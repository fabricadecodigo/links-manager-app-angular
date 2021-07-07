import { Injectable } from '@angular/core';
import { AuthService } from '@authentication/services/auth.service';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { IPersonalInformation } from '@users/models/ipersonal-information';
import { PersonalInformationRepository } from '@users/repositories/personal-information.repository';

@Injectable({
  providedIn: 'root',
})
export class UpdatePersonalInformationHandler {
  constructor(
    private repository: PersonalInformationRepository,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  async execute(entity: IPersonalInformation): Promise<void> {
    try {
      await this.repository.update(entity);
      this.authService.updateUser(entity.Name);
      this.toast.showSuccess('Nome alterado com sucesso');
    } catch (error) {
      const message = new ResponseError(error).getMessage();
      this.toast.showError(message);
    }
  }
}
