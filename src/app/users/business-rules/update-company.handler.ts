import { Injectable } from '@angular/core';
import { AuthService } from '@authentication/services/auth.service';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { ICompany } from '@onboarding/models/icompany';
import { CompanyRepository } from '@onboarding/repositories/company.repository';

@Injectable({
  providedIn: 'root',
})
export class UpdateCompanyHandler {
  constructor(private repository: CompanyRepository, private authService: AuthService, private toast: ToastService) {}

  async execute(entity: ICompany): Promise<void> {
    try {
      await this.repository.update(entity);
      this.authService.updateCompany(entity.name, entity.slug);
      this.toast.showSuccess('Empresa alterada com sucesso');
    } catch (error) {
      const message = new ResponseError(error).getMessage();
      this.toast.showError(message);
    }
  }
}
