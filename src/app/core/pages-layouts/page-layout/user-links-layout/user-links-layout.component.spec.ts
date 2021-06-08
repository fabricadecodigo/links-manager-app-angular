import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLinksLayoutComponent } from './user-links-layout.component';

describe('UserLinksLayoutComponent', () => {
  let component: UserLinksLayoutComponent;
  let fixture: ComponentFixture<UserLinksLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLinksLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLinksLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
