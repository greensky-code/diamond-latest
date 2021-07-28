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

import { ManualCheckSelectWorkService } from './manual-check-select-work.service';
import { ManualCheckSelectWork } from '../api-models/manual-check-select-work.model'
import { ManualCheckSelectWorks } from "../api-models/testing/fake-manual-check-select-work.model"

describe('ManualCheckSelectWorkService', () => {
  let injector: TestBed;
  let service: ManualCheckSelectWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ManualCheckSelectWorkService]
    });
    injector = getTestBed();
    service = injector.get(ManualCheckSelectWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getManualCheckSelectWorks', () => {
    it('should return an Promise<ManualCheckSelectWork[]>', () => {
      const manualCheckSelectWork = [
       {seqCkprtId:1234, jobId:'sample data', passNumber:1234, checkNumber:'sample data', seqApTrans:1234, requestUser:'sample data', runDate:'2018-01-01', payType:'sample data', companyCode:'sample data', status:'sample data', seqVendorId:1234, seqVendorAddress:1234, seqProviderId:1234, seqMemberId:1234, seqClaimId:1234, detailSvcDate:'2018-01-01', procedureCode:'sample data', netAmt:1234, capMonth:'2018-01-01', tranType:'sample data', tranAmt:1234, capModelId:'sample data', capEntityCode:'sample data', seqCapPoolId:1234, fromPostDate:'2018-01-01', thruPostDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', includeFlag:'sample data', seqCapTrans:1234, lineNumber:1234, subLineCode:'sample data'},
       {seqCkprtId:1234, jobId:'sample data', passNumber:1234, checkNumber:'sample data', seqApTrans:1234, requestUser:'sample data', runDate:'2018-01-01', payType:'sample data', companyCode:'sample data', status:'sample data', seqVendorId:1234, seqVendorAddress:1234, seqProviderId:1234, seqMemberId:1234, seqClaimId:1234, detailSvcDate:'2018-01-01', procedureCode:'sample data', netAmt:1234, capMonth:'2018-01-01', tranType:'sample data', tranAmt:1234, capModelId:'sample data', capEntityCode:'sample data', seqCapPoolId:1234, fromPostDate:'2018-01-01', thruPostDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', includeFlag:'sample data', seqCapTrans:1234, lineNumber:1234, subLineCode:'sample data'},
       {seqCkprtId:1234, jobId:'sample data', passNumber:1234, checkNumber:'sample data', seqApTrans:1234, requestUser:'sample data', runDate:'2018-01-01', payType:'sample data', companyCode:'sample data', status:'sample data', seqVendorId:1234, seqVendorAddress:1234, seqProviderId:1234, seqMemberId:1234, seqClaimId:1234, detailSvcDate:'2018-01-01', procedureCode:'sample data', netAmt:1234, capMonth:'2018-01-01', tranType:'sample data', tranAmt:1234, capModelId:'sample data', capEntityCode:'sample data', seqCapPoolId:1234, fromPostDate:'2018-01-01', thruPostDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', includeFlag:'sample data', seqCapTrans:1234, lineNumber:1234, subLineCode:'sample data'}

      ];
      service.getManualCheckSelectWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/manualcheckselectworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(manualCheckSelectWork);
    });
  });


  describe('#createManualCheckSelectWork', () => {
    var id = 1;
    it('should return an Promise<ManualCheckSelectWork>', () => {
      const manualCheckSelectWork: ManualCheckSelectWork = {seqCkprtId:1234, jobId:'sample data', passNumber:1234, checkNumber:'sample data', seqApTrans:1234, requestUser:'sample data', runDate:'2018-01-01', payType:'sample data', companyCode:'sample data', status:'sample data', seqVendorId:1234, seqVendorAddress:1234, seqProviderId:1234, seqMemberId:1234, seqClaimId:1234, detailSvcDate:'2018-01-01', procedureCode:'sample data', netAmt:1234, capMonth:'2018-01-01', tranType:'sample data', tranAmt:1234, capModelId:'sample data', capEntityCode:'sample data', seqCapPoolId:1234, fromPostDate:'2018-01-01', thruPostDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', includeFlag:'sample data', seqCapTrans:1234, lineNumber:1234, subLineCode:'sample data'};
      service.createManualCheckSelectWork(manualCheckSelectWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/manualcheckselectworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateManualCheckSelectWork', () => {
    var id = 1;
    it('should return an Promise<ManualCheckSelectWork>', () => {
      const manualCheckSelectWork: ManualCheckSelectWork = {seqCkprtId:1234, jobId:'sample data', passNumber:1234, checkNumber:'sample data', seqApTrans:1234, requestUser:'sample data', runDate:'2018-01-01', payType:'sample data', companyCode:'sample data', status:'sample data', seqVendorId:1234, seqVendorAddress:1234, seqProviderId:1234, seqMemberId:1234, seqClaimId:1234, detailSvcDate:'2018-01-01', procedureCode:'sample data', netAmt:1234, capMonth:'2018-01-01', tranType:'sample data', tranAmt:1234, capModelId:'sample data', capEntityCode:'sample data', seqCapPoolId:1234, fromPostDate:'2018-01-01', thruPostDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', includeFlag:'sample data', seqCapTrans:1234, lineNumber:1234, subLineCode:'sample data'};
      service.updateManualCheckSelectWork(manualCheckSelectWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/manualcheckselectworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteManualCheckSelectWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteManualCheckSelectWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/manualcheckselectworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});