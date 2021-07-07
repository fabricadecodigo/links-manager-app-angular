import { Injectable } from '@angular/core';
import { ConfirmationService, ToastService } from '@core/services';
import { ILink } from '@links/models/ilink';
import { LinkRepository } from '@links/repositories/link.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteLinkHandler {
  constructor(
    private repository: LinkRepository,
    private toast: ToastService,
    private confirmation: ConfirmationService
  ) {}

  async execute(link: ILink): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmation.confirmDelete(`${link.id} - ${link.title}`).subscribe(async (confirmed) => {
        if (confirmed) {
          await this.repository.delete(Number(link.id));
          this.toast.showSuccess('Link deletado com sucesso');
        }

        resolve(confirmed);
      });
    });
  }
}
