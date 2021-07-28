import { TestBed } from '@angular/core/testing';

import { CiebIncomingClaimDetailService } from './cieb-incoming-claim-detail.service';

describe('CiebIncomingClaimDetailService', () => {
  let service: CiebIncomingClaimDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiebIncomingClaimDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
