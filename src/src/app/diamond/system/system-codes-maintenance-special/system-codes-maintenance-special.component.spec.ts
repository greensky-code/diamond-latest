import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCodesMaintenanceSpecialComponent } from './system-codes-maintenance-special.component';

describe('SystemCodesMaintenanceSpecialComponent', () => {
  let component: SystemCodesMaintenanceSpecialComponent;
  let fixture: ComponentFixture<SystemCodesMaintenanceSpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemCodesMaintenanceSpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCodesMaintenanceSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
