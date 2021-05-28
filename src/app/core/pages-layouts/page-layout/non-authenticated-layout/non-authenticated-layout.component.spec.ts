import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthenticatedLayoutComponent } from './non-authenticated-layout.component';

describe('NonAuthenticatedLayoutComponent', () => {
  let component: NonAuthenticatedLayoutComponent;
  let fixture: ComponentFixture<NonAuthenticatedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthenticatedLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthenticatedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
