import { TestBed } from '@angular/core/testing';

import { CiebExchangeRateService } from './cieb-exchange-rate.service';

describe('CiebExchangeRateService', () => {
  let service: CiebExchangeRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiebExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
