import { TestBed } from '@angular/core/testing';

import { AlternateSearchService } from './alternate-search.service';

describe('AlternateSearchService', () => {
  let service: AlternateSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlternateSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
