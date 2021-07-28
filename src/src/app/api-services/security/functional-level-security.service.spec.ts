import { TestBed } from '@angular/core/testing';

import { FunctionalLevelSecurityService } from './functional-level-security.service';

describe('FunctionalLevelSecurityService', () => {
  let service: FunctionalLevelSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionalLevelSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
