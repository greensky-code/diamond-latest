import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonClaimsControllerComponent } from './addon-claims-controller.component';

describe('AddonClaimsControllerComponent', () => {
  let component: AddonClaimsControllerComponent;
  let fixture: ComponentFixture<AddonClaimsControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddonClaimsControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonClaimsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
