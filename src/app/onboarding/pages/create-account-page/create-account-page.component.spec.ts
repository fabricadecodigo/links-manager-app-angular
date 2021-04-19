import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '@core/modules';
import { CreateAccountPageComponent } from './create-account-page.component';

describe('CreateAccountPageComponent', () => {
  let component: CreateAccountPageComponent;
  let fixture: ComponentFixture<CreateAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountPageComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, RouterTestingModule, AngularMaterialModule],
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
});
