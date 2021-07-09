import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '@core/modules';
import { GetLinksBySlugHandler } from '@users-links/business-rules/getlinksbyslug-userlinks.handler';
import { UsersLinksPageComponent } from './users-links-page.component';

describe('UsersLinksPageComponent', () => {
  let component: UsersLinksPageComponent;
  let fixture: ComponentFixture<UsersLinksPageComponent>;
  const getLinksBySlugHandlerSpy = jasmine.createSpyObj<GetLinksBySlugHandler>('GetLinksBySlugHandler', ['execute']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersLinksPageComponent],
      imports: [AngularMaterialModule, RouterTestingModule],
      providers: [{ provide: GetLinksBySlugHandler, useValue: getLinksBySlugHandlerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersLinksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
