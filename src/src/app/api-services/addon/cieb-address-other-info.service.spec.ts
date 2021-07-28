import { TestBed } from '@angular/core/testing';

import { CiebAddressOtherInfoService } from './cieb-address-other-info.service';

describe('CiebAddressOtherInfoService', () => {
  let service: CiebAddressOtherInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiebAddressOtherInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
