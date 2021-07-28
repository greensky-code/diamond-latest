import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDisplayComponent } from './audit-display.component';

describe('AuditDisplayComponent', () => {
  let component: AuditDisplayComponent;
  let fixture: ComponentFixture<AuditDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
