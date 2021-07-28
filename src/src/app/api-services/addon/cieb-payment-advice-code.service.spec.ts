/* Copyright (c) 2021 . All Rights Reserved. */

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

import { CiebPaymentAdviceCodeService } from './cieb-payment-advice-code.service';
import { CiebPaymentAdviceCode } from '../api-models/cieb-payment-advice-code.model'
import { CiebPaymentAdviceCodes } from "../api-models/testing/fake-cieb-payment-advice-code.model"

describe('CiebPaymentAdviceCodeService', () => {
  let injector: TestBed;
  let service: CiebPaymentAdviceCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebPaymentAdviceCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebPaymentAdviceCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebPaymentAdviceCodes', () => {
    it('should return an Promise<CiebPaymentAdviceCode[]>', () => {
      const ciebPaymentAdviceCode = [
       {paymentAdviceCode:'sample data', paymentAdviceDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {paymentAdviceCode:'sample data', paymentAdviceDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {paymentAdviceCode:'sample data', paymentAdviceDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebPaymentAdviceCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebpaymentadvicecodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebPaymentAdviceCode);
    });
  });


  describe('#createCiebPaymentAdviceCode', () => {
    var id = 1;
    it('should return an Promise<CiebPaymentAdviceCode>', () => {
      const ciebPaymentAdviceCode: CiebPaymentAdviceCode = {paymentAdviceCode:'sample data', paymentAdviceDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebPaymentAdviceCode(ciebPaymentAdviceCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebpaymentadvicecodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebPaymentAdviceCode', () => {
    var id = 1;
    it('should return an Promise<CiebPaymentAdviceCode>', () => {
      const ciebPaymentAdviceCode: CiebPaymentAdviceCode = {paymentAdviceCode:'sample data', paymentAdviceDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebPaymentAdviceCode(ciebPaymentAdviceCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebpaymentadvicecodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebPaymentAdviceCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebPaymentAdviceCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebpaymentadvicecodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});