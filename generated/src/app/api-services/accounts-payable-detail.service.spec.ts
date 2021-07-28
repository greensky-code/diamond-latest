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

import { AccountsPayableDetailService } from './accounts-payable-detail.service';
import { AccountsPayableDetail } from '../api-models/accounts-payable-detail.model'
import { AccountsPayableDetails } from "../api-models/testing/fake-accounts-payable-detail.model"

describe('AccountsPayableDetailService', () => {
  let injector: TestBed;
  let service: AccountsPayableDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountsPayableDetailService]
    });
    injector = getTestBed();
    service = injector.get(AccountsPayableDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAccountsPayableDetails', () => {
    it('should return an Promise<AccountsPayableDetail[]>', () => {
      const accountsPayableDetail = [
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', offsetSeqVadpyDtl:1234, securityCode:'sample data', checkEftAmount:1234, offsetFlag:'sample data', eftTransNumber:'sample data', checkNumber:'sample data', seqApTrans:1234},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', offsetSeqVadpyDtl:1234, securityCode:'sample data', checkEftAmount:1234, offsetFlag:'sample data', eftTransNumber:'sample data', checkNumber:'sample data', seqApTrans:1234},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', offsetSeqVadpyDtl:1234, securityCode:'sample data', checkEftAmount:1234, offsetFlag:'sample data', eftTransNumber:'sample data', checkNumber:'sample data', seqApTrans:1234}

      ];
      service.getAccountsPayableDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/accountspayabledetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(accountsPayableDetail);
    });
  });


  describe('#createAccountsPayableDetail', () => {
    var id = 1;
    it('should return an Promise<AccountsPayableDetail>', () => {
      const accountsPayableDetail: AccountsPayableDetail = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', offsetSeqVadpyDtl:1234, securityCode:'sample data', checkEftAmount:1234, offsetFlag:'sample data', eftTransNumber:'sample data', checkNumber:'sample data', seqApTrans:1234};
      service.createAccountsPayableDetail(accountsPayableDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/accountspayabledetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAccountsPayableDetail', () => {
    var id = 1;
    it('should return an Promise<AccountsPayableDetail>', () => {
      const accountsPayableDetail: AccountsPayableDetail = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', offsetSeqVadpyDtl:1234, securityCode:'sample data', checkEftAmount:1234, offsetFlag:'sample data', eftTransNumber:'sample data', checkNumber:'sample data', seqApTrans:1234};
      service.updateAccountsPayableDetail(accountsPayableDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/accountspayabledetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAccountsPayableDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAccountsPayableDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/accountspayabledetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});