import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThruMedDefRuleDetComponent } from './thru-med-def-rule-det.component';

describe('ThruMedDefRuleDetComponent', () => {
  let component: ThruMedDefRuleDetComponent;
  let fixture: ComponentFixture<ThruMedDefRuleDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThruMedDefRuleDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThruMedDefRuleDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
