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

import { PmbSubscBillHistService } from './pmb-subsc-bill-hist.service';
import { PmbSubscBillHist } from '../api-models/pmb-subsc-bill-hist.model'
import { PmbSubscBillHists } from "../api-models/testing/fake-pmb-subsc-bill-hist.model"

describe('PmbSubscBillHistService', () => {
  let injector: TestBed;
  let service: PmbSubscBillHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSubscBillHistService]
    });
    injector = getTestBed();
    service = injector.get(PmbSubscBillHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSubscBillHists', () => {
    it('should return an Promise<PmbSubscBillHist[]>', () => {
      const pmbSubscBillHist = [
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', recordType:'sample data', planRiderCode:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', premiumStep:'sample data', familySize:1234, spouseFlag:'sample data'},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', recordType:'sample data', planRiderCode:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', premiumStep:'sample data', familySize:1234, spouseFlag:'sample data'},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', recordType:'sample data', planRiderCode:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', premiumStep:'sample data', familySize:1234, spouseFlag:'sample data'}

      ];
      service.getPmbSubscBillHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscbillhists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSubscBillHist);
    });
  });


  describe('#createPmbSubscBillHist', () => {
    var id = 1;
    it('should return an Promise<PmbSubscBillHist>', () => {
      const pmbSubscBillHist: PmbSubscBillHist = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', recordType:'sample data', planRiderCode:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', premiumStep:'sample data', familySize:1234, spouseFlag:'sample data'};
      service.createPmbSubscBillHist(pmbSubscBillHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscbillhists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSubscBillHist', () => {
    var id = 1;
    it('should return an Promise<PmbSubscBillHist>', () => {
      const pmbSubscBillHist: PmbSubscBillHist = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', recordType:'sample data', planRiderCode:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', premiumStep:'sample data', familySize:1234, spouseFlag:'sample data'};
      service.updatePmbSubscBillHist(pmbSubscBillHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscbillhists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSubscBillHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSubscBillHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscbillhists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});