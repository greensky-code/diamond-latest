import { TestBed } from '@angular/core/testing';

import { ClaimHoldDeterminantsService } from './claim-hold-determinants.service';

describe('ClaimHoldDeterminantsService', () => {
  let service: ClaimHoldDeterminantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimHoldDeterminantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
