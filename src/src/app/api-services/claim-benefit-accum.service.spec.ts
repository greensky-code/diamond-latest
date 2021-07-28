import { TestBed } from '@angular/core/testing';

import { ClaimBenefitAccumService } from './claim-benefit-accum.service';

describe('ClaimBenefitAccumService', () => {
  let service: ClaimBenefitAccumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimBenefitAccumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
