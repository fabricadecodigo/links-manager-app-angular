import { TestBed } from '@angular/core/testing';
import { ConfirmationService, ToastService } from '@core/services';
import { LinkRepository } from '@links/repositories/link.repository';
import { of } from 'rxjs';
import { DeleteLinkHandler } from './delete-link.handler';

describe('DeleteLinkHandler', () => {
  let service: DeleteLinkHandler;
  const linkRepositorySpy = jasmine.createSpyObj<LinkRepository>('LinkRepository', ['delete']);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess']);
  const confirmationSpy = jasmine.createSpyObj<ConfirmationService>('ConfirmationService', ['confirmDelete']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LinkRepository, useValue: linkRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
        { provide: ConfirmationService, useValue: confirmationSpy },
      ],
    });
    service = TestBed.inject(DeleteLinkHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero excluir um link Quando confirmo a exclusão Então o link é excluído com sucesso', async () => {
    confirmationSpy.confirmDelete.and.returnValue(of(true));

    const response = await service.execute({
      ativo: true,
      title: 'Teste',
      url: 'http://teste.com',
      id: '1',
    });

    expect(response).toBeTrue();
    expect(linkRepositorySpy.delete).toHaveBeenCalled();
    expect(toastSpy.showSuccess).toHaveBeenCalledWith('Link deletado com sucesso');
  });

  it('Dado que eu quero excluir um link Quando não confirmo a exclusão Então o link não é excluído', async () => {
    confirmationSpy.confirmDelete.and.returnValue(of(false));

    const response = await service.execute({
      ativo: true,
      title: 'Teste',
      url: 'http://teste.com',
      id: '1',
    });

    expect(response).toBeFalse();
    expect(linkRepositorySpy.delete).toHaveBeenCalledTimes(0);
    expect(toastSpy.showSuccess).toHaveBeenCalledTimes(0);
  });

  afterEach(() => {
    linkRepositorySpy.delete.calls.reset();
    toastSpy.showSuccess.calls.reset();
  });
});
