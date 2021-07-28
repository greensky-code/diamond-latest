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

import { GeneralLedgerReferenceService } from './general-ledger-reference.service';
import { GeneralLedgerReference } from '../api-models/general-ledger-reference.model'
import { GeneralLedgerReferences } from "../api-models/testing/fake-general-ledger-reference.model"

describe('GeneralLedgerReferenceService', () => {
  let injector: TestBed;
  let service: GeneralLedgerReferenceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeneralLedgerReferenceService]
    });
    injector = getTestBed();
    service = injector.get(GeneralLedgerReferenceService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGeneralLedgerReferences', () => {
    it('should return an Promise<GeneralLedgerReference[]>', () => {
      const generalLedgerReference = [
       {companyCode:'sample data', glRefCode:'sample data', description:'sample data', debitGlNumber1:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'},
       {companyCode:'sample data', glRefCode:'sample data', description:'sample data', debitGlNumber1:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'},
       {companyCode:'sample data', glRefCode:'sample data', description:'sample data', debitGlNumber1:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'}

      ];
      service.getGeneralLedgerReferences().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerreferences/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(generalLedgerReference);
    });
  });


  describe('#createGeneralLedgerReference', () => {
    var id = 1;
    it('should return an Promise<GeneralLedgerReference>', () => {
      const generalLedgerReference: GeneralLedgerReference = {companyCode:'sample data', glRefCode:'sample data', description:'sample data', debitGlNumber1:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'};
      service.createGeneralLedgerReference(generalLedgerReference).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerreferences`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGeneralLedgerReference', () => {
    var id = 1;
    it('should return an Promise<GeneralLedgerReference>', () => {
      const generalLedgerReference: GeneralLedgerReference = {companyCode:'sample data', glRefCode:'sample data', description:'sample data', debitGlNumber1:'sample data', creditGlNumber1:'sample data', debitGlNumber2:'sample data', creditGlNumber2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', intDebitGlNumber:'sample data', intCreditGlNumber:'sample data', dscntDebitGlNumber:'sample data', dscntCreditGlNumber:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', penaltyExpenseAcc:'sample data', penaltyPayableAcc:'sample data', incentiveExpenseAcc:'sample data', incentivePayableAcc:'sample data', advPayPrepaidExpenseAcc:'sample data', advPayPayableAcc:'sample data', admFeeExpenseAcc:'sample data', admFeePayableAcc:'sample data', writeOffAcc:'sample data'};
      service.updateGeneralLedgerReference(generalLedgerReference, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerreferences/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGeneralLedgerReference', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGeneralLedgerReference(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerreferences/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});