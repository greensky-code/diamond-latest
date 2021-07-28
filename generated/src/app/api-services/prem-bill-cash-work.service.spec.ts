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

import { PremBillCashWorkService } from './prem-bill-cash-work.service';
import { PremBillCashWork } from '../api-models/prem-bill-cash-work.model'
import { PremBillCashWorks } from "../api-models/testing/fake-prem-bill-cash-work.model"

describe('PremBillCashWorkService', () => {
  let injector: TestBed;
  let service: PremBillCashWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremBillCashWorkService]
    });
    injector = getTestBed();
    service = injector.get(PremBillCashWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremBillCashWorks', () => {
    it('should return an Promise<PremBillCashWork[]>', () => {
      const premBillCashWork = [
       {seqGpbilId:1234, seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', checkAmt:1234},
       {seqGpbilId:1234, seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', checkAmt:1234},
       {seqGpbilId:1234, seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', checkAmt:1234}

      ];
      service.getPremBillCashWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/prembillcashworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premBillCashWork);
    });
  });


  describe('#createPremBillCashWork', () => {
    var id = 1;
    it('should return an Promise<PremBillCashWork>', () => {
      const premBillCashWork: PremBillCashWork = {seqGpbilId:1234, seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', checkAmt:1234};
      service.createPremBillCashWork(premBillCashWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillcashworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremBillCashWork', () => {
    var id = 1;
    it('should return an Promise<PremBillCashWork>', () => {
      const premBillCashWork: PremBillCashWork = {seqGpbilId:1234, seqCashReceipt:1234, customerType:'sample data', customerId:'sample data', checkAmt:1234};
      service.updatePremBillCashWork(premBillCashWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillcashworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremBillCashWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremBillCashWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillcashworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});