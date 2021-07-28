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

import { PremBillAdjWorkService } from './prem-bill-adj-work.service';
import { PremBillAdjWork } from '../api-models/prem-bill-adj-work.model'
import { PremBillAdjWorks } from "../api-models/testing/fake-prem-bill-adj-work.model"

describe('PremBillAdjWorkService', () => {
  let injector: TestBed;
  let service: PremBillAdjWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremBillAdjWorkService]
    });
    injector = getTestBed();
    service = injector.get(PremBillAdjWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremBillAdjWorks', () => {
    it('should return an Promise<PremBillAdjWork[]>', () => {
      const premBillAdjWork = [
       {seqGpbilId:1234, seqAradjId:1234, customerType:'sample data', customerId:'sample data', transactionAmt:1234, transactionDesc:'sample data'},
       {seqGpbilId:1234, seqAradjId:1234, customerType:'sample data', customerId:'sample data', transactionAmt:1234, transactionDesc:'sample data'},
       {seqGpbilId:1234, seqAradjId:1234, customerType:'sample data', customerId:'sample data', transactionAmt:1234, transactionDesc:'sample data'}

      ];
      service.getPremBillAdjWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/prembilladjworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premBillAdjWork);
    });
  });


  describe('#createPremBillAdjWork', () => {
    var id = 1;
    it('should return an Promise<PremBillAdjWork>', () => {
      const premBillAdjWork: PremBillAdjWork = {seqGpbilId:1234, seqAradjId:1234, customerType:'sample data', customerId:'sample data', transactionAmt:1234, transactionDesc:'sample data'};
      service.createPremBillAdjWork(premBillAdjWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembilladjworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremBillAdjWork', () => {
    var id = 1;
    it('should return an Promise<PremBillAdjWork>', () => {
      const premBillAdjWork: PremBillAdjWork = {seqGpbilId:1234, seqAradjId:1234, customerType:'sample data', customerId:'sample data', transactionAmt:1234, transactionDesc:'sample data'};
      service.updatePremBillAdjWork(premBillAdjWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembilladjworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremBillAdjWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremBillAdjWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembilladjworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});