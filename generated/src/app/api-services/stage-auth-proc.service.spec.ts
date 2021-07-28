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

import { StageAuthProcService } from './stage-auth-proc.service';
import { StageAuthProc } from '../api-models/stage-auth-proc.model'
import { StageAuthProcs } from "../api-models/testing/fake-stage-auth-proc.model"

describe('StageAuthProcService', () => {
  let injector: TestBed;
  let service: StageAuthProcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageAuthProcService]
    });
    injector = getTestBed();
    service = injector.get(StageAuthProcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageAuthProcs', () => {
    it('should return an Promise<StageAuthProc[]>', () => {
      const stageAuthProc = [
       {batchId:'sample data', transactionId:1234, seqNo:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', codeListQual:'sample data', authProcedure:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', priceSchedule:'sample data', priceRegion:'sample data', costProcedureCd:'sample data', authorizedCost:1234, requestedAmt:1234, requestedQty:1234, purchasePrice:1234, medDefCode:'sample data', toothNumber:'sample data', ndcCode:'sample data', qty:1234, costProcedureCd1:'sample data', toothNote:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', codeListQual:'sample data', authProcedure:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', priceSchedule:'sample data', priceRegion:'sample data', costProcedureCd:'sample data', authorizedCost:1234, requestedAmt:1234, requestedQty:1234, purchasePrice:1234, medDefCode:'sample data', toothNumber:'sample data', ndcCode:'sample data', qty:1234, costProcedureCd1:'sample data', toothNote:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', codeListQual:'sample data', authProcedure:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', priceSchedule:'sample data', priceRegion:'sample data', costProcedureCd:'sample data', authorizedCost:1234, requestedAmt:1234, requestedQty:1234, purchasePrice:1234, medDefCode:'sample data', toothNumber:'sample data', ndcCode:'sample data', qty:1234, costProcedureCd1:'sample data', toothNote:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageAuthProcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprocs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageAuthProc);
    });
  });


  describe('#createStageAuthProc', () => {
    var id = 1;
    it('should return an Promise<StageAuthProc>', () => {
      const stageAuthProc: StageAuthProc = {batchId:'sample data', transactionId:1234, seqNo:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', codeListQual:'sample data', authProcedure:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', priceSchedule:'sample data', priceRegion:'sample data', costProcedureCd:'sample data', authorizedCost:1234, requestedAmt:1234, requestedQty:1234, purchasePrice:1234, medDefCode:'sample data', toothNumber:'sample data', ndcCode:'sample data', qty:1234, costProcedureCd1:'sample data', toothNote:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', insertDatetime:'2018-01-01'};
      service.createStageAuthProc(stageAuthProc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprocs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageAuthProc', () => {
    var id = 1;
    it('should return an Promise<StageAuthProc>', () => {
      const stageAuthProc: StageAuthProc = {batchId:'sample data', transactionId:1234, seqNo:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', codeListQual:'sample data', authProcedure:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', priceSchedule:'sample data', priceRegion:'sample data', costProcedureCd:'sample data', authorizedCost:1234, requestedAmt:1234, requestedQty:1234, purchasePrice:1234, medDefCode:'sample data', toothNumber:'sample data', ndcCode:'sample data', qty:1234, costProcedureCd1:'sample data', toothNote:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageAuthProc(stageAuthProc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprocs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageAuthProc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageAuthProc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprocs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});