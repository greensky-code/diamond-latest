import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelyFilingRulesSpecialComponent } from './timely-filing-rules-special.component';

describe('TimelyFilingRulesSpecialComponent', () => {
  let component: TimelyFilingRulesSpecialComponent;
  let fixture: ComponentFixture<TimelyFilingRulesSpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelyFilingRulesSpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelyFilingRulesSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
