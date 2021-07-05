import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { GetAllLinkHandler } from '@links/business-rules/getall-link.handler';

import { LinksListPageComponent } from './links-list-page.component';

describe('LinksListPageComponent', () => {
  let component: LinksListPageComponent;
  let fixture: ComponentFixture<LinksListPageComponent>;
  const getAllLinkHandlerSpy = jasmine.createSpyObj<GetAllLinkHandler>('GetAllLinkHandler', ['execute']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinksListPageComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: GetAllLinkHandler, useValue: getAllLinkHandlerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
