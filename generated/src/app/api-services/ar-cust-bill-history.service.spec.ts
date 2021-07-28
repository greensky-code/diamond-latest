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

import { ArCustBillHistoryService } from './ar-cust-bill-history.service';
import { ArCustBillHistory } from '../api-models/ar-cust-bill-history.model'
import { ArCustBillHistorys } from "../api-models/testing/fake-ar-cust-bill-history.model"

describe('ArCustBillHistoryService', () => {
  let injector: TestBed;
  let service: ArCustBillHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArCustBillHistoryService]
    });
    injector = getTestBed();
    service = injector.get(ArCustBillHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getArCustBillHistorys', () => {
    it('should return an Promise<ArCustBillHistory[]>', () => {
      const arCustBillHistory = [
       {customerType:'sample data', customerId:'sample data', invoiceDate:'2018-01-01', invoiceNumber:1234, balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {customerType:'sample data', customerId:'sample data', invoiceDate:'2018-01-01', invoiceNumber:1234, balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {customerType:'sample data', customerId:'sample data', invoiceDate:'2018-01-01', invoiceNumber:1234, balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getArCustBillHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/arcustbillhistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(arCustBillHistory);
    });
  });


  describe('#createArCustBillHistory', () => {
    var id = 1;
    it('should return an Promise<ArCustBillHistory>', () => {
      const arCustBillHistory: ArCustBillHistory = {customerType:'sample data', customerId:'sample data', invoiceDate:'2018-01-01', invoiceNumber:1234, balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createArCustBillHistory(arCustBillHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcustbillhistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateArCustBillHistory', () => {
    var id = 1;
    it('should return an Promise<ArCustBillHistory>', () => {
      const arCustBillHistory: ArCustBillHistory = {customerType:'sample data', customerId:'sample data', invoiceDate:'2018-01-01', invoiceNumber:1234, balanceForward:1234, paymentAmt:1234, adjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, billingDatetime:'2018-01-01', billedThroughDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateArCustBillHistory(arCustBillHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcustbillhistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteArCustBillHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteArCustBillHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcustbillhistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});