import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordHandler } from '@authentication/business-rules/forgot-password.handler';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';

describe('ForgotPasswordPageComponent', () => {
  let component: ForgotPasswordPageComponent;
  let fixture: ComponentFixture<ForgotPasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordPageComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ForgotPasswordHandler,
          useValue: jasmine.createSpyObj<ForgotPasswordHandler>('ForgotPasswordHandler', ['execute']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
