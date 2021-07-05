import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@core/services';
import { LinkRepository } from '@links/repositories/link.repository';
import { GetByIdLinkHandler } from './getbyid-link.handler';

describe('GetByIdLinkHandler', () => {
  let service: GetByIdLinkHandler;
  const linkRepositorySpy = jasmine.createSpyObj<LinkRepository>('LinkRepository', ['getById']);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LinkRepository, useValue: linkRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });
    service = TestBed.inject(GetByIdLinkHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero recuperar um link Quando passo um id válido Então o link é recuperado com sucesso', async () => {
    linkRepositorySpy.getById.and.returnValue(
      Promise.resolve({
        id: '1',
        ativo: true,
        title: 'Teste',
        url: 'http://teste.com',
      })
    );

    const response = await service.execute(1);
    expect(response).toBeTruthy();
  });

  it('Dado que eu quero recuperar um link Quando passo um id inválido Então exibe mensagem de erro', async () => {
    const response = await service.execute(0);
    expect(response).toBeUndefined();
    expect(toastSpy.showError).toHaveBeenCalledWith('O identificador do link não é valido.');
  });

  it('Dado que eu quero recuperar um link Quando o link não existe Então exibe mensagem de erro', async () => {
    linkRepositorySpy.getById.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          error: 'Error',
          status: 404,
          statusText: 'Not found',
        })
      )
    );

    const response = await service.execute(1);
    expect(response).toBeUndefined();
    expect(toastSpy.showError).toHaveBeenCalledWith('Link não encontrado');
  });

  afterEach(() => {
    toastSpy.showError.calls.reset();
  });
});
