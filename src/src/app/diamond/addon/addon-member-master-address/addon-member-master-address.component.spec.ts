import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonMemberMasterAddressComponent } from './addon-member-master-address.component';

describe('AddonMemberMasterAddressComponent', () => {
  let component: AddonMemberMasterAddressComponent;
  let fixture: ComponentFixture<AddonMemberMasterAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddonMemberMasterAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonMemberMasterAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
