/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../shared/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { LinbsContractSearchService } from './linbs-contract-search.service';
import { LinbsContractSearch } from '../api-models/linbs-contract-search.model'
import { LinbsContractSearches } from "../api-models/testing/fake-linbs-contract-search.model"

describe('LinbsContractSearchService', () => {
  let injector: TestBed;
  let service: LinbsContractSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LinbsContractSearchService]
    });
    injector = getTestBed();
    service = injector.get(LinbsContractSearchService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLinbsContractSearches', () => {
    it('should return an Promise<LinbsContractSearch[]>', () => {
      const linbsContractSearch = [
       {lineOfBusiness:'sample data', contractSearchType:'sample data', contractSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {lineOfBusiness:'sample data', contractSearchType:'sample data', contractSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {lineOfBusiness:'sample data', contractSearchType:'sample data', contractSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getLinbsContractSearches().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/linbscontractsearches/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(linbsContractSearch);
    });
  });


  describe('#createLinbsContractSearch', () => {
    var id = 1;
    it('should return an Promise<LinbsContractSearch>', () => {
      const linbsContractSearch: LinbsContractSearch = {lineOfBusiness:'sample data', contractSearchType:'sample data', contractSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createLinbsContractSearch(linbsContractSearch).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/linbscontractsearches`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLinbsContractSearch', () => {
    var id = 1;
    it('should return an Promise<LinbsContractSearch>', () => {
      const linbsContractSearch: LinbsContractSearch = {lineOfBusiness:'sample data', contractSearchType:'sample data', contractSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateLinbsContractSearch(linbsContractSearch, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/linbscontractsearches/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLinbsContractSearch', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLinbsContractSearch(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/linbscontractsearches/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});