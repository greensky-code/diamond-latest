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

import { CapRateHeaderService } from './cap-rate-header.service';
import { CapRateHeader } from '../api-models/cap-rate-header.model'
import { CapRateHeaders } from "../api-models/testing/fake-cap-rate-header.model"

describe('CapRateHeaderService', () => {
  let injector: TestBed;
  let service: CapRateHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapRateHeaderService]
    });
    injector = getTestBed();
    service = injector.get(CapRateHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapRateHeaders', () => {
    it('should return an Promise<CapRateHeader[]>', () => {
      const capRateHeader = [
       {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCapRateHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/caprateheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capRateHeader);
    });
  });


  describe('#createCapRateHeader', () => {
    var id = 1;
    it('should return an Promise<CapRateHeader>', () => {
      const capRateHeader: CapRateHeader = {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCapRateHeader(capRateHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caprateheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapRateHeader', () => {
    var id = 1;
    it('should return an Promise<CapRateHeader>', () => {
      const capRateHeader: CapRateHeader = {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCapRateHeader(capRateHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caprateheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapRateHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapRateHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caprateheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});