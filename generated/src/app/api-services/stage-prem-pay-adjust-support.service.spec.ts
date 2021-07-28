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

import { StagePremPayAdjustSupportService } from './stage-prem-pay-adjust-support.service';
import { StagePremPayAdjustSupport } from '../api-models/stage-prem-pay-adjust-support.model'
import { StagePremPayAdjustSupports } from "../api-models/testing/fake-stage-prem-pay-adjust-support.model"

describe('StagePremPayAdjustSupportService', () => {
  let injector: TestBed;
  let service: StagePremPayAdjustSupportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePremPayAdjustSupportService]
    });
    injector = getTestBed();
    service = injector.get(StagePremPayAdjustSupportService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePremPayAdjustSupports', () => {
    it('should return an Promise<StagePremPayAdjustSupport[]>', () => {
      const stagePremPayAdjustSupport = [
       {batchId:'sample data', transactionId:1234, adjustId:1234, arAdjCustomerId:'sample data', arAdjStatementStatus:'sample data', arAdjInvoiceNumber:1234, arAdjPostDate:'2018-01-01', arAdjCompanyCode:'sample data', arAdjGlRefCode:'sample data', arAdjTransactionDesc1:'sample data', adjustmentReason:'sample data', seqGroupId:1234, groupType:'sample data', groupId:'sample data', subscriberId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'},
       {batchId:'sample data', transactionId:1234, adjustId:1234, arAdjCustomerId:'sample data', arAdjStatementStatus:'sample data', arAdjInvoiceNumber:1234, arAdjPostDate:'2018-01-01', arAdjCompanyCode:'sample data', arAdjGlRefCode:'sample data', arAdjTransactionDesc1:'sample data', adjustmentReason:'sample data', seqGroupId:1234, groupType:'sample data', groupId:'sample data', subscriberId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'},
       {batchId:'sample data', transactionId:1234, adjustId:1234, arAdjCustomerId:'sample data', arAdjStatementStatus:'sample data', arAdjInvoiceNumber:1234, arAdjPostDate:'2018-01-01', arAdjCompanyCode:'sample data', arAdjGlRefCode:'sample data', arAdjTransactionDesc1:'sample data', adjustmentReason:'sample data', seqGroupId:1234, groupType:'sample data', groupId:'sample data', subscriberId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'}

      ];
      service.getStagePremPayAdjustSupports().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayadjustsupports/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePremPayAdjustSupport);
    });
  });


  describe('#createStagePremPayAdjustSupport', () => {
    var id = 1;
    it('should return an Promise<StagePremPayAdjustSupport>', () => {
      const stagePremPayAdjustSupport: StagePremPayAdjustSupport = {batchId:'sample data', transactionId:1234, adjustId:1234, arAdjCustomerId:'sample data', arAdjStatementStatus:'sample data', arAdjInvoiceNumber:1234, arAdjPostDate:'2018-01-01', arAdjCompanyCode:'sample data', arAdjGlRefCode:'sample data', arAdjTransactionDesc1:'sample data', adjustmentReason:'sample data', seqGroupId:1234, groupType:'sample data', groupId:'sample data', subscriberId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'};
      service.createStagePremPayAdjustSupport(stagePremPayAdjustSupport).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayadjustsupports`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePremPayAdjustSupport', () => {
    var id = 1;
    it('should return an Promise<StagePremPayAdjustSupport>', () => {
      const stagePremPayAdjustSupport: StagePremPayAdjustSupport = {batchId:'sample data', transactionId:1234, adjustId:1234, arAdjCustomerId:'sample data', arAdjStatementStatus:'sample data', arAdjInvoiceNumber:1234, arAdjPostDate:'2018-01-01', arAdjCompanyCode:'sample data', arAdjGlRefCode:'sample data', arAdjTransactionDesc1:'sample data', adjustmentReason:'sample data', seqGroupId:1234, groupType:'sample data', groupId:'sample data', subscriberId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'};
      service.updateStagePremPayAdjustSupport(stagePremPayAdjustSupport, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayadjustsupports/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePremPayAdjustSupport', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePremPayAdjustSupport(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayadjustsupports/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});