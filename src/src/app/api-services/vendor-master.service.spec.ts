import { TestBed } from '@angular/core/testing';

import { VendorMasterService } from './vendor-master.service';

describe('VendorMasterService', () => {
  let service: VendorMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
