import { TestBed } from '@angular/core/testing';

import { ClaimHoldDeterValuesService } from './claim-hold-deter-values.service';

describe('ClaimHoldDeterValuesService', () => {
  let service: ClaimHoldDeterValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimHoldDeterValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
