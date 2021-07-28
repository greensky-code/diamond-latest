import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserErrorPopupComponent } from './user-error-popup.component';

describe('UserErrorPopupComponent', () => {
  let component: UserErrorPopupComponent;
  let fixture: ComponentFixture<UserErrorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserErrorPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserErrorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
