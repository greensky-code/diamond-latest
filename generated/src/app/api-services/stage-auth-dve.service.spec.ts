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

import { StageAuthDveService } from './stage-auth-dve.service';
import { StageAuthDve } from '../api-models/stage-auth-dve.model'
import { StageAuthDves } from "../api-models/testing/fake-stage-auth-dve.model"

describe('StageAuthDveService', () => {
  let injector: TestBed;
  let service: StageAuthDveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageAuthDveService]
    });
    injector = getTestBed();
    service = injector.get(StageAuthDveService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageAuthDves', () => {
    it('should return an Promise<StageAuthDve[]>', () => {
      const stageAuthDve = [
       {batchId:'sample data', transactionId:1234, seqNo:1234, extension:1234, extReason:'sample data', extDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, extension:1234, extReason:'sample data', extDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, extension:1234, extReason:'sample data', extDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageAuthDves().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthdves/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageAuthDve);
    });
  });


  describe('#createStageAuthDve', () => {
    var id = 1;
    it('should return an Promise<StageAuthDve>', () => {
      const stageAuthDve: StageAuthDve = {batchId:'sample data', transactionId:1234, seqNo:1234, extension:1234, extReason:'sample data', extDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'};
      service.createStageAuthDve(stageAuthDve).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthdves`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageAuthDve', () => {
    var id = 1;
    it('should return an Promise<StageAuthDve>', () => {
      const stageAuthDve: StageAuthDve = {batchId:'sample data', transactionId:1234, seqNo:1234, extension:1234, extReason:'sample data', extDate:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageAuthDve(stageAuthDve, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthdves/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageAuthDve', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageAuthDve(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthdves/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});