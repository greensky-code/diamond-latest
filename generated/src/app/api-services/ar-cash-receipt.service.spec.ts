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

import { ArCashReceiptService } from './ar-cash-receipt.service';
import { ArCashReceipt } from '../api-models/ar-cash-receipt.model'
import { ArCashReceipts } from "../api-models/testing/fake-ar-cash-receipt.model"

describe('ArCashReceiptService', () => {
  let injector: TestBed;
  let service: ArCashReceiptService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArCashReceiptService]
    });
    injector = getTestBed();
    service = injector.get(ArCashReceiptService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getArCashReceipts', () => {
    it('should return an Promise<ArCashReceipt[]>', () => {
      const arCashReceipt = [
       {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transNo:'sample data', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, subscriberId:'sample data', description:'sample data', seqCashBatchId:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transNo:'sample data', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, subscriberId:'sample data', description:'sample data', seqCashBatchId:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transNo:'sample data', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, subscriberId:'sample data', description:'sample data', seqCashBatchId:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getArCashReceipts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/arcashreceipts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(arCashReceipt);
    });
  });


  describe('#createArCashReceipt', () => {
    var id = 1;
    it('should return an Promise<ArCashReceipt>', () => {
      const arCashReceipt: ArCashReceipt = {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transNo:'sample data', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, subscriberId:'sample data', description:'sample data', seqCashBatchId:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createArCashReceipt(arCashReceipt).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcashreceipts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateArCashReceipt', () => {
    var id = 1;
    it('should return an Promise<ArCashReceipt>', () => {
      const arCashReceipt: ArCashReceipt = {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transNo:'sample data', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, subscriberId:'sample data', description:'sample data', seqCashBatchId:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateArCashReceipt(arCashReceipt, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcashreceipts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteArCashReceipt', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteArCashReceipt(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcashreceipts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});