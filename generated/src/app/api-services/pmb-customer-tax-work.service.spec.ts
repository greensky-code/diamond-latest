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

import { PmbCustomerTaxWorkService } from './pmb-customer-tax-work.service';
import { PmbCustomerTaxWork } from '../api-models/pmb-customer-tax-work.model'
import { PmbCustomerTaxWorks } from "../api-models/testing/fake-pmb-customer-tax-work.model"

describe('PmbCustomerTaxWorkService', () => {
  let injector: TestBed;
  let service: PmbCustomerTaxWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbCustomerTaxWorkService]
    });
    injector = getTestBed();
    service = injector.get(PmbCustomerTaxWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbCustomerTaxWorks', () => {
    it('should return an Promise<PmbCustomerTaxWork[]>', () => {
      const pmbCustomerTaxWork = [
       {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'},
       {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'},
       {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'}

      ];
      service.getPmbCustomerTaxWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcustomertaxworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbCustomerTaxWork);
    });
  });


  describe('#createPmbCustomerTaxWork', () => {
    var id = 1;
    it('should return an Promise<PmbCustomerTaxWork>', () => {
      const pmbCustomerTaxWork: PmbCustomerTaxWork = {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'};
      service.createPmbCustomerTaxWork(pmbCustomerTaxWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcustomertaxworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbCustomerTaxWork', () => {
    var id = 1;
    it('should return an Promise<PmbCustomerTaxWork>', () => {
      const pmbCustomerTaxWork: PmbCustomerTaxWork = {seqGpbilId:1234, invoiceNo:1234, seqGroupId:1234, customerType:'sample data', customerId:'sample data', periodBilledFromDate:'2018-01-01', periodBilledThruDate:'2018-01-01', prmTaxAmt:1234, salesTaxAmt:1234, balForwardSalesTaxAmt:1234, salesTaxPaidAmt:1234, salesTaxAdjAmt:1234, newSalesTaxBalanceAmt:1234, salesTaxPct:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxablePremiumAmt:1234, otherPremiumAmt:1234, taxType:'sample data'};
      service.updatePmbCustomerTaxWork(pmbCustomerTaxWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcustomertaxworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbCustomerTaxWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbCustomerTaxWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcustomertaxworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});