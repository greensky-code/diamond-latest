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
import { AccountsPayables } from "../api-models/testing/fake-accounts-payable.model"

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
       {writeOffAcc:'sample data', admFeePayableAcc:'sample data', admFeeExpenseAcc:'sample data', advPayPayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', seqVendCredit:1234, offsetSeqVadpyDtl:1234, checkEftAmount:1234, offsetFlag:'sample data', seqVendAdvPayAccDtl:1234, incentivePayableAcc:'sample data', incentiveExpenseAcc:'sample data', seqAdminFee:1234, penaltyPayableAcc:'sample data', penaltyExpenseAcc:'sample data', penaltyAmt:1234, seqClaimId:1234, paidNetAmt:1234, dscntCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', intCreditGlNumber:'sample data', intDebitGlNumber:'sample data', discountAmt:1234, interestAmt:1234, capFundSubModelId:'sample data', capFundModelId:'sample data', capFundWithholdAmt:1234, eftTransNumber:'sample data', seqCkprtId:1234, seqCltrnId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', prePriceOnlyFlag:'sample data', printFlag:'sample data', glMonth:'2018-01-01', apType:'sample data', creditGlNumber2:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', debitGlNumber1:'sample data', bankAccountCode:'sample data', companyCode:'sample data', vendor1099Flag:'sample data', postedDate:'2018-01-01', dueDate:'2018-01-01', checkDate:'2018-01-01', checkNumber:'sample data', seqVendAddress:1234, seqVendId:1234, selectForPayment:'sample data', apStatus:'sample data', netAmt:1234, discountWithhold:1234, fileType:'sample data', seqApTrans:1234},
       {writeOffAcc:'sample data', admFeePayableAcc:'sample data', admFeeExpenseAcc:'sample data', advPayPayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', seqVendCredit:1234, offsetSeqVadpyDtl:1234, checkEftAmount:1234, offsetFlag:'sample data', seqVendAdvPayAccDtl:1234, incentivePayableAcc:'sample data', incentiveExpenseAcc:'sample data', seqAdminFee:1234, penaltyPayableAcc:'sample data', penaltyExpenseAcc:'sample data', penaltyAmt:1234, seqClaimId:1234, paidNetAmt:1234, dscntCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', intCreditGlNumber:'sample data', intDebitGlNumber:'sample data', discountAmt:1234, interestAmt:1234, capFundSubModelId:'sample data', capFundModelId:'sample data', capFundWithholdAmt:1234, eftTransNumber:'sample data', seqCkprtId:1234, seqCltrnId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', prePriceOnlyFlag:'sample data', printFlag:'sample data', glMonth:'2018-01-01', apType:'sample data', creditGlNumber2:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', debitGlNumber1:'sample data', bankAccountCode:'sample data', companyCode:'sample data', vendor1099Flag:'sample data', postedDate:'2018-01-01', dueDate:'2018-01-01', checkDate:'2018-01-01', checkNumber:'sample data', seqVendAddress:1234, seqVendId:1234, selectForPayment:'sample data', apStatus:'sample data', netAmt:1234, discountWithhold:1234, fileType:'sample data', seqApTrans:1234},
       {writeOffAcc:'sample data', admFeePayableAcc:'sample data', admFeeExpenseAcc:'sample data', advPayPayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', seqVendCredit:1234, offsetSeqVadpyDtl:1234, checkEftAmount:1234, offsetFlag:'sample data', seqVendAdvPayAccDtl:1234, incentivePayableAcc:'sample data', incentiveExpenseAcc:'sample data', seqAdminFee:1234, penaltyPayableAcc:'sample data', penaltyExpenseAcc:'sample data', penaltyAmt:1234, seqClaimId:1234, paidNetAmt:1234, dscntCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', intCreditGlNumber:'sample data', intDebitGlNumber:'sample data', discountAmt:1234, interestAmt:1234, capFundSubModelId:'sample data', capFundModelId:'sample data', capFundWithholdAmt:1234, eftTransNumber:'sample data', seqCkprtId:1234, seqCltrnId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', prePriceOnlyFlag:'sample data', printFlag:'sample data', glMonth:'2018-01-01', apType:'sample data', creditGlNumber2:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', debitGlNumber1:'sample data', bankAccountCode:'sample data', companyCode:'sample data', vendor1099Flag:'sample data', postedDate:'2018-01-01', dueDate:'2018-01-01', checkDate:'2018-01-01', checkNumber:'sample data', seqVendAddress:1234, seqVendId:1234, selectForPayment:'sample data', apStatus:'sample data', netAmt:1234, discountWithhold:1234, fileType:'sample data', seqApTrans:1234}

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
      const accountsPayable: AccountsPayable = {writeOffAcc:'sample data', admFeePayableAcc:'sample data', admFeeExpenseAcc:'sample data', advPayPayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', seqVendCredit:1234, offsetSeqVadpyDtl:1234, checkEftAmount:1234, offsetFlag:'sample data', seqVendAdvPayAccDtl:1234, incentivePayableAcc:'sample data', incentiveExpenseAcc:'sample data', seqAdminFee:1234, penaltyPayableAcc:'sample data', penaltyExpenseAcc:'sample data', penaltyAmt:1234, seqClaimId:1234, paidNetAmt:1234, dscntCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', intCreditGlNumber:'sample data', intDebitGlNumber:'sample data', discountAmt:1234, interestAmt:1234, capFundSubModelId:'sample data', capFundModelId:'sample data', capFundWithholdAmt:1234, eftTransNumber:'sample data', seqCkprtId:1234, seqCltrnId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', prePriceOnlyFlag:'sample data', printFlag:'sample data', glMonth:'2018-01-01', apType:'sample data', creditGlNumber2:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', debitGlNumber1:'sample data', bankAccountCode:'sample data', companyCode:'sample data', vendor1099Flag:'sample data', postedDate:'2018-01-01', dueDate:'2018-01-01', checkDate:'2018-01-01', checkNumber:'sample data', seqVendAddress:1234, seqVendId:1234, selectForPayment:'sample data', apStatus:'sample data', netAmt:1234, discountWithhold:1234, fileType:'sample data', seqApTrans:1234};
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
      const accountsPayable: AccountsPayable = {writeOffAcc:'sample data', admFeePayableAcc:'sample data', admFeeExpenseAcc:'sample data', advPayPayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', seqVendCredit:1234, offsetSeqVadpyDtl:1234, checkEftAmount:1234, offsetFlag:'sample data', seqVendAdvPayAccDtl:1234, incentivePayableAcc:'sample data', incentiveExpenseAcc:'sample data', seqAdminFee:1234, penaltyPayableAcc:'sample data', penaltyExpenseAcc:'sample data', penaltyAmt:1234, seqClaimId:1234, paidNetAmt:1234, dscntCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', intCreditGlNumber:'sample data', intDebitGlNumber:'sample data', discountAmt:1234, interestAmt:1234, capFundSubModelId:'sample data', capFundModelId:'sample data', capFundWithholdAmt:1234, eftTransNumber:'sample data', seqCkprtId:1234, seqCltrnId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', prePriceOnlyFlag:'sample data', printFlag:'sample data', glMonth:'2018-01-01', apType:'sample data', creditGlNumber2:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', debitGlNumber1:'sample data', bankAccountCode:'sample data', companyCode:'sample data', vendor1099Flag:'sample data', postedDate:'2018-01-01', dueDate:'2018-01-01', checkDate:'2018-01-01', checkNumber:'sample data', seqVendAddress:1234, seqVendId:1234, selectForPayment:'sample data', apStatus:'sample data', netAmt:1234, discountWithhold:1234, fileType:'sample data', seqApTrans:1234};
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