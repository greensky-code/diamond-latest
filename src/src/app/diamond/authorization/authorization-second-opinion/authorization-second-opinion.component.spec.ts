import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationSecondOpinionComponent } from './authorization-second-opinion.component';

describe('AuthorizationSecondOpinionComponent', () => {
  let component: AuthorizationSecondOpinionComponent;
  let fixture: ComponentFixture<AuthorizationSecondOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationSecondOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationSecondOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
