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

import { StageClaimNdcService } from './stage-claim-ndc.service';
import { StageClaimNdc } from '../api-models/stage-claim-ndc.model'
import { StageClaimNdcs } from "../api-models/testing/fake-stage-claim-ndc.model"

describe('StageClaimNdcService', () => {
  let injector: TestBed;
  let service: StageClaimNdcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageClaimNdcService]
    });
    injector = getTestBed();
    service = injector.get(StageClaimNdcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageClaimNdcs', () => {
    it('should return an Promise<StageClaimNdc[]>', () => {
      const stageClaimNdc = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, ndcCode:'sample data', quantity:1234, codeQualifier:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxCodeQualifier:'sample data', ndcRxNumber:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, ndcCode:'sample data', quantity:1234, codeQualifier:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxCodeQualifier:'sample data', ndcRxNumber:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, ndcCode:'sample data', quantity:1234, codeQualifier:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxCodeQualifier:'sample data', ndcRxNumber:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageClaimNdcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimndcs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageClaimNdc);
    });
  });


  describe('#createStageClaimNdc', () => {
    var id = 1;
    it('should return an Promise<StageClaimNdc>', () => {
      const stageClaimNdc: StageClaimNdc = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, ndcCode:'sample data', quantity:1234, codeQualifier:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxCodeQualifier:'sample data', ndcRxNumber:'sample data', insertDatetime:'2018-01-01'};
      service.createStageClaimNdc(stageClaimNdc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimndcs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageClaimNdc', () => {
    var id = 1;
    it('should return an Promise<StageClaimNdc>', () => {
      const stageClaimNdc: StageClaimNdc = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, ndcCode:'sample data', quantity:1234, codeQualifier:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxCodeQualifier:'sample data', ndcRxNumber:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageClaimNdc(stageClaimNdc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimndcs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageClaimNdc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageClaimNdc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimndcs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});