import { TestBed } from '@angular/core/testing';

import { AuditChangeDtlService } from './audit-change-dtl.service';

describe('AuditChangeDtlService', () => {
  let service: AuditChangeDtlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditChangeDtlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
