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

import { PmbArCustBillHistoryService } from './pmb-ar-cust-bill-history.service';
import { PmbArCustBillHistory } from '../api-models/pmb-ar-cust-bill-history.model'
import { PmbArCustBillHistorys } from "../api-models/testing/fake-pmb-ar-cust-bill-history.model"

describe('PmbArCustBillHistoryService', () => {
  let injector: TestBed;
  let service: PmbArCustBillHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbArCustBillHistoryService]
    });
    injector = getTestBed();
    service = injector.get(PmbArCustBillHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbArCustBillHistorys', () => {
    it('should return an Promise<PmbArCustBillHistory[]>', () => {
      const pmbArCustBillHistory = [
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, billJobType:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', customerCountry:'sample data', balanceForward:1234, totalPaymentAmt:1234, totalAdjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, paymentDueDate:'2018-01-01', annualPremiumIncome:1234, billedStartDate:'2018-01-01', invoicePrintFormat:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqGroupId:1234},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, billJobType:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', customerCountry:'sample data', balanceForward:1234, totalPaymentAmt:1234, totalAdjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, paymentDueDate:'2018-01-01', annualPremiumIncome:1234, billedStartDate:'2018-01-01', invoicePrintFormat:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqGroupId:1234},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, billJobType:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', customerCountry:'sample data', balanceForward:1234, totalPaymentAmt:1234, totalAdjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, paymentDueDate:'2018-01-01', annualPremiumIncome:1234, billedStartDate:'2018-01-01', invoicePrintFormat:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqGroupId:1234}

      ];
      service.getPmbArCustBillHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcustbillhistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbArCustBillHistory);
    });
  });


  describe('#createPmbArCustBillHistory', () => {
    var id = 1;
    it('should return an Promise<PmbArCustBillHistory>', () => {
      const pmbArCustBillHistory: PmbArCustBillHistory = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, billJobType:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', customerCountry:'sample data', balanceForward:1234, totalPaymentAmt:1234, totalAdjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, paymentDueDate:'2018-01-01', annualPremiumIncome:1234, billedStartDate:'2018-01-01', invoicePrintFormat:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqGroupId:1234};
      service.createPmbArCustBillHistory(pmbArCustBillHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcustbillhistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbArCustBillHistory', () => {
    var id = 1;
    it('should return an Promise<PmbArCustBillHistory>', () => {
      const pmbArCustBillHistory: PmbArCustBillHistory = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, invoiceDate:'2018-01-01', billingDatetime:'2018-01-01', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', seqGpbilId:1234, billJobType:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', customerCountry:'sample data', balanceForward:1234, totalPaymentAmt:1234, totalAdjustmentAmt:1234, newChargeAmt:1234, newBalance:1234, paymentDueDate:'2018-01-01', annualPremiumIncome:1234, billedStartDate:'2018-01-01', invoicePrintFormat:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqGroupId:1234};
      service.updatePmbArCustBillHistory(pmbArCustBillHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcustbillhistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbArCustBillHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbArCustBillHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcustbillhistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});