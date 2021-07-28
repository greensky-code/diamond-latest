import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPaymentComponent } from './provider-payment.component';

describe('ProviderPaymentComponent', () => {
  let component: ProviderPaymentComponent;
  let fixture: ComponentFixture<ProviderPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
