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

import { StageClaimDtlRemarksService } from './stage-claim-dtl-remarks.service';
import { StageClaimDtlRemarks } from '../api-models/stage-claim-dtl-remarks.model'
import { StageClaimDtlRemarkss } from "../api-models/testing/fake-stage-claim-dtl-remarks.model"

describe('StageClaimDtlRemarksService', () => {
  let injector: TestBed;
  let service: StageClaimDtlRemarksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageClaimDtlRemarksService]
    });
    injector = getTestBed();
    service = injector.get(StageClaimDtlRemarksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageClaimDtlRemarkss', () => {
    it('should return an Promise<StageClaimDtlRemarks[]>', () => {
      const stageClaimDtlRemarks = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, remarkCode:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, remarkCode:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, remarkCode:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageClaimDtlRemarkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimdtlremarkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageClaimDtlRemarks);
    });
  });


  describe('#createStageClaimDtlRemarks', () => {
    var id = 1;
    it('should return an Promise<StageClaimDtlRemarks>', () => {
      const stageClaimDtlRemarks: StageClaimDtlRemarks = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, remarkCode:'sample data', insertDatetime:'2018-01-01'};
      service.createStageClaimDtlRemarks(stageClaimDtlRemarks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimdtlremarkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageClaimDtlRemarks', () => {
    var id = 1;
    it('should return an Promise<StageClaimDtlRemarks>', () => {
      const stageClaimDtlRemarks: StageClaimDtlRemarks = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, remarkCode:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageClaimDtlRemarks(stageClaimDtlRemarks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimdtlremarkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageClaimDtlRemarks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageClaimDtlRemarks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimdtlremarkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});