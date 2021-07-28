import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHoldRulesComponent } from './claim-hold-rules.component';

describe('ClaimHoldRulesComponent', () => {
  let component: ClaimHoldRulesComponent;
  let fixture: ComponentFixture<ClaimHoldRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimHoldRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimHoldRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
