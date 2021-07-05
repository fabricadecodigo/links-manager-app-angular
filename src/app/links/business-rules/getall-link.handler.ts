import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { ILink } from '@links/models/ilink';
import { LinkRepository } from '@links/repositories/link.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAllLinkHandler {
  constructor(private repository: LinkRepository, private toast: ToastService) {}

  async execute(title: string = ''): Promise<ILink[] | undefined> {
    try {
      let params = new HttpParams();
      if (title) {
        params = params.append('title_contains', title);
      }

      const response = await this.repository.getAll(params);
      return response;
    } catch (error) {
      const errorMessage = new ResponseError(error).getMessage();
      this.toast.showError(errorMessage);
      return undefined;
    }
  }
}
