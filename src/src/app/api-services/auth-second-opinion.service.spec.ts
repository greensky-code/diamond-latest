import { TestBed } from '@angular/core/testing';

import { AuthSecondOpinionService } from './auth-second-opinion.service';

describe('AuthSecondOpinionService', () => {
  let service: AuthSecondOpinionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSecondOpinionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
