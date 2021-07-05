import { ILink } from './../models/ilink';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@core/services';
import { LinkRepository } from '@links/repositories/link.repository';
import { UpdateLinkHandler } from './update-link.handler';
import { HttpErrorResponse } from '@angular/common/http';

describe('UpdateLinkHandler', () => {
  let service: UpdateLinkHandler;
  const linkRepositorySpy = jasmine.createSpyObj<LinkRepository>('LinkRepository', ['update']);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LinkRepository, useValue: linkRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });
    service = TestBed.inject(UpdateLinkHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero alterar um link Quando passo os dados corretos Então o link é alterado com sucesso', async () => {
    const link: ILink = {
      ativo: true,
      title: 'Teste',
      url: 'http://teste.com',
    };

    linkRepositorySpy.update.and.returnValue(
      Promise.resolve({
        ...link,
        id: '1',
      })
    );

    const response = await service.execute(link);

    expect(response).toBeTruthy();
    expect(toastSpy.showSuccess).toHaveBeenCalledWith('Link alterado com sucesso');
  });

  it('Dado que eu quero alterar um link Quando algum erro ocorre na api Então exibe a mensagem de erro', async () => {
    const link: ILink = {
      ativo: true,
      title: 'Teste',
      url: 'http://teste.com',
    };

    linkRepositorySpy.update.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          error: 'Teste de erro na api',
          status: 500,
          statusText: 'Internal server error',
        })
      )
    );

    const response = await service.execute(link);

    expect(response).toBeUndefined();
    expect(toastSpy.showError).toHaveBeenCalledWith('Teste de erro na api');
  });

  afterEach(() => {
    toastSpy.showSuccess.calls.reset();
    toastSpy.showError.calls.reset();
  });
});
