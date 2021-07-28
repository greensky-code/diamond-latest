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

import { PremBillSetupService } from './prem-bill-setup.service';
import { PremBillSetup } from '../api-models/prem-bill-setup.model'
import { PremBillSetups } from "../api-models/testing/fake-prem-bill-setup.model"

describe('PremBillSetupService', () => {
  let injector: TestBed;
  let service: PremBillSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremBillSetupService]
    });
    injector = getTestBed();
    service = injector.get(PremBillSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremBillSetups', () => {
    it('should return an Promise<PremBillSetup[]>', () => {
      const premBillSetup = [
       {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billingBatch:'sample data', billingMonth:'2018-01-01', billingType:'sample data', reportFormat:'sample data', postMonth:'2018-01-01', reprintRequest:'sample data', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'},
       {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billingBatch:'sample data', billingMonth:'2018-01-01', billingType:'sample data', reportFormat:'sample data', postMonth:'2018-01-01', reprintRequest:'sample data', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'},
       {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billingBatch:'sample data', billingMonth:'2018-01-01', billingType:'sample data', reportFormat:'sample data', postMonth:'2018-01-01', reprintRequest:'sample data', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'}

      ];
      service.getPremBillSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/prembillsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premBillSetup);
    });
  });


  describe('#createPremBillSetup', () => {
    var id = 1;
    it('should return an Promise<PremBillSetup>', () => {
      const premBillSetup: PremBillSetup = {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billingBatch:'sample data', billingMonth:'2018-01-01', billingType:'sample data', reportFormat:'sample data', postMonth:'2018-01-01', reprintRequest:'sample data', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'};
      service.createPremBillSetup(premBillSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremBillSetup', () => {
    var id = 1;
    it('should return an Promise<PremBillSetup>', () => {
      const premBillSetup: PremBillSetup = {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billingBatch:'sample data', billingMonth:'2018-01-01', billingType:'sample data', reportFormat:'sample data', postMonth:'2018-01-01', reprintRequest:'sample data', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'};
      service.updatePremBillSetup(premBillSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremBillSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremBillSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});