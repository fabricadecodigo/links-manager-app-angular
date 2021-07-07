import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteLinkHandler } from '@links/business-rules/delete-link.handler';
import { GetAllLinkHandler } from '@links/business-rules/getall-link.handler';

import { LinksListPageComponent } from './links-list-page.component';

describe('LinksListPageComponent', () => {
  let component: LinksListPageComponent;
  let fixture: ComponentFixture<LinksListPageComponent>;
  const getAllLinkHandlerSpy = jasmine.createSpyObj<GetAllLinkHandler>('GetAllLinkHandler', ['execute']);
  const deleteLinkHandlerSpy = jasmine.createSpyObj<DeleteLinkHandler>('DeleteLinkHandler', ['execute']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinksListPageComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: GetAllLinkHandler, useValue: getAllLinkHandlerSpy },
        { provide: DeleteLinkHandler, useValue: deleteLinkHandlerSpy },
      ],
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
