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

import { StageAuthAddtlInfoPwkService } from './stage-auth-addtl-info-pwk.service';
import { StageAuthAddtlInfoPwk } from '../api-models/stage-auth-addtl-info-pwk.model'
import { StageAuthAddtlInfoPwks } from "../api-models/testing/fake-stage-auth-addtl-info-pwk.model"

describe('StageAuthAddtlInfoPwkService', () => {
  let injector: TestBed;
  let service: StageAuthAddtlInfoPwkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageAuthAddtlInfoPwkService]
    });
    injector = getTestBed();
    service = injector.get(StageAuthAddtlInfoPwkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageAuthAddtlInfoPwks', () => {
    it('should return an Promise<StageAuthAddtlInfoPwk[]>', () => {
      const stageAuthAddtlInfoPwk = [
       {batchId:'sample data', transactionId:1234, seqStageAuthAddtlInfoPwk:1234, seqStageAuthProc:1234, paperworkLevelInd:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqStageAuthAddtlInfoPwk:1234, seqStageAuthProc:1234, paperworkLevelInd:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqStageAuthAddtlInfoPwk:1234, seqStageAuthProc:1234, paperworkLevelInd:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageAuthAddtlInfoPwks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthaddtlinfopwks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageAuthAddtlInfoPwk);
    });
  });


  describe('#createStageAuthAddtlInfoPwk', () => {
    var id = 1;
    it('should return an Promise<StageAuthAddtlInfoPwk>', () => {
      const stageAuthAddtlInfoPwk: StageAuthAddtlInfoPwk = {batchId:'sample data', transactionId:1234, seqStageAuthAddtlInfoPwk:1234, seqStageAuthProc:1234, paperworkLevelInd:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', insertDatetime:'2018-01-01'};
      service.createStageAuthAddtlInfoPwk(stageAuthAddtlInfoPwk).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthaddtlinfopwks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageAuthAddtlInfoPwk', () => {
    var id = 1;
    it('should return an Promise<StageAuthAddtlInfoPwk>', () => {
      const stageAuthAddtlInfoPwk: StageAuthAddtlInfoPwk = {batchId:'sample data', transactionId:1234, seqStageAuthAddtlInfoPwk:1234, seqStageAuthProc:1234, paperworkLevelInd:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageAuthAddtlInfoPwk(stageAuthAddtlInfoPwk, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthaddtlinfopwks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageAuthAddtlInfoPwk', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageAuthAddtlInfoPwk(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthaddtlinfopwks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});