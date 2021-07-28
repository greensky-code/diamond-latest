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

import { CheckPrintDetailWorkService } from './check-print-detail-work.service';
import { CheckPrintDetailWork } from '../api-models/check-print-detail-work.model'
import { CheckPrintDetailWorks } from "../api-models/testing/fake-check-print-detail-work.model"

describe('CheckPrintDetailWorkService', () => {
  let injector: TestBed;
  let service: CheckPrintDetailWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckPrintDetailWorkService]
    });
    injector = getTestBed();
    service = injector.get(CheckPrintDetailWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCheckPrintDetailWorks', () => {
    it('should return an Promise<CheckPrintDetailWork[]>', () => {
      const checkPrintDetailWork = [
       {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, apStatus:'sample data', netAmt:1234, negCheckFlag:'sample data', claimStatus:'sample data', printFlag:'sample data', debitGlNumber1:'sample data', fileType:'sample data', checkNumber:'sample data', bankAccountCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, seqRuleId:1234, uncleanDays:1234, penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234},
       {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, apStatus:'sample data', netAmt:1234, negCheckFlag:'sample data', claimStatus:'sample data', printFlag:'sample data', debitGlNumber1:'sample data', fileType:'sample data', checkNumber:'sample data', bankAccountCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, seqRuleId:1234, uncleanDays:1234, penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234},
       {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, apStatus:'sample data', netAmt:1234, negCheckFlag:'sample data', claimStatus:'sample data', printFlag:'sample data', debitGlNumber1:'sample data', fileType:'sample data', checkNumber:'sample data', bankAccountCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, seqRuleId:1234, uncleanDays:1234, penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234}

      ];
      service.getCheckPrintDetailWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintdetailworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(checkPrintDetailWork);
    });
  });


  describe('#createCheckPrintDetailWork', () => {
    var id = 1;
    it('should return an Promise<CheckPrintDetailWork>', () => {
      const checkPrintDetailWork: CheckPrintDetailWork = {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, apStatus:'sample data', netAmt:1234, negCheckFlag:'sample data', claimStatus:'sample data', printFlag:'sample data', debitGlNumber1:'sample data', fileType:'sample data', checkNumber:'sample data', bankAccountCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, seqRuleId:1234, uncleanDays:1234, penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234};
      service.createCheckPrintDetailWork(checkPrintDetailWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintdetailworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCheckPrintDetailWork', () => {
    var id = 1;
    it('should return an Promise<CheckPrintDetailWork>', () => {
      const checkPrintDetailWork: CheckPrintDetailWork = {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, apStatus:'sample data', netAmt:1234, negCheckFlag:'sample data', claimStatus:'sample data', printFlag:'sample data', debitGlNumber1:'sample data', fileType:'sample data', checkNumber:'sample data', bankAccountCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, seqRuleId:1234, uncleanDays:1234, penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234};
      service.updateCheckPrintDetailWork(checkPrintDetailWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintdetailworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCheckPrintDetailWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCheckPrintDetailWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintdetailworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});