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

import { SpecialContractHeaderService } from './special-contract-header.service';
import { SpecialContractHeader } from '../api-models/special-contract-header.model'
import { SpecialContractHeaders } from "../api-models/testing/fake-special-contract-header.model"

describe('SpecialContractHeaderService', () => {
  let injector: TestBed;
  let service: SpecialContractHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpecialContractHeaderService]
    });
    injector = getTestBed();
    service = injector.get(SpecialContractHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSpecialContractHeaders', () => {
    it('should return an Promise<SpecialContractHeader[]>', () => {
      const specialContractHeader = [
       {seqSpecCont:1234, priceRule:'sample data', seqProvId:1234, lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqSpecCont:1234, priceRule:'sample data', seqProvId:1234, lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqSpecCont:1234, priceRule:'sample data', seqProvId:1234, lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSpecialContractHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/specialcontractheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(specialContractHeader);
    });
  });


  describe('#createSpecialContractHeader', () => {
    var id = 1;
    it('should return an Promise<SpecialContractHeader>', () => {
      const specialContractHeader: SpecialContractHeader = {seqSpecCont:1234, priceRule:'sample data', seqProvId:1234, lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSpecialContractHeader(specialContractHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/specialcontractheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSpecialContractHeader', () => {
    var id = 1;
    it('should return an Promise<SpecialContractHeader>', () => {
      const specialContractHeader: SpecialContractHeader = {seqSpecCont:1234, priceRule:'sample data', seqProvId:1234, lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSpecialContractHeader(specialContractHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/specialcontractheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSpecialContractHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSpecialContractHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/specialcontractheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});