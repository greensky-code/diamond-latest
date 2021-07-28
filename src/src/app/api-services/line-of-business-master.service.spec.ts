import { TestBed } from '@angular/core/testing';

import { LineOfBusinessMasterService } from './line-of-business-master.service';

describe('LineOfBusinessMasterService', () => {
  let service: LineOfBusinessMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineOfBusinessMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
