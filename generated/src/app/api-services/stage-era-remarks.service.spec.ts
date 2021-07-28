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

import { StageEraRemarksService } from './stage-era-remarks.service';
import { StageEraRemarks } from '../api-models/stage-era-remarks.model'
import { StageEraRemarkss } from "../api-models/testing/fake-stage-era-remarks.model"

describe('StageEraRemarksService', () => {
  let injector: TestBed;
  let service: StageEraRemarksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageEraRemarksService]
    });
    injector = getTestBed();
    service = injector.get(StageEraRemarksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageEraRemarkss', () => {
    it('should return an Promise<StageEraRemarks[]>', () => {
      const stageEraRemarks = [
       {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data'}

      ];
      service.getStageEraRemarkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageeraremarkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageEraRemarks);
    });
  });


  describe('#createStageEraRemarks', () => {
    var id = 1;
    it('should return an Promise<StageEraRemarks>', () => {
      const stageEraRemarks: StageEraRemarks = {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data'};
      service.createStageEraRemarks(stageEraRemarks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeraremarkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageEraRemarks', () => {
    var id = 1;
    it('should return an Promise<StageEraRemarks>', () => {
      const stageEraRemarks: StageEraRemarks = {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data'};
      service.updateStageEraRemarks(stageEraRemarks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeraremarkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageEraRemarks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageEraRemarks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeraremarkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});