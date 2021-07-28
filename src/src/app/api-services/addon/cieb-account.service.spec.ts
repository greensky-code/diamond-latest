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

import { CiebAccountService } from './cieb-account.service';
import { CiebAccount } from '../api-models/cieb-account.model'
import { CiebAccounts } from "../api-models/testing/fake-cieb-account.model"

describe('CiebAccountService', () => {
  let injector: TestBed;
  let service: CiebAccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebAccountService]
    });
    injector = getTestBed();
    service = injector.get(CiebAccountService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebAccounts', () => {
    it('should return an Promise<CiebAccount[]>', () => {
      const ciebAccount = [
       {seqAccountId:1234, bankAcctCode:'sample data', eftStatusCode:'sample data', bankTermReasonCode:'sample data', seqBankId:1234, seqEntityId:1234, accountNum:'sample data', careOf:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', prenoteDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paymentAdviceCode:'sample data', docRefNumber:'sample data'},
       {seqAccountId:1234, bankAcctCode:'sample data', eftStatusCode:'sample data', bankTermReasonCode:'sample data', seqBankId:1234, seqEntityId:1234, accountNum:'sample data', careOf:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', prenoteDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paymentAdviceCode:'sample data', docRefNumber:'sample data'},
       {seqAccountId:1234, bankAcctCode:'sample data', eftStatusCode:'sample data', bankTermReasonCode:'sample data', seqBankId:1234, seqEntityId:1234, accountNum:'sample data', careOf:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', prenoteDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paymentAdviceCode:'sample data', docRefNumber:'sample data'}

      ];
      service.getCiebAccounts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaccounts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebAccount);
    });
  });


  describe('#createCiebAccount', () => {
    var id = 1;
    it('should return an Promise<CiebAccount>', () => {
      const ciebAccount: CiebAccount = {seqAccountId:1234, bankAcctCode:'sample data', eftStatusCode:'sample data', bankTermReasonCode:'sample data', seqBankId:1234, seqEntityId:1234, accountNum:'sample data', careOf:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', prenoteDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paymentAdviceCode:'sample data', docRefNumber:'sample data'};
      service.createCiebAccount(ciebAccount).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaccounts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebAccount', () => {
    var id = 1;
    it('should return an Promise<CiebAccount>', () => {
      const ciebAccount: CiebAccount = {seqAccountId:1234, bankAcctCode:'sample data', eftStatusCode:'sample data', bankTermReasonCode:'sample data', seqBankId:1234, seqEntityId:1234, accountNum:'sample data', careOf:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', prenoteDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paymentAdviceCode:'sample data', docRefNumber:'sample data'};
      service.updateCiebAccount(ciebAccount, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaccounts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebAccount', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebAccount(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaccounts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});