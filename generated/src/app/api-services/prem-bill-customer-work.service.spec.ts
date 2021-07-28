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

import { PremBillCustomerWorkService } from './prem-bill-customer-work.service';
import { PremBillCustomerWork } from '../api-models/prem-bill-customer-work.model'
import { PremBillCustomerWorks } from "../api-models/testing/fake-prem-bill-customer-work.model"

describe('PremBillCustomerWorkService', () => {
  let injector: TestBed;
  let service: PremBillCustomerWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremBillCustomerWorkService]
    });
    injector = getTestBed();
    service = injector.get(PremBillCustomerWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremBillCustomerWorks', () => {
    it('should return an Promise<PremBillCustomerWork[]>', () => {
      const premBillCustomerWork = [
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', invoiceNumber:1234, billingMonth:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01'},
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', invoiceNumber:1234, billingMonth:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01'},
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', invoiceNumber:1234, billingMonth:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01'}

      ];
      service.getPremBillCustomerWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/prembillcustomerworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premBillCustomerWork);
    });
  });


  describe('#createPremBillCustomerWork', () => {
    var id = 1;
    it('should return an Promise<PremBillCustomerWork>', () => {
      const premBillCustomerWork: PremBillCustomerWork = {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', invoiceNumber:1234, billingMonth:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01'};
      service.createPremBillCustomerWork(premBillCustomerWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillcustomerworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremBillCustomerWork', () => {
    var id = 1;
    it('should return an Promise<PremBillCustomerWork>', () => {
      const premBillCustomerWork: PremBillCustomerWork = {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', invoiceNumber:1234, billingMonth:'2018-01-01', balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01'};
      service.updatePremBillCustomerWork(premBillCustomerWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillcustomerworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremBillCustomerWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremBillCustomerWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillcustomerworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});