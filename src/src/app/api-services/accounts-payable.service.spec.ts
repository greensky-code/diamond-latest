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

import { AccountsPayableService } from './accounts-payable.service';
import { AccountsPayable } from '../api-models/accounts-payable.model'
import { AccountsPayables } from "../api-models/testing/fake-accounts.model"

describe('AccountsPayableService', () => {
  let injector: TestBed;
  let service: AccountsPayableService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountsPayableService]
    });
    injector = getTestBed();
    service = injector.get(AccountsPayableService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAccountsPayables', () => {
    it('should return an Promise<AccountsPayable[]>', () => {
      const accountsPayable = [
       {seqApTrans:1234, fileType:'sample data', discountWithhold:1234, netAmt:1234, apStatus:'sample data', selectForPayment:'sample data', seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', dueDate:'2018-01-01', postedDate:'2018-01-01', vendor1099Flag:'sample data', companyCode:'sample data', bankAccountCode:'sample data', debitGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber1:'sample data', creditGlNumber2:'sample data', apType:'sample data', glMonth:'2018-01-01', printFlag:'sample data', prePriceOnlyFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCltrnId:1234, seqCkprtId:1234, eftTransNumber:'sample data', capFundWithholdAmt:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', interestAmt:1234, discountAmt:1234, intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', paidNetAmt:1234, seqClaimId:1234, penaltyAmt:1234, penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', seqAdminFee:1234, incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', seqVendAdvPayAccDtl:1234, offsetFlag:'sample data', checkEftAmount:1234, offsetSeqVadpyDtl:1234, seqVendCredit:1234, advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'},
       {seqApTrans:1234, fileType:'sample data', discountWithhold:1234, netAmt:1234, apStatus:'sample data', selectForPayment:'sample data', seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', dueDate:'2018-01-01', postedDate:'2018-01-01', vendor1099Flag:'sample data', companyCode:'sample data', bankAccountCode:'sample data', debitGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber1:'sample data', creditGlNumber2:'sample data', apType:'sample data', glMonth:'2018-01-01', printFlag:'sample data', prePriceOnlyFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCltrnId:1234, seqCkprtId:1234, eftTransNumber:'sample data', capFundWithholdAmt:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', interestAmt:1234, discountAmt:1234, intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', paidNetAmt:1234, seqClaimId:1234, penaltyAmt:1234, penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', seqAdminFee:1234, incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', seqVendAdvPayAccDtl:1234, offsetFlag:'sample data', checkEftAmount:1234, offsetSeqVadpyDtl:1234, seqVendCredit:1234, advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'},
       {seqApTrans:1234, fileType:'sample data', discountWithhold:1234, netAmt:1234, apStatus:'sample data', selectForPayment:'sample data', seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', dueDate:'2018-01-01', postedDate:'2018-01-01', vendor1099Flag:'sample data', companyCode:'sample data', bankAccountCode:'sample data', debitGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber1:'sample data', creditGlNumber2:'sample data', apType:'sample data', glMonth:'2018-01-01', printFlag:'sample data', prePriceOnlyFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCltrnId:1234, seqCkprtId:1234, eftTransNumber:'sample data', capFundWithholdAmt:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', interestAmt:1234, discountAmt:1234, intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', paidNetAmt:1234, seqClaimId:1234, penaltyAmt:1234, penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', seqAdminFee:1234, incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', seqVendAdvPayAccDtl:1234, offsetFlag:'sample data', checkEftAmount:1234, offsetSeqVadpyDtl:1234, seqVendCredit:1234, advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'}

      ];
      service.getAccountsPayables().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/accountspayables/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(accountsPayable);
    });
  });


  describe('#createAccountsPayable', () => {
    var id = 1;
    it('should return an Promise<AccountsPayable>', () => {
      const accountsPayable: AccountsPayable = {seqApTrans:1234, fileType:'sample data', discountWithhold:1234, netAmt:1234, apStatus:'sample data', selectForPayment:'sample data', seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', dueDate:'2018-01-01', postedDate:'2018-01-01', vendor1099Flag:'sample data', companyCode:'sample data', bankAccountCode:'sample data', debitGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber1:'sample data', creditGlNumber2:'sample data', apType:'sample data', glMonth:'2018-01-01', printFlag:'sample data', prePriceOnlyFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCltrnId:1234, seqCkprtId:1234, eftTransNumber:'sample data', capFundWithholdAmt:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', interestAmt:1234, discountAmt:1234, intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', paidNetAmt:1234, seqClaimId:1234, penaltyAmt:1234, penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', seqAdminFee:1234, incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', seqVendAdvPayAccDtl:1234, offsetFlag:'sample data', checkEftAmount:1234, offsetSeqVadpyDtl:1234, seqVendCredit:1234, advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'};
      service.createAccountsPayable(accountsPayable).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/accountspayables`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAccountsPayable', () => {
    var id = 1;
    it('should return an Promise<AccountsPayable>', () => {
      const accountsPayable: AccountsPayable = {seqApTrans:1234, fileType:'sample data', discountWithhold:1234, netAmt:1234, apStatus:'sample data', selectForPayment:'sample data', seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', dueDate:'2018-01-01', postedDate:'2018-01-01', vendor1099Flag:'sample data', companyCode:'sample data', bankAccountCode:'sample data', debitGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber1:'sample data', creditGlNumber2:'sample data', apType:'sample data', glMonth:'2018-01-01', printFlag:'sample data', prePriceOnlyFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCltrnId:1234, seqCkprtId:1234, eftTransNumber:'sample data', capFundWithholdAmt:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', interestAmt:1234, discountAmt:1234, intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', paidNetAmt:1234, seqClaimId:1234, penaltyAmt:1234, penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', seqAdminFee:1234, incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', seqVendAdvPayAccDtl:1234, offsetFlag:'sample data', checkEftAmount:1234, offsetSeqVadpyDtl:1234, seqVendCredit:1234, advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'};
      service.updateAccountsPayable(accountsPayable, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/accountspayables/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAccountsPayable', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAccountsPayable(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/accountspayables/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});