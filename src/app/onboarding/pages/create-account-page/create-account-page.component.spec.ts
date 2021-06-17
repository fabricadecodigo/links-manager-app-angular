import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '@core/modules';
import { OnboardingHandler } from '@onboarding/business-rules/onboarding.handler';
import { CreateAccountPageComponent } from './create-account-page.component';

describe('CreateAccountPageComponent', () => {
  let component: CreateAccountPageComponent;
  let fixture: ComponentFixture<CreateAccountPageComponent>;
  const onboardingHandlerSpy = jasmine.createSpyObj<OnboardingHandler>('OnboardingHandler', ['addUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountPageComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, RouterTestingModule, AngularMaterialModule],
      providers: [{ provide: OnboardingHandler, useValue: onboardingHandlerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dado que eu quero cadastrar um usuário Quando eu clicar em salvar Então adicionar o usuario para cadastro', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.onSubmit();
    expect(onboardingHandlerSpy.addUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['create-company']);
  });
});
