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

import { CapModelRateSearchService } from './cap-model-rate-search.service';
import { CapModelRateSearch } from '../api-models/cap-model-rate-search.model'
import { CapModelRateSearches } from "../api-models/testing/fake-cap-model-rate-search.model"

describe('CapModelRateSearchService', () => {
  let injector: TestBed;
  let service: CapModelRateSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapModelRateSearchService]
    });
    injector = getTestBed();
    service = injector.get(CapModelRateSearchService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapModelRateSearches', () => {
    it('should return an Promise<CapModelRateSearch[]>', () => {
      const capModelRateSearch = [
       {capModelId:'sample data', rateSearchType:'sample data', rateSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capModelId:'sample data', rateSearchType:'sample data', rateSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capModelId:'sample data', rateSearchType:'sample data', rateSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCapModelRateSearches().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capmodelratesearches/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capModelRateSearch);
    });
  });


  describe('#createCapModelRateSearch', () => {
    var id = 1;
    it('should return an Promise<CapModelRateSearch>', () => {
      const capModelRateSearch: CapModelRateSearch = {capModelId:'sample data', rateSearchType:'sample data', rateSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCapModelRateSearch(capModelRateSearch).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmodelratesearches`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapModelRateSearch', () => {
    var id = 1;
    it('should return an Promise<CapModelRateSearch>', () => {
      const capModelRateSearch: CapModelRateSearch = {capModelId:'sample data', rateSearchType:'sample data', rateSearchOrder:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCapModelRateSearch(capModelRateSearch, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmodelratesearches/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapModelRateSearch', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapModelRateSearch(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmodelratesearches/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});