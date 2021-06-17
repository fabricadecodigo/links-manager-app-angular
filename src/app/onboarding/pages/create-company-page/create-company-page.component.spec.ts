import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OnboardingHandler } from '@onboarding/business-rules/onboarding.handler';
import { CreateCompanyPageComponent } from './create-company-page.component';

describe('CreateCompanyPageComponent', () => {
  let component: CreateCompanyPageComponent;
  let fixture: ComponentFixture<CreateCompanyPageComponent>;
  const onboardingHandlerSpy = jasmine.createSpyObj<OnboardingHandler>('OnboardingHandler', ['addCompany', 'execute']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCompanyPageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: OnboardingHandler, useValue: onboardingHandlerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dado que eu quero cadastrar uma empresa Quando eu clicar em salvar Então adicionar empresa para cadastro', async () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    await component.onSubmit();
    expect(onboardingHandlerSpy.addCompany).toHaveBeenCalled();
    expect(onboardingHandlerSpy.execute).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['onboarding-status']);
  });
});
