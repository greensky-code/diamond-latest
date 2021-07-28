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

import { CiebBankAcctCodeService } from './cieb-bank-acct-code.service';
import { CiebBankAcctCode } from '../api-models/cieb-bank-acct-code.model'
import { CiebBankAcctCodes } from "../api-models/testing/fake-cieb-bank-acct-code.model"

describe('CiebBankAcctCodeService', () => {
  let injector: TestBed;
  let service: CiebBankAcctCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebBankAcctCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebBankAcctCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebBankAcctCodes', () => {
    it('should return an Promise<CiebBankAcctCode[]>', () => {
      const ciebBankAcctCode = [
       {bankAcctCode:'sample data', bankAcctDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {bankAcctCode:'sample data', bankAcctDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {bankAcctCode:'sample data', bankAcctDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebBankAcctCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbankacctcodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebBankAcctCode);
    });
  });


  describe('#createCiebBankAcctCode', () => {
    var id = 1;
    it('should return an Promise<CiebBankAcctCode>', () => {
      const ciebBankAcctCode: CiebBankAcctCode = {bankAcctCode:'sample data', bankAcctDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebBankAcctCode(ciebBankAcctCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbankacctcodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebBankAcctCode', () => {
    var id = 1;
    it('should return an Promise<CiebBankAcctCode>', () => {
      const ciebBankAcctCode: CiebBankAcctCode = {bankAcctCode:'sample data', bankAcctDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebBankAcctCode(ciebBankAcctCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbankacctcodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebBankAcctCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebBankAcctCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbankacctcodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});