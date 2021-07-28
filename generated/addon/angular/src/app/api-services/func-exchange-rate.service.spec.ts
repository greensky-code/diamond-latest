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

import { FuncExchangeRateService } from './func-exchange-rate.service';
import { FuncExchangeRate } from '../api-models/func-exchange-rate.model'
import { FuncExchangeRates } from "../api-models/testing/fake-func-exchange-rate.model"

describe('FuncExchangeRateService', () => {
  let injector: TestBed;
  let service: FuncExchangeRateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncExchangeRateService]
    });
    injector = getTestBed();
    service = injector.get(FuncExchangeRateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncExchangeRates', () => {
    it('should return an Promise<FuncExchangeRate[]>', () => {
      const funcExchangeRate = [
       {currencyCode:'sample data', seqGroupId:1234, dateValid:'sample data', conversionRate:1234, insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data', pDate:'sample data', pCurrencyCode:'sample data'},
       {currencyCode:'sample data', seqGroupId:1234, dateValid:'sample data', conversionRate:1234, insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data', pDate:'sample data', pCurrencyCode:'sample data'},
       {currencyCode:'sample data', seqGroupId:1234, dateValid:'sample data', conversionRate:1234, insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data', pDate:'sample data', pCurrencyCode:'sample data'}

      ];
      service.getFuncExchangeRates().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcexchangerates/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcExchangeRate);
    });
  });


  describe('#createFuncExchangeRate', () => {
    var id = 1;
    it('should return an Promise<FuncExchangeRate>', () => {
      const funcExchangeRate: FuncExchangeRate = {currencyCode:'sample data', seqGroupId:1234, dateValid:'sample data', conversionRate:1234, insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data', pDate:'sample data', pCurrencyCode:'sample data'};
      service.createFuncExchangeRate(funcExchangeRate).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcexchangerates`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncExchangeRate', () => {
    var id = 1;
    it('should return an Promise<FuncExchangeRate>', () => {
      const funcExchangeRate: FuncExchangeRate = {currencyCode:'sample data', seqGroupId:1234, dateValid:'sample data', conversionRate:1234, insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data', pDate:'sample data', pCurrencyCode:'sample data'};
      service.updateFuncExchangeRate(funcExchangeRate, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcexchangerates/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncExchangeRate', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncExchangeRate(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcexchangerates/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});