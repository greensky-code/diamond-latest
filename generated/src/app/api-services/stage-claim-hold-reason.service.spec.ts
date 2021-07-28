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

import { StageClaimHoldReasonService } from './stage-claim-hold-reason.service';
import { StageClaimHoldReason } from '../api-models/stage-claim-hold-reason.model'
import { StageClaimHoldReasons } from "../api-models/testing/fake-stage-claim-hold-reason.model"

describe('StageClaimHoldReasonService', () => {
  let injector: TestBed;
  let service: StageClaimHoldReasonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageClaimHoldReasonService]
    });
    injector = getTestBed();
    service = injector.get(StageClaimHoldReasonService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageClaimHoldReasons', () => {
    it('should return an Promise<StageClaimHoldReason[]>', () => {
      const stageClaimHoldReason = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, reasonCode:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, reasonCode:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, reasonCode:'sample data'}

      ];
      service.getStageClaimHoldReasons().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimholdreasons/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageClaimHoldReason);
    });
  });


  describe('#createStageClaimHoldReason', () => {
    var id = 1;
    it('should return an Promise<StageClaimHoldReason>', () => {
      const stageClaimHoldReason: StageClaimHoldReason = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, reasonCode:'sample data'};
      service.createStageClaimHoldReason(stageClaimHoldReason).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimholdreasons`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageClaimHoldReason', () => {
    var id = 1;
    it('should return an Promise<StageClaimHoldReason>', () => {
      const stageClaimHoldReason: StageClaimHoldReason = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, reasonCode:'sample data'};
      service.updateStageClaimHoldReason(stageClaimHoldReason, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimholdreasons/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageClaimHoldReason', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageClaimHoldReason(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimholdreasons/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});