import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgDatepickerComponent } from './ag-datepicker.component';

describe('AgDatepickerComponent', () => {
  let component: AgDatepickerComponent;
  let fixture: ComponentFixture<AgDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
