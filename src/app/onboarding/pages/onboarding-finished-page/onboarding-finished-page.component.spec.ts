import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingFinishedPageComponent } from './onboarding-finished-page.component';

describe('OnboardingFinishedPageComponent', () => {
  let component: OnboardingFinishedPageComponent;
  let fixture: ComponentFixture<OnboardingFinishedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingFinishedPageComponent ]
    })
    .compileComponents();
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
