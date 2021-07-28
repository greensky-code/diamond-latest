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

import { PmbArCustTaxBillHistoryService } from './pmb-ar-cust-tax-bill-history.service';
import { PmbArCustTaxBillHistory } from '../api-models/pmb-ar-cust-tax-bill-history.model'
import { PmbArCustTaxBillHistorys } from "../api-models/testing/fake-pmb-ar-cust-tax-bill-history.model"

describe('PmbArCustTaxBillHistoryService', () => {
  let injector: TestBed;
  let service: PmbArCustTaxBillHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbArCustTaxBillHistoryService]
    });
    injector = getTestBed();
    service = injector.get(PmbArCustTaxBillHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbArCustTaxBillHistorys', () => {
    it('should return an Promise<PmbArCustTaxBillHistory[]>', () => {
      const pmbArCustTaxBillHistory = [
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, seqGroupId:1234, prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, seqGroupId:1234, prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, seqGroupId:1234, prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'}

      ];
      service.getPmbArCustTaxBillHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcusttaxbillhistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbArCustTaxBillHistory);
    });
  });


  describe('#createPmbArCustTaxBillHistory', () => {
    var id = 1;
    it('should return an Promise<PmbArCustTaxBillHistory>', () => {
      const pmbArCustTaxBillHistory: PmbArCustTaxBillHistory = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, seqGroupId:1234, prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'};
      service.createPmbArCustTaxBillHistory(pmbArCustTaxBillHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcusttaxbillhistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbArCustTaxBillHistory', () => {
    var id = 1;
    it('should return an Promise<PmbArCustTaxBillHistory>', () => {
      const pmbArCustTaxBillHistory: PmbArCustTaxBillHistory = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, seqGroupId:1234, prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'};
      service.updatePmbArCustTaxBillHistory(pmbArCustTaxBillHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcusttaxbillhistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbArCustTaxBillHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbArCustTaxBillHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcusttaxbillhistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});