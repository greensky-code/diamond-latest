import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonMemberMasterControllerComponent } from './addon-member-master-controller.component';

describe('AddonMemberMasterControllerComponent', () => {
  let component: AddonMemberMasterControllerComponent;
  let fixture: ComponentFixture<AddonMemberMasterControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddonMemberMasterControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonMemberMasterControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
