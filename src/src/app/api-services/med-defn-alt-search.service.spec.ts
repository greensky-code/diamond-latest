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

import { MedDefnAltSearchService } from './med-defn-alt-search.service';
import { MedDefnAltSearch } from '../api-models/med-defn-alt-search.model'
import { MedDefnAltSearches } from "../api-models/testing/fake-med-defn-alt-search.model"

describe('MedDefnAltSearchService', () => {
  let injector: TestBed;
  let service: MedDefnAltSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedDefnAltSearchService]
    });
    injector = getTestBed();
    service = injector.get(MedDefnAltSearchService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMedDefnAltSearches', () => {
    it('should return an Promise<MedDefnAltSearch[]>', () => {
      const medDefnAltSearch = [
       {claimType:'sample data', criteriaSrchPriority:1234, altSrchCritValue:'sample data', criteriaSrchOrder:1234, medDefOrder:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayValue:'sample data'},
       {claimType:'sample data', criteriaSrchPriority:1234, altSrchCritValue:'sample data', criteriaSrchOrder:1234, medDefOrder:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayValue:'sample data'},
       {claimType:'sample data', criteriaSrchPriority:1234, altSrchCritValue:'sample data', criteriaSrchOrder:1234, medDefOrder:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayValue:'sample data'}

      ];
      service.getMedDefnAltSearches().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnaltsearches/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(medDefnAltSearch);
    });
  });


  describe('#createMedDefnAltSearch', () => {
    var id = 1;
    it('should return an Promise<MedDefnAltSearch>', () => {
      const medDefnAltSearch: MedDefnAltSearch = {claimType:'sample data', criteriaSrchPriority:1234, altSrchCritValue:'sample data', criteriaSrchOrder:1234, medDefOrder:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayValue:'sample data'};
      service.createMedDefnAltSearch(medDefnAltSearch).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnaltsearches`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMedDefnAltSearch', () => {
    var id = 1;
    it('should return an Promise<MedDefnAltSearch>', () => {
      const medDefnAltSearch: MedDefnAltSearch = {claimType:'sample data', criteriaSrchPriority:1234, altSrchCritValue:'sample data', criteriaSrchOrder:1234, medDefOrder:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayValue:'sample data'};
      service.updateMedDefnAltSearch(medDefnAltSearch, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnaltsearches/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMedDefnAltSearch', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMedDefnAltSearch(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnaltsearches/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});