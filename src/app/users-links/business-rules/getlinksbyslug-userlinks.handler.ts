import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { ICompanyLink } from '@users-links/models/icompany-link';
import { CompanyLinksRepository } from '@users-links/repositories/company-links.repository';

@Injectable({
  providedIn: 'root',
})
export class GetLinksBySlugHandler {
  constructor(private repository: CompanyLinksRepository, private toast: ToastService) {}

  async execute(slug: string): Promise<ICompanyLink | undefined> {
    try {
      const httpParams = new HttpParams().append('slug', slug);
      const response = await this.repository.getByParams(httpParams);
      const [company] = response;
      if (!company) {
        throw new Error('Nenhum link encontrado para esta empresa');
      }
      company.links = company.links.filter((link) => link.ativo);

      return company;
    } catch (error) {
      const message = new ResponseError(error).getMessage();
      this.toast.showError(message);
      return undefined;
    }
  }
}
