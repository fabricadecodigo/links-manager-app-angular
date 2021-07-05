import { Injectable } from '@angular/core';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { ILink } from '@links/models/ilink';
import { LinkRepository } from '@links/repositories/link.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateLinkHandler {
  constructor(private repository: LinkRepository, private toast: ToastService) {}

  async execute(link: ILink): Promise<ILink | undefined> {
    try {
      const response = await this.repository.create(link);
      this.toast.showSuccess('Link incluído com sucesso');

      return response;
    } catch (error) {
      const errorMessage = new ResponseError(error).getMessage();
      this.toast.showError(errorMessage);
      return undefined;
    }
  }
}
