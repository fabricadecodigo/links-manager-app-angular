import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingHandler } from '@onboarding/business-rules/onboarding.handler';
import { of } from 'rxjs';
import { OnboardingFinishedPageComponent } from './onboarding-finished-page.component';

describe('OnboardingFinishedPageComponent', () => {
  let component: OnboardingFinishedPageComponent;
  let fixture: ComponentFixture<OnboardingFinishedPageComponent>;
  const onboardingHandlerSpy = jasmine.createSpyObj<OnboardingHandler>('OnboardingHandler', ['getOnboardingResult']);

  beforeEach(async () => {
    onboardingHandlerSpy.getOnboardingResult.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      declarations: [OnboardingFinishedPageComponent],
      providers: [{ provide: OnboardingHandler, useValue: onboardingHandlerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingFinishedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
