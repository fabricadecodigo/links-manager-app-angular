import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { ILink } from '@links/models/ilink';
import { LinkRepository } from '@links/repositories/link.repository';

@Injectable({
  providedIn: 'root',
})
export class GetByIdLinkHandler {
  constructor(private repository: LinkRepository, private toast: ToastService) {}

  async execute(id: number): Promise<ILink | undefined> {
    try {
      if (id > 0) {
        const response = await this.repository.getById(id);
        return response;
      } else {
        throw new Error('O identificador do link não é valido.');
      }
    } catch (error) {
      const errorMessage = new GetLinkByIdResponseError(error).getMessage();
      this.toast.showError(errorMessage);
      return undefined;
    }
  }
}

class GetLinkByIdResponseError extends ResponseError {
  constructor(responseError: HttpErrorResponse | Error) {
    super(responseError);
  }

  getMessage(): string {
    if (this.statusCode === 404) {
      return 'Link não encontrado';
    }

    return super.getMessage();
  }
}
