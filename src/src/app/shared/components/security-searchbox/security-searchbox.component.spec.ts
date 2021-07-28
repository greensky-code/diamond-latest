import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySearchboxComponent } from './security-searchbox.component';

describe('SecuritySearchboxComponent', () => {
  let component: SecuritySearchboxComponent;
  let fixture: ComponentFixture<SecuritySearchboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritySearchboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritySearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
