import { TestBed } from '@angular/core/testing';
import { AuthService } from '@authentication/services/auth.service';
import { CompanyRepository } from '@onboarding/repositories/company.repository';
import { RegisterUserRepository } from '@onboarding/repositories/register-user.repository';
import { OnboardingHandler } from './onboarding.handler';

describe('OnboardingHandler', () => {
  let service: OnboardingHandler;
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['setToken', 'setUser']);
  const registerUserRepositorySpy = jasmine.createSpyObj<RegisterUserRepository>('RegisterUserRepository', ['create']);
  const companyRepositorySpy = jasmine.createSpyObj<CompanyRepository>('CompanyRepository', ['create']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: RegisterUserRepository, useValue: registerUserRepositorySpy },
        { provide: CompanyRepository, useValue: companyRepositorySpy },
      ],
    });
    service = TestBed.inject(OnboardingHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Dado a criação da conta Quando não tem um usuário Então retornar erro na criação de usuário', async () => {
    await service.execute();
    service.getOnboardingResult().subscribe((result) => {
      expect(result?.title).toBe('Ops! Erro ao cadastrar o usuário');
      expect(result?.message).toBe('Ocorreu algum erro no cadastro do usuário. Inicie o processo novamente');
      expect(result?.messageType).toBe('error');
      expect(result?.buttonTitle).toBe('Iniciar novamente');
      expect(result?.buttonRouter).toBe('/create-account');
    });
  });

  it('Dado a criação da conta Quando não tem uma empresa Então retornar erro na criação de empresa', async () => {
    registerUserRepositorySpy.create.and.returnValue(
      Promise.resolve({
        jwt: '1asd2323d',
        user: {
          id: 1,
          Name: 'Teste',
          email: 'teste@teste.com',
          username: 'teste',
        },
      })
    );

    service.addUser({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '123456',
      username: 'teste',
    });

    await service.execute();
    service.getOnboardingResult().subscribe((result) => {
      expect(result?.title).toBe('Ops! Erro ao cadastrar a empresa');
      expect(result?.message).toBe('Ocorreu algum erro no cadastro da empresa. Inicie o processo novamente');
      expect(result?.messageType).toBe('error');
      expect(result?.buttonTitle).toBe('Iniciar novamente');
      expect(result?.buttonRouter).toBe('/create-company');
    });
  });

  it('Dado a criação da conta Quando se tem usuário e empresa Então cadastrar com sucesso', async () => {
    registerUserRepositorySpy.create.and.returnValue(
      Promise.resolve({
        jwt: '1asd2323d',
        user: {
          id: 1,
          Name: 'Teste',
          email: 'teste@teste.com',
          username: 'teste',
        },
      })
    );

    companyRepositorySpy.create.and.returnValue(
      Promise.resolve({
        id: '1',
        name: 'Teste',
        slug: 'teste',
      })
    );

    service.addUser({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '123456',
      username: 'teste',
    });

    service.addCompany({
      name: 'Teste',
      slug: 'teste',
    });

    await service.execute();
    service.getOnboardingResult().subscribe((result) => {
      expect(result?.title).toBe('Tudo pronto');
      expect(result?.message).toBe('Sua conta foi criada com sucesso');
      expect(result?.messageType).toBe('success');
      expect(result?.buttonTitle).toBe('Ir para a dashboard');
      expect(result?.buttonRouter).toBe('/admin/links');
      expect(authServiceSpy.setToken).toHaveBeenCalledWith('1asd2323d');
      expect(authServiceSpy.setUser).toHaveBeenCalledWith({
        Name: 'Teste',
        email: 'teste@teste.com',
        id: 1,
        username: 'teste',
        company: {
          id: 1,
          name: 'Teste',
          slug: 'teste',
        },
      });
    });
  });
});
