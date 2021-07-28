import { TestBed } from '@angular/core/testing';

import { AddDatabaseUserService } from './add-database-user.service';

describe('AddDatabaseUserService', () => {
  let service: AddDatabaseUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDatabaseUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
