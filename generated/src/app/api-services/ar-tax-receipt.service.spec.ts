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

import { ArTaxReceiptService } from './ar-tax-receipt.service';
import { ArTaxReceipt } from '../api-models/ar-tax-receipt.model'
import { ArTaxReceipts } from "../api-models/testing/fake-ar-tax-receipt.model"

describe('ArTaxReceiptService', () => {
  let injector: TestBed;
  let service: ArTaxReceiptService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArTaxReceiptService]
    });
    injector = getTestBed();
    service = injector.get(ArTaxReceiptService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getArTaxReceipts', () => {
    it('should return an Promise<ArTaxReceipt[]>', () => {
      const arTaxReceipt = [
       {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', seqCashBatchId:1234, glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'},
       {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', seqCashBatchId:1234, glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'},
       {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', seqCashBatchId:1234, glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'}

      ];
      service.getArTaxReceipts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/artaxreceipts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(arTaxReceipt);
    });
  });


  describe('#createArTaxReceipt', () => {
    var id = 1;
    it('should return an Promise<ArTaxReceipt>', () => {
      const arTaxReceipt: ArTaxReceipt = {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', seqCashBatchId:1234, glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'};
      service.createArTaxReceipt(arTaxReceipt).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/artaxreceipts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateArTaxReceipt', () => {
    var id = 1;
    it('should return an Promise<ArTaxReceipt>', () => {
      const arTaxReceipt: ArTaxReceipt = {seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', transReceiptDate:'2018-01-01', transactionType:'sample data', companyCode:'sample data', seqCashBatchId:1234, glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'};
      service.updateArTaxReceipt(arTaxReceipt, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/artaxreceipts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteArTaxReceipt', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteArTaxReceipt(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/artaxreceipts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});