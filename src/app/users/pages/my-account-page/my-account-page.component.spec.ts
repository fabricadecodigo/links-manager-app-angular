import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@authentication/services/auth.service';
import { MyAccountPageComponent } from './my-account-page.component';

describe('MyAccountPageComponent', () => {
  let component: MyAccountPageComponent;
  let fixture: ComponentFixture<MyAccountPageComponent>;
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAccountPageComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
