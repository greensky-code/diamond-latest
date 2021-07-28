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

import { StagePremPayCashSupportService } from './stage-prem-pay-cash-support.service';
import { StagePremPayCashSupport } from '../api-models/stage-prem-pay-cash-support.model'
import { StagePremPayCashSupports } from "../api-models/testing/fake-stage-prem-pay-cash-support.model"

describe('StagePremPayCashSupportService', () => {
  let injector: TestBed;
  let service: StagePremPayCashSupportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePremPayCashSupportService]
    });
    injector = getTestBed();
    service = injector.get(StagePremPayCashSupportService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePremPayCashSupports', () => {
    it('should return an Promise<StagePremPayCashSupport[]>', () => {
      const stagePremPayCashSupport = [
       {batchId:'sample data', transactionId:1234, cashId:1234, arCashSeqControlBatchId:1234, arCashControlItemCount:1234, arCashControlBatchStatus:'sample data', arCashControlSecurityCode:'sample data', arCashReceiptBatchId:1234, arCashReceiptCompanyCode:'sample data', arCashReceiptGlRefCode:'sample data', arCashReceiptSubscriberId:'sample data', arCashReceiptDescription:'sample data', arCashReceiptStatmntStatus:'sample data', arCashReceiptInvoiceNumber:1234, seqGroupId:1234, groupType:'sample data', groupId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'},
       {batchId:'sample data', transactionId:1234, cashId:1234, arCashSeqControlBatchId:1234, arCashControlItemCount:1234, arCashControlBatchStatus:'sample data', arCashControlSecurityCode:'sample data', arCashReceiptBatchId:1234, arCashReceiptCompanyCode:'sample data', arCashReceiptGlRefCode:'sample data', arCashReceiptSubscriberId:'sample data', arCashReceiptDescription:'sample data', arCashReceiptStatmntStatus:'sample data', arCashReceiptInvoiceNumber:1234, seqGroupId:1234, groupType:'sample data', groupId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'},
       {batchId:'sample data', transactionId:1234, cashId:1234, arCashSeqControlBatchId:1234, arCashControlItemCount:1234, arCashControlBatchStatus:'sample data', arCashControlSecurityCode:'sample data', arCashReceiptBatchId:1234, arCashReceiptCompanyCode:'sample data', arCashReceiptGlRefCode:'sample data', arCashReceiptSubscriberId:'sample data', arCashReceiptDescription:'sample data', arCashReceiptStatmntStatus:'sample data', arCashReceiptInvoiceNumber:1234, seqGroupId:1234, groupType:'sample data', groupId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'}

      ];
      service.getStagePremPayCashSupports().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempaycashsupports/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePremPayCashSupport);
    });
  });


  describe('#createStagePremPayCashSupport', () => {
    var id = 1;
    it('should return an Promise<StagePremPayCashSupport>', () => {
      const stagePremPayCashSupport: StagePremPayCashSupport = {batchId:'sample data', transactionId:1234, cashId:1234, arCashSeqControlBatchId:1234, arCashControlItemCount:1234, arCashControlBatchStatus:'sample data', arCashControlSecurityCode:'sample data', arCashReceiptBatchId:1234, arCashReceiptCompanyCode:'sample data', arCashReceiptGlRefCode:'sample data', arCashReceiptSubscriberId:'sample data', arCashReceiptDescription:'sample data', arCashReceiptStatmntStatus:'sample data', arCashReceiptInvoiceNumber:1234, seqGroupId:1234, groupType:'sample data', groupId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'};
      service.createStagePremPayCashSupport(stagePremPayCashSupport).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempaycashsupports`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePremPayCashSupport', () => {
    var id = 1;
    it('should return an Promise<StagePremPayCashSupport>', () => {
      const stagePremPayCashSupport: StagePremPayCashSupport = {batchId:'sample data', transactionId:1234, cashId:1234, arCashSeqControlBatchId:1234, arCashControlItemCount:1234, arCashControlBatchStatus:'sample data', arCashControlSecurityCode:'sample data', arCashReceiptBatchId:1234, arCashReceiptCompanyCode:'sample data', arCashReceiptGlRefCode:'sample data', arCashReceiptSubscriberId:'sample data', arCashReceiptDescription:'sample data', arCashReceiptStatmntStatus:'sample data', arCashReceiptInvoiceNumber:1234, seqGroupId:1234, groupType:'sample data', groupId:'sample data', debitGlNumber:'sample data', creditGlNumber:'sample data'};
      service.updateStagePremPayCashSupport(stagePremPayCashSupport, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempaycashsupports/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePremPayCashSupport', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePremPayCashSupport(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempaycashsupports/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});