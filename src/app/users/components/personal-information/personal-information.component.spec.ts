import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@authentication/services/auth.service';
import { UpdatePersonalInformationHandler } from '@users/business-rules/update-personal-information.handler';
import { PersonalInformationComponent } from './personal-information.component';

describe('PersonalInformationComponent', () => {
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;
  const updatePersonalInformationHandlerSpy = jasmine.createSpyObj<UpdatePersonalInformationHandler>(
    'UpdatePersonalInformationHandler',
    ['execute']
  );
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalInformationComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UpdatePersonalInformationHandler, useValue: updatePersonalInformationHandlerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
