import { TestBed } from '@angular/core/testing';

import { ClaimHoldRulesService } from './claim-hold-rules.service';

describe('ClaimHoldRulesService', () => {
  let service: ClaimHoldRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimHoldRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
