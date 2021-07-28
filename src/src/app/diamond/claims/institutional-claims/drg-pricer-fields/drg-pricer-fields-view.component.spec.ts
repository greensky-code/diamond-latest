import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrgPricerFieldsViewComponent } from './drg-pricer-fields-view.component';

describe('DrgPricerFieldsViewComponent', () => {
  let component: DrgPricerFieldsViewComponent;
  let fixture: ComponentFixture<DrgPricerFieldsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrgPricerFieldsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrgPricerFieldsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
