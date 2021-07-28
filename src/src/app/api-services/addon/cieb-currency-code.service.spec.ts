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

import { CiebCurrencyCodeService } from './cieb-currency-code.service';
import { CiebCurrencyCode } from '../api-models/cieb-currency-code.model'
import { CiebCurrencyCodes } from "../api-models/testing/fake-cieb-currency-code.model"

describe('CiebCurrencyCodeService', () => {
  let injector: TestBed;
  let service: CiebCurrencyCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebCurrencyCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebCurrencyCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebCurrencyCodes', () => {
    it('should return an Promise<CiebCurrencyCode[]>', () => {
      const ciebCurrencyCode = [
       {currencyCode:'sample data', currencyCodeDesc:'sample data', euroInd:'sample data', wholeCurrencyInd:'sample data', incomingOnlyInd:'sample data', activeInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', defaultTransPaymentCode:'sample data', djCountryDesc:'sample data'},
       {currencyCode:'sample data', currencyCodeDesc:'sample data', euroInd:'sample data', wholeCurrencyInd:'sample data', incomingOnlyInd:'sample data', activeInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', defaultTransPaymentCode:'sample data', djCountryDesc:'sample data'},
       {currencyCode:'sample data', currencyCodeDesc:'sample data', euroInd:'sample data', wholeCurrencyInd:'sample data', incomingOnlyInd:'sample data', activeInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', defaultTransPaymentCode:'sample data', djCountryDesc:'sample data'}

      ];
      service.getCiebCurrencyCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcurrencycodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebCurrencyCode);
    });
  });


  describe('#createCiebCurrencyCode', () => {
    var id = 1;
    it('should return an Promise<CiebCurrencyCode>', () => {
      const ciebCurrencyCode: CiebCurrencyCode = {currencyCode:'sample data', currencyCodeDesc:'sample data', euroInd:'sample data', wholeCurrencyInd:'sample data', incomingOnlyInd:'sample data', activeInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', defaultTransPaymentCode:'sample data', djCountryDesc:'sample data'};
      service.createCiebCurrencyCode(ciebCurrencyCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcurrencycodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebCurrencyCode', () => {
    var id = 1;
    it('should return an Promise<CiebCurrencyCode>', () => {
      const ciebCurrencyCode: CiebCurrencyCode = {currencyCode:'sample data', currencyCodeDesc:'sample data', euroInd:'sample data', wholeCurrencyInd:'sample data', incomingOnlyInd:'sample data', activeInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', defaultTransPaymentCode:'sample data', djCountryDesc:'sample data'};
      service.updateCiebCurrencyCode(ciebCurrencyCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcurrencycodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebCurrencyCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebCurrencyCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcurrencycodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});