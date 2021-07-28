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

import { StageAuthAppealService } from './stage-auth-appeal.service';
import { StageAuthAppeal } from '../api-models/stage-auth-appeal.model'
import { StageAuthAppeals } from "../api-models/testing/fake-stage-auth-appeal.model"

describe('StageAuthAppealService', () => {
  let injector: TestBed;
  let service: StageAuthAppealService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageAuthAppealService]
    });
    injector = getTestBed();
    service = injector.get(StageAuthAppealService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageAuthAppeals', () => {
    it('should return an Promise<StageAuthAppeal[]>', () => {
      const stageAuthAppeal = [
       {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', appealNumber:'sample data', appellant:'sample data', contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', appealNumber:'sample data', appellant:'sample data', contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', appealNumber:'sample data', appellant:'sample data', contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageAuthAppeals().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthappeals/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageAuthAppeal);
    });
  });


  describe('#createStageAuthAppeal', () => {
    var id = 1;
    it('should return an Promise<StageAuthAppeal>', () => {
      const stageAuthAppeal: StageAuthAppeal = {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', appealNumber:'sample data', appellant:'sample data', contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'};
      service.createStageAuthAppeal(stageAuthAppeal).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthappeals`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageAuthAppeal', () => {
    var id = 1;
    it('should return an Promise<StageAuthAppeal>', () => {
      const stageAuthAppeal: StageAuthAppeal = {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', appealNumber:'sample data', appellant:'sample data', contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageAuthAppeal(stageAuthAppeal, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthappeals/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageAuthAppeal', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageAuthAppeal(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthappeals/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});