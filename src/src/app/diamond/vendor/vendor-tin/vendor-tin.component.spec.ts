import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTINComponent } from './vendor-tin.component';

describe('VendorTinComponent', () => {
  let component: VendorTINComponent;
  let fixture: ComponentFixture<VendorTINComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorTINComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorTINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
