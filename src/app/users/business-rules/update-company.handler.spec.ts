import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@authentication/services/auth.service';
import { IEntity } from '@core/models/ientity';
import { IApiError } from '@core/models/response-error';
import { ToastService } from '@core/services';
import { CompanyRepository } from '@onboarding/repositories/company.repository';
import { UpdateCompanyHandler } from './update-company.handler';

describe('UpdateCompanyHandler', () => {
  let service: UpdateCompanyHandler;
  const companyRepositorySpy = jasmine.createSpyObj<CompanyRepository>('CompanyRepository', ['update']);
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['updateCompany']);
  const toastSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CompanyRepository, useValue: companyRepositorySpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });
    service = TestBed.inject(UpdateCompanyHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado que eu quero atualizar a empresa Quando passo as informações corretas Então a empresa é alterado com sucesso', async () => {
    companyRepositorySpy.update.and.returnValue(
      Promise.resolve({
        name: 'Teste',
        slug: 'teste',
        id: '1',
      })
    );

    await service.execute({
      name: 'Teste',
      slug: 'teste',
      id: '1',
    });

    expect(companyRepositorySpy.update).toHaveBeenCalledWith({
      name: 'Teste',
      slug: 'teste',
      id: '1',
    } as IEntity);
    expect(authServiceSpy.updateCompany).toHaveBeenCalledWith('Teste', 'teste');
    expect(toastSpy.showSuccess).toHaveBeenCalledWith('Empresa alterada com sucesso');
  });

  it('Dado que eu quero atualizar a empresa Quando não passo as informações corretas Então exibe mensagem de erro', async () => {
    const error: IApiError = {
      error: 'Error',
      message: [
        {
          messages: [
            {
              id: 'error_id',
              message: 'Erro da api',
            },
          ],
        },
      ],
      statusCode: 500,
    };

    companyRepositorySpy.update.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          error,
          status: 500,
          statusText: 'Internal server error',
        })
      )
    );

    await service.execute({
      name: 'Teste',
      slug: 'teste',
      id: '1',
    });

    expect(toastSpy.showError).toHaveBeenCalledWith('Erro da api');
  });

  afterEach(() => {
    companyRepositorySpy.update.calls.reset();
    authServiceSpy.updateCompany.calls.reset();
    toastSpy.showSuccess.calls.reset();
    toastSpy.showError.calls.reset();
  });
});
