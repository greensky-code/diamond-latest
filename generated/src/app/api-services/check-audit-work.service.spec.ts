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

import { CheckAuditWorkService } from './check-audit-work.service';
import { CheckAuditWork } from '../api-models/check-audit-work.model'
import { CheckAuditWorks } from "../api-models/testing/fake-check-audit-work.model"

describe('CheckAuditWorkService', () => {
  let injector: TestBed;
  let service: CheckAuditWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckAuditWorkService]
    });
    injector = getTestBed();
    service = injector.get(CheckAuditWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCheckAuditWorks', () => {
    it('should return an Promise<CheckAuditWork[]>', () => {
      const checkAuditWork = [
       {seqCvsupId:1234, bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkTransUpdSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, seqApTrans:1234, fileType:'sample data', transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', claimNumber:'sample data', lineNumber:1234, dateOfService:'2018-01-01', procedureCode:'sample data', netAmt:1234, seqCapTrans:1234, capModelId:'sample data', capEntityCode:'sample data', capPoolId:'sample data', capMonth:'2018-01-01', applyTo:'sample data', capTransAmt:1234, insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, penaltyAmt:1234, seqAdminFee:1234, seqVendAdvPayAccDtl:1234},
       {seqCvsupId:1234, bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkTransUpdSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, seqApTrans:1234, fileType:'sample data', transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', claimNumber:'sample data', lineNumber:1234, dateOfService:'2018-01-01', procedureCode:'sample data', netAmt:1234, seqCapTrans:1234, capModelId:'sample data', capEntityCode:'sample data', capPoolId:'sample data', capMonth:'2018-01-01', applyTo:'sample data', capTransAmt:1234, insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, penaltyAmt:1234, seqAdminFee:1234, seqVendAdvPayAccDtl:1234},
       {seqCvsupId:1234, bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkTransUpdSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, seqApTrans:1234, fileType:'sample data', transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', claimNumber:'sample data', lineNumber:1234, dateOfService:'2018-01-01', procedureCode:'sample data', netAmt:1234, seqCapTrans:1234, capModelId:'sample data', capEntityCode:'sample data', capPoolId:'sample data', capMonth:'2018-01-01', applyTo:'sample data', capTransAmt:1234, insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, penaltyAmt:1234, seqAdminFee:1234, seqVendAdvPayAccDtl:1234}

      ];
      service.getCheckAuditWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/checkauditworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(checkAuditWork);
    });
  });


  describe('#createCheckAuditWork', () => {
    var id = 1;
    it('should return an Promise<CheckAuditWork>', () => {
      const checkAuditWork: CheckAuditWork = {seqCvsupId:1234, bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkTransUpdSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, seqApTrans:1234, fileType:'sample data', transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', claimNumber:'sample data', lineNumber:1234, dateOfService:'2018-01-01', procedureCode:'sample data', netAmt:1234, seqCapTrans:1234, capModelId:'sample data', capEntityCode:'sample data', capPoolId:'sample data', capMonth:'2018-01-01', applyTo:'sample data', capTransAmt:1234, insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, penaltyAmt:1234, seqAdminFee:1234, seqVendAdvPayAccDtl:1234};
      service.createCheckAuditWork(checkAuditWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkauditworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCheckAuditWork', () => {
    var id = 1;
    it('should return an Promise<CheckAuditWork>', () => {
      const checkAuditWork: CheckAuditWork = {seqCvsupId:1234, bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkTransUpdSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, seqApTrans:1234, fileType:'sample data', transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', claimNumber:'sample data', lineNumber:1234, dateOfService:'2018-01-01', procedureCode:'sample data', netAmt:1234, seqCapTrans:1234, capModelId:'sample data', capEntityCode:'sample data', capPoolId:'sample data', capMonth:'2018-01-01', applyTo:'sample data', capTransAmt:1234, insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, penaltyAmt:1234, seqAdminFee:1234, seqVendAdvPayAccDtl:1234};
      service.updateCheckAuditWork(checkAuditWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkauditworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCheckAuditWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCheckAuditWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkauditworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});