import { HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@core/services';
import { LinkRepository } from '@links/repositories/link.repository';
import { GetAllLinkHandler } from './getall-link.handler';

describe('GetAllLinkHandler', () => {
  let service: GetAllLinkHandler;
  const linkRepositorySpy = jasmine.createSpyObj<LinkRepository>('LinkRepository', ['getAll']);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LinkRepository, useValue: linkRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });
    service = TestBed.inject(GetAllLinkHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero buscar os links Quando não faço um filtro por título Então a pesquisa é efetuada com sucesso', async () => {
    const searchTerm = '';
    const params = new HttpParams();

    await service.execute(searchTerm);

    expect(linkRepositorySpy.getAll).toHaveBeenCalledWith(params);
  });

  it('Dado que eu quero buscar os links Quando faço um filtro por título Então a pesquisa é efetuada com sucesso', async () => {
    const searchTerm = 'Teste';
    const params = new HttpParams().append('title_contains', searchTerm);

    await service.execute(searchTerm);

    expect(linkRepositorySpy.getAll).toHaveBeenCalledWith(params);
  });

  afterEach(() => {
    linkRepositorySpy.getAll.calls.reset();
  });
});
