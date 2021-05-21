import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '@core/modules';
import { LinksFormPageComponent } from './links-form-page.component';

describe('LinksFormPageComponent', () => {
  let component: LinksFormPageComponent;
  let fixture: ComponentFixture<LinksFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinksFormPageComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, AngularMaterialModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
