import { TestBed } from '@angular/core/testing';

import { UserDefinedValidateCodeService } from './user-defined-validate-code.service';

describe('UserDefinedValidateCodeService', () => {
  let service: UserDefinedValidateCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDefinedValidateCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
