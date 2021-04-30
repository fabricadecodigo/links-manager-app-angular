import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksListPageComponent } from './links-list-page.component';

describe('LinksListPageComponent', () => {
  let component: LinksListPageComponent;
  let fixture: ComponentFixture<LinksListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksListPageComponent ]
    })
    .compileComponents();
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
