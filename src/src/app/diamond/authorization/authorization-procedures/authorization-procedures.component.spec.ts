import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationProceduresComponent } from './authorization-procedures.component';

describe('AuthorizationProceduresComponent', () => {
  let component: AuthorizationProceduresComponent;
  let fixture: ComponentFixture<AuthorizationProceduresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationProceduresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
