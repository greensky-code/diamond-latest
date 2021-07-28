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

import { PmbTempCustomerWorkService } from './pmb-temp-customer-work.service';
import { PmbTempCustomerWork } from '../api-models/pmb-temp-customer-work.model'
import { PmbTempCustomerWorks } from "../api-models/testing/fake-pmb-temp-customer-work.model"

describe('PmbTempCustomerWorkService', () => {
  let injector: TestBed;
  let service: PmbTempCustomerWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbTempCustomerWorkService]
    });
    injector = getTestBed();
    service = injector.get(PmbTempCustomerWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbTempCustomerWorks', () => {
    it('should return an Promise<PmbTempCustomerWork[]>', () => {
      const pmbTempCustomerWork = [
       {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', useEftFlg:'sample data', paymentDueDate:'2018-01-01', noOfChildDep:1234, noOfAdultDep:1234, latestBillingDatetime:'2018-01-01'},
       {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', useEftFlg:'sample data', paymentDueDate:'2018-01-01', noOfChildDep:1234, noOfAdultDep:1234, latestBillingDatetime:'2018-01-01'},
       {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', useEftFlg:'sample data', paymentDueDate:'2018-01-01', noOfChildDep:1234, noOfAdultDep:1234, latestBillingDatetime:'2018-01-01'}

      ];
      service.getPmbTempCustomerWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbtempcustomerworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbTempCustomerWork);
    });
  });


  describe('#createPmbTempCustomerWork', () => {
    var id = 1;
    it('should return an Promise<PmbTempCustomerWork>', () => {
      const pmbTempCustomerWork: PmbTempCustomerWork = {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', useEftFlg:'sample data', paymentDueDate:'2018-01-01', noOfChildDep:1234, noOfAdultDep:1234, latestBillingDatetime:'2018-01-01'};
      service.createPmbTempCustomerWork(pmbTempCustomerWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbtempcustomerworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbTempCustomerWork', () => {
    var id = 1;
    it('should return an Promise<PmbTempCustomerWork>', () => {
      const pmbTempCustomerWork: PmbTempCustomerWork = {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', useEftFlg:'sample data', paymentDueDate:'2018-01-01', noOfChildDep:1234, noOfAdultDep:1234, latestBillingDatetime:'2018-01-01'};
      service.updatePmbTempCustomerWork(pmbTempCustomerWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbtempcustomerworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbTempCustomerWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbTempCustomerWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbtempcustomerworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});