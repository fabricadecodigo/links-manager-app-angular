import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@core/services';
import { ILink } from '@links/models/ilink';
import { LinkRepository } from '@links/repositories/link.repository';
import { CreateLinkHandler } from './create-link.handler';

describe('CreateLinkHandler', () => {
  let service: CreateLinkHandler;
  const linkRepositorySpy = jasmine.createSpyObj<LinkRepository>('LinkRepository', ['create']);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LinkRepository, useValue: linkRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });
    service = TestBed.inject(CreateLinkHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero criar um link Quando passo os dados corretos Então o link é criado com sucesso', async () => {
    const link: ILink = {
      ativo: true,
      title: 'Teste',
      url: 'http://teste.com',
    };

    linkRepositorySpy.create.and.returnValue(
      Promise.resolve({
        ...link,
        id: '1',
      })
    );

    const response = await service.execute(link);

    expect(response).toBeTruthy();
    expect(toastSpy.showSuccess).toHaveBeenCalledWith('Link incluído com sucesso');
  });

  it('Dado que eu quero criar um link Quando algum erro ocorre na api Então exibe a mensagem de erro', async () => {
    const link: ILink = {
      ativo: true,
      title: 'Teste',
      url: 'http://teste.com',
    };

    linkRepositorySpy.create.and.returnValue(
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
