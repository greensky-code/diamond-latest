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

import { StagePremPayHeaderService } from './stage-prem-pay-header.service';
import { StagePremPayHeader } from '../api-models/stage-prem-pay-header.model'
import { StagePremPayHeaders } from "../api-models/testing/fake-stage-prem-pay-header.model"

describe('StagePremPayHeaderService', () => {
  let injector: TestBed;
  let service: StagePremPayHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePremPayHeaderService]
    });
    injector = getTestBed();
    service = injector.get(StagePremPayHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePremPayHeaders', () => {
    it('should return an Promise<StagePremPayHeader[]>', () => {
      const stagePremPayHeader = [
       {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', batchTotal:1234, checkEftNumber:1234, creditDebitFlag:'sample data', premiumPayerIdQualifier:'sample data', premiumPayerIdentifier:'sample data', premiumPayerName:'sample data', premiumPayerAddressLine1:'sample data', premiumPayerAddressLine2:'sample data', premiumPayerCity:'sample data', premiumPayerState:'sample data', premiumPayerZip:'sample data', referenceIdentifierQualifier:'sample data', premiumReceiverRefId:'sample data'},
       {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', batchTotal:1234, checkEftNumber:1234, creditDebitFlag:'sample data', premiumPayerIdQualifier:'sample data', premiumPayerIdentifier:'sample data', premiumPayerName:'sample data', premiumPayerAddressLine1:'sample data', premiumPayerAddressLine2:'sample data', premiumPayerCity:'sample data', premiumPayerState:'sample data', premiumPayerZip:'sample data', referenceIdentifierQualifier:'sample data', premiumReceiverRefId:'sample data'},
       {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', batchTotal:1234, checkEftNumber:1234, creditDebitFlag:'sample data', premiumPayerIdQualifier:'sample data', premiumPayerIdentifier:'sample data', premiumPayerName:'sample data', premiumPayerAddressLine1:'sample data', premiumPayerAddressLine2:'sample data', premiumPayerCity:'sample data', premiumPayerState:'sample data', premiumPayerZip:'sample data', referenceIdentifierQualifier:'sample data', premiumReceiverRefId:'sample data'}

      ];
      service.getStagePremPayHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePremPayHeader);
    });
  });


  describe('#createStagePremPayHeader', () => {
    var id = 1;
    it('should return an Promise<StagePremPayHeader>', () => {
      const stagePremPayHeader: StagePremPayHeader = {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', batchTotal:1234, checkEftNumber:1234, creditDebitFlag:'sample data', premiumPayerIdQualifier:'sample data', premiumPayerIdentifier:'sample data', premiumPayerName:'sample data', premiumPayerAddressLine1:'sample data', premiumPayerAddressLine2:'sample data', premiumPayerCity:'sample data', premiumPayerState:'sample data', premiumPayerZip:'sample data', referenceIdentifierQualifier:'sample data', premiumReceiverRefId:'sample data'};
      service.createStagePremPayHeader(stagePremPayHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePremPayHeader', () => {
    var id = 1;
    it('should return an Promise<StagePremPayHeader>', () => {
      const stagePremPayHeader: StagePremPayHeader = {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', batchTotal:1234, checkEftNumber:1234, creditDebitFlag:'sample data', premiumPayerIdQualifier:'sample data', premiumPayerIdentifier:'sample data', premiumPayerName:'sample data', premiumPayerAddressLine1:'sample data', premiumPayerAddressLine2:'sample data', premiumPayerCity:'sample data', premiumPayerState:'sample data', premiumPayerZip:'sample data', referenceIdentifierQualifier:'sample data', premiumReceiverRefId:'sample data'};
      service.updateStagePremPayHeader(stagePremPayHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePremPayHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePremPayHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});