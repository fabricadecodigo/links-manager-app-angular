import { TestBed } from '@angular/core/testing';
import { ToastService } from '@core/services';
import { CompanyLinksRepository } from '@users-links/repositories/company-links.repository';
import { GetLinksBySlugHandler } from './getlinksbyslug-userlinks.handler';

describe('GetLinksBySlugHandler', () => {
  let service: GetLinksBySlugHandler;
  const companyLinksRepositorySpy = jasmine.createSpyObj<CompanyLinksRepository>('CompanyLinksRepository', [
    'getByParams',
  ]);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showError']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CompanyLinksRepository, useValue: companyLinksRepositorySpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });
    service = TestBed.inject(GetLinksBySlugHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero ver os links de uma empresa Quando passo um slug valido Então os dados são retornados com sucesso', async () => {
    companyLinksRepositorySpy.getByParams.and.returnValue(
      Promise.resolve([
        {
          name: 'Teste empresa',
          links: [
            {
              title: 'Teste Ativo',
              url: 'http://teste.com',
              ativo: true,
            },
            {
              title: 'Teste Inativo',
              url: 'http://teste.com',
              ativo: false,
            },
          ],
        },
      ])
    );

    const response = await service.execute('teste');

    expect(response?.name).toBe('Teste empresa');
    expect(response?.links.length).toBe(1);
  });

  it('Dado que eu quero ver os links de uma empresa Quando passo um slug que não existe Então exibe mensagem de erro', async () => {
    companyLinksRepositorySpy.getByParams.and.returnValue(Promise.resolve([]));

    const response = await service.execute('teste');

    expect(response).toBeUndefined();
    expect(toastSpy.showError).toHaveBeenCalledWith('Nenhum link encontrado para esta empresa');
  });
});
