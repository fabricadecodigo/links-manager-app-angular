import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCompanyHandler } from '@users/business-rules/update-company.handler';
import { CompanyInformationComponent } from './company-information.component';

describe('CompanyInformationComponent', () => {
  let component: CompanyInformationComponent;
  let fixture: ComponentFixture<CompanyInformationComponent>;
  const updateCompanyHandlerSpy = jasmine.createSpyObj<UpdateCompanyHandler>('UpdateCompanyHandler', ['execute']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyInformationComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: UpdateCompanyHandler, useValue: updateCompanyHandlerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
