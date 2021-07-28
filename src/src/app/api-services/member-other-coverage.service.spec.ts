import { TestBed } from '@angular/core/testing';

import { MemberOtherCoverageService } from './member-other-coverage.service';

describe('MemberOtherCoverageService', () => {
  let service: MemberOtherCoverageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberOtherCoverageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
