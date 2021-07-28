import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitAccumulatorBaseValuesComponent } from './benefit-accumulator-base-values.component';

describe('BenefitAccumulatorBaseValuesComponent', () => {
  let component: BenefitAccumulatorBaseValuesComponent;
  let fixture: ComponentFixture<BenefitAccumulatorBaseValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitAccumulatorBaseValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitAccumulatorBaseValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
