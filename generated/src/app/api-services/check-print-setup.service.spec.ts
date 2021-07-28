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

import { CheckPrintSetupService } from './check-print-setup.service';
import { CheckPrintSetup } from '../api-models/check-print-setup.model'
import { CheckPrintSetups } from "../api-models/testing/fake-check-print-setup.model"

describe('CheckPrintSetupService', () => {
  let injector: TestBed;
  let service: CheckPrintSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckPrintSetupService]
    });
    injector = getTestBed();
    service = injector.get(CheckPrintSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCheckPrintSetups', () => {
    it('should return an Promise<CheckPrintSetup[]>', () => {
      const checkPrintSetup = [
       {adminFeeInd:'sample data', minCheckOverride:'sample data', seqCapPoolId:1234, capEntityCode:'sample data', capModelId:'sample data', seqClaimId:1234, inProcess:'sample data', daemonRequest:'sample data', numAlignChecksPrinted:1234, unixSpoolerName:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', autoVoidChecks:'sample data', checkNotes:'sample data', printChoice:'sample data', seqProvId:1234, seqMembId:1234, selectForPayment:'sample data', thruDueDate:'2018-01-01', fromDueDate:'2018-01-01', thruPostDate:'2018-01-01', fromPostDate:'2018-01-01', seqVendAddress:1234, seqVendId:1234, checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data', companyCode:'sample data', payableType:'sample data', postMonth:'2018-01-01', action:'sample data', autoManualFlag:'sample data', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqCkprtId:1234},
       {adminFeeInd:'sample data', minCheckOverride:'sample data', seqCapPoolId:1234, capEntityCode:'sample data', capModelId:'sample data', seqClaimId:1234, inProcess:'sample data', daemonRequest:'sample data', numAlignChecksPrinted:1234, unixSpoolerName:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', autoVoidChecks:'sample data', checkNotes:'sample data', printChoice:'sample data', seqProvId:1234, seqMembId:1234, selectForPayment:'sample data', thruDueDate:'2018-01-01', fromDueDate:'2018-01-01', thruPostDate:'2018-01-01', fromPostDate:'2018-01-01', seqVendAddress:1234, seqVendId:1234, checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data', companyCode:'sample data', payableType:'sample data', postMonth:'2018-01-01', action:'sample data', autoManualFlag:'sample data', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqCkprtId:1234},
       {adminFeeInd:'sample data', minCheckOverride:'sample data', seqCapPoolId:1234, capEntityCode:'sample data', capModelId:'sample data', seqClaimId:1234, inProcess:'sample data', daemonRequest:'sample data', numAlignChecksPrinted:1234, unixSpoolerName:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', autoVoidChecks:'sample data', checkNotes:'sample data', printChoice:'sample data', seqProvId:1234, seqMembId:1234, selectForPayment:'sample data', thruDueDate:'2018-01-01', fromDueDate:'2018-01-01', thruPostDate:'2018-01-01', fromPostDate:'2018-01-01', seqVendAddress:1234, seqVendId:1234, checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data', companyCode:'sample data', payableType:'sample data', postMonth:'2018-01-01', action:'sample data', autoManualFlag:'sample data', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqCkprtId:1234}

      ];
      service.getCheckPrintSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(checkPrintSetup);
    });
  });


  describe('#createCheckPrintSetup', () => {
    var id = 1;
    it('should return an Promise<CheckPrintSetup>', () => {
      const checkPrintSetup: CheckPrintSetup = {adminFeeInd:'sample data', minCheckOverride:'sample data', seqCapPoolId:1234, capEntityCode:'sample data', capModelId:'sample data', seqClaimId:1234, inProcess:'sample data', daemonRequest:'sample data', numAlignChecksPrinted:1234, unixSpoolerName:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', autoVoidChecks:'sample data', checkNotes:'sample data', printChoice:'sample data', seqProvId:1234, seqMembId:1234, selectForPayment:'sample data', thruDueDate:'2018-01-01', fromDueDate:'2018-01-01', thruPostDate:'2018-01-01', fromPostDate:'2018-01-01', seqVendAddress:1234, seqVendId:1234, checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data', companyCode:'sample data', payableType:'sample data', postMonth:'2018-01-01', action:'sample data', autoManualFlag:'sample data', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqCkprtId:1234};
      service.createCheckPrintSetup(checkPrintSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCheckPrintSetup', () => {
    var id = 1;
    it('should return an Promise<CheckPrintSetup>', () => {
      const checkPrintSetup: CheckPrintSetup = {adminFeeInd:'sample data', minCheckOverride:'sample data', seqCapPoolId:1234, capEntityCode:'sample data', capModelId:'sample data', seqClaimId:1234, inProcess:'sample data', daemonRequest:'sample data', numAlignChecksPrinted:1234, unixSpoolerName:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', autoVoidChecks:'sample data', checkNotes:'sample data', printChoice:'sample data', seqProvId:1234, seqMembId:1234, selectForPayment:'sample data', thruDueDate:'2018-01-01', fromDueDate:'2018-01-01', thruPostDate:'2018-01-01', fromPostDate:'2018-01-01', seqVendAddress:1234, seqVendId:1234, checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data', companyCode:'sample data', payableType:'sample data', postMonth:'2018-01-01', action:'sample data', autoManualFlag:'sample data', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqCkprtId:1234};
      service.updateCheckPrintSetup(checkPrintSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCheckPrintSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCheckPrintSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});