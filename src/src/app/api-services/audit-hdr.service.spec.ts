import { TestBed } from '@angular/core/testing';

import { AuditHdrService } from './audit-hdr.service';

describe('AuditHdrService', () => {
  let service: AuditHdrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditHdrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
