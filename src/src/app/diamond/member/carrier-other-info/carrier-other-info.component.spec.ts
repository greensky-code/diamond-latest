import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierOtherInfoComponent } from './carrier-other-info.component';

describe('CarrierOtherInfoComponent', () => {
  let component: CarrierOtherInfoComponent;
  let fixture: ComponentFixture<CarrierOtherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierOtherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
