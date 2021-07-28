import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierCobVerficationInformationComponent } from './carrier-cob-verfication-information.component';

describe('CarrierCobVerficationInformationComponent', () => {
  let component: CarrierCobVerficationInformationComponent;
  let fixture: ComponentFixture<CarrierCobVerficationInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierCobVerficationInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierCobVerficationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
