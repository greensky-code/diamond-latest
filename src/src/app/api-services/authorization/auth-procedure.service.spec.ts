import { TestBed } from '@angular/core/testing';

import { AuthProcedureServiceService } from './auth-procedure-service.service';

describe('AuthProcedureServiceService', () => {
  let service: AuthProcedureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthProcedureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
