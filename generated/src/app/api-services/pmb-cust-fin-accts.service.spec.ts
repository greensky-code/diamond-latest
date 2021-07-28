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

import { PmbCustFinAcctsService } from './pmb-cust-fin-accts.service';
import { PmbCustFinAccts } from '../api-models/pmb-cust-fin-accts.model'
import { PmbCustFinAcctss } from "../api-models/testing/fake-pmb-cust-fin-accts.model"

describe('PmbCustFinAcctsService', () => {
  let injector: TestBed;
  let service: PmbCustFinAcctsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbCustFinAcctsService]
    });
    injector = getTestBed();
    service = injector.get(PmbCustFinAcctsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbCustFinAcctss', () => {
    it('should return an Promise<PmbCustFinAccts[]>', () => {
      const pmbCustFinAccts = [
       {customerType:'sample data', customerId:'sample data', acctNo:'sample data', effectiveFromDate:'2018-01-01', acctUse:'sample data', effectiveToDate:'2018-01-01', acctType:'sample data', routingNo:1234, acctStatus:'sample data', ccExpireDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {customerType:'sample data', customerId:'sample data', acctNo:'sample data', effectiveFromDate:'2018-01-01', acctUse:'sample data', effectiveToDate:'2018-01-01', acctType:'sample data', routingNo:1234, acctStatus:'sample data', ccExpireDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {customerType:'sample data', customerId:'sample data', acctNo:'sample data', effectiveFromDate:'2018-01-01', acctUse:'sample data', effectiveToDate:'2018-01-01', acctType:'sample data', routingNo:1234, acctStatus:'sample data', ccExpireDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPmbCustFinAcctss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcustfinacctss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbCustFinAccts);
    });
  });


  describe('#createPmbCustFinAccts', () => {
    var id = 1;
    it('should return an Promise<PmbCustFinAccts>', () => {
      const pmbCustFinAccts: PmbCustFinAccts = {customerType:'sample data', customerId:'sample data', acctNo:'sample data', effectiveFromDate:'2018-01-01', acctUse:'sample data', effectiveToDate:'2018-01-01', acctType:'sample data', routingNo:1234, acctStatus:'sample data', ccExpireDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPmbCustFinAccts(pmbCustFinAccts).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcustfinacctss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbCustFinAccts', () => {
    var id = 1;
    it('should return an Promise<PmbCustFinAccts>', () => {
      const pmbCustFinAccts: PmbCustFinAccts = {customerType:'sample data', customerId:'sample data', acctNo:'sample data', effectiveFromDate:'2018-01-01', acctUse:'sample data', effectiveToDate:'2018-01-01', acctType:'sample data', routingNo:1234, acctStatus:'sample data', ccExpireDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePmbCustFinAccts(pmbCustFinAccts, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcustfinacctss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbCustFinAccts', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbCustFinAccts(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcustfinacctss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});