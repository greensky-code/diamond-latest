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

import { BankAccountService } from './bank-account.service';
import { BankAccount } from '../api-models/bank-account.model'
import { BankAccounts } from "../api-models/testing/fake-bank-account.model"

describe('BankAccountService', () => {
  let injector: TestBed;
  let service: BankAccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BankAccountService]
    });
    injector = getTestBed();
    service = injector.get(BankAccountService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBankAccounts', () => {
    it('should return an Promise<BankAccount[]>', () => {
      const bankAccount = [
       {userDefined2:'sample data', userDefined1:'sample data', commissionRaTemplate:'sample data', commissionCheckTemplate:'sample data', accountType:'sample data', abaRoutingNum:'sample data', bankAccountDesc:'sample data', bankAccountNum:'sample data', mediEopTemplate:'sample data', mediEobTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', tradeRaTemplate:'sample data', tradeCheckTemplt:'sample data', tradeFormatCode:'sample data', capRaTemplate:'sample data', capCheckTemplate:'sample data', capFormatCode:'sample data', mediRaTemplate:'sample data', mediCheckTemplate:'sample data', mediFormatCode:'sample data', glCashAccount:'sample data', description:'sample data', bankAccountCode:'sample data'},
       {userDefined2:'sample data', userDefined1:'sample data', commissionRaTemplate:'sample data', commissionCheckTemplate:'sample data', accountType:'sample data', abaRoutingNum:'sample data', bankAccountDesc:'sample data', bankAccountNum:'sample data', mediEopTemplate:'sample data', mediEobTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', tradeRaTemplate:'sample data', tradeCheckTemplt:'sample data', tradeFormatCode:'sample data', capRaTemplate:'sample data', capCheckTemplate:'sample data', capFormatCode:'sample data', mediRaTemplate:'sample data', mediCheckTemplate:'sample data', mediFormatCode:'sample data', glCashAccount:'sample data', description:'sample data', bankAccountCode:'sample data'},
       {userDefined2:'sample data', userDefined1:'sample data', commissionRaTemplate:'sample data', commissionCheckTemplate:'sample data', accountType:'sample data', abaRoutingNum:'sample data', bankAccountDesc:'sample data', bankAccountNum:'sample data', mediEopTemplate:'sample data', mediEobTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', tradeRaTemplate:'sample data', tradeCheckTemplt:'sample data', tradeFormatCode:'sample data', capRaTemplate:'sample data', capCheckTemplate:'sample data', capFormatCode:'sample data', mediRaTemplate:'sample data', mediCheckTemplate:'sample data', mediFormatCode:'sample data', glCashAccount:'sample data', description:'sample data', bankAccountCode:'sample data'}

      ];
      service.getBankAccounts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/bankaccounts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(bankAccount);
    });
  });


  describe('#createBankAccount', () => {
    var id = 1;
    it('should return an Promise<BankAccount>', () => {
      const bankAccount: BankAccount = {userDefined2:'sample data', userDefined1:'sample data', commissionRaTemplate:'sample data', commissionCheckTemplate:'sample data', accountType:'sample data', abaRoutingNum:'sample data', bankAccountDesc:'sample data', bankAccountNum:'sample data', mediEopTemplate:'sample data', mediEobTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', tradeRaTemplate:'sample data', tradeCheckTemplt:'sample data', tradeFormatCode:'sample data', capRaTemplate:'sample data', capCheckTemplate:'sample data', capFormatCode:'sample data', mediRaTemplate:'sample data', mediCheckTemplate:'sample data', mediFormatCode:'sample data', glCashAccount:'sample data', description:'sample data', bankAccountCode:'sample data'};
      service.createBankAccount(bankAccount).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/bankaccounts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBankAccount', () => {
    var id = 1;
    it('should return an Promise<BankAccount>', () => {
      const bankAccount: BankAccount = {userDefined2:'sample data', userDefined1:'sample data', commissionRaTemplate:'sample data', commissionCheckTemplate:'sample data', accountType:'sample data', abaRoutingNum:'sample data', bankAccountDesc:'sample data', bankAccountNum:'sample data', mediEopTemplate:'sample data', mediEobTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', tradeRaTemplate:'sample data', tradeCheckTemplt:'sample data', tradeFormatCode:'sample data', capRaTemplate:'sample data', capCheckTemplate:'sample data', capFormatCode:'sample data', mediRaTemplate:'sample data', mediCheckTemplate:'sample data', mediFormatCode:'sample data', glCashAccount:'sample data', description:'sample data', bankAccountCode:'sample data'};
      service.updateBankAccount(bankAccount, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/bankaccounts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBankAccount', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBankAccount(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/bankaccounts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});