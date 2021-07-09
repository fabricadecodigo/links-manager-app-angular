import { Injectable } from '@angular/core';
import { AuthService } from '@authentication/services/auth.service';
import { IAuthenticatedUser } from '@onboarding/models/iauthenticated-user';
import { ICompany } from '@onboarding/models/icompany';
import { IUser } from '@onboarding/models/iuser';
import { CompanyRepository } from '@onboarding/repositories/company.repository';
import { RegisterUserRepository } from '@onboarding/repositories/register-user.repository';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IOnboardingResult {
  title: string;
  message: string;
  messageType: 'success' | 'error';
  buttonTitle: string;
  buttonRouter: string;
}

@Injectable({
  providedIn: 'root',
})
export class OnboardingHandler {
  private user: IUser | undefined;
  private company: ICompany | undefined;
  private onboardingBeraviorSubject = new BehaviorSubject<IOnboardingResult | undefined>(undefined);

  constructor(
    private authService: AuthService,
    private registerUserRepository: RegisterUserRepository,
    private companyRepository: CompanyRepository
  ) {}

  addUser(user: IUser): void {
    this.user = user;
  }

  addCompany(company: ICompany): void {
    this.company = company;
  }

  async execute(): Promise<void> {
    const authenticatedUser = await this.createUser();

    if (!authenticatedUser) {
      this.setErroOnCreateUser();
      return;
    }

    this.authService.setToken(authenticatedUser.jwt);

    const company = await this.createCompany();
    if (!company) {
      this.setErroOnCreateCompany();
      return;
    }

    authenticatedUser.user.company = {
      id: Number(company.id),
      name: company.name,
      slug: company.slug
    };

    this.authService.setUser(authenticatedUser.user);

    this.setOnboardinSuccess();
  }

  getOnboardingResult(): Observable<IOnboardingResult | undefined> {
    return this.onboardingBeraviorSubject.asObservable();
  }

  private setErroOnCreateUser(): void {
    const result: IOnboardingResult = {
      title: 'Ops! Erro ao cadastrar o usuário',
      message: 'Ocorreu algum erro no cadastro do usuário. Inicie o processo novamente',
      messageType: 'error',
      buttonTitle: 'Iniciar novamente',
      buttonRouter: '/create-account',
    };
    this.onboardingBeraviorSubject.next(result);
  }

  private setErroOnCreateCompany(): void {
    const result: IOnboardingResult = {
      title: 'Ops! Erro ao cadastrar a empresa',
      message: 'Ocorreu algum erro no cadastro da empresa. Inicie o processo novamente',
      messageType: 'error',
      buttonTitle: 'Iniciar novamente',
      buttonRouter: '/create-company',
    };
    this.onboardingBeraviorSubject.next(result);
  }

  private setOnboardinSuccess(): void {
    const result: IOnboardingResult = {
      title: 'Tudo pronto',
      message: 'Sua conta foi criada com sucesso',
      messageType: 'success',
      buttonTitle: 'Ir para a dashboard',
      buttonRouter: '/admin/links',
    };
    this.onboardingBeraviorSubject.next(result);
  }

  private async createUser(): Promise<IAuthenticatedUser | undefined> {
    try {
      if (!this.user) {
        throw new Error('O dados do usuário são obrigatórios');
      }

      return await this.registerUserRepository.create(this.user);
    } catch (error) {
      return undefined;
    }
  }

  private async createCompany(): Promise<ICompany | undefined> {
    try {
      if (!this.company) {
        throw new Error('O dados da empresa são obrigatórios');
      }
      return this.companyRepository.create(this.company);
    } catch (error) {
      return undefined;
    }
  }
}
