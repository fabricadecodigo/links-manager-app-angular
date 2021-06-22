import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ResetPasswordHandler } from '@authentication/business-rules/reset-password.handler';
import { ResetPasswordPageComponent } from './reset-password-page.component';

describe('ResetPasswordPageComponent', () => {
  let component: ResetPasswordPageComponent;
  let fixture: ComponentFixture<ResetPasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordPageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: ResetPasswordHandler,
          useValue: jasmine.createSpyObj<ResetPasswordHandler>('ResetPasswordHandler', ['execute']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
