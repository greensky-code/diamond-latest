import { TestBed } from '@angular/core/testing';

import { BenefitRuleSelectionService } from './benefit-rule-selection.service';

describe('BenefitRuleSelectionService', () => {
  let service: BenefitRuleSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenefitRuleSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
