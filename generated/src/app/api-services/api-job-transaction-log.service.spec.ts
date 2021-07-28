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

import { ApiJobTransactionLogService } from './api-job-transaction-log.service';
import { ApiJobTransactionLog } from '../api-models/api-job-transaction-log.model'
import { ApiJobTransactionLogs } from "../api-models/testing/fake-api-job-transaction-log.model"

describe('ApiJobTransactionLogService', () => {
  let injector: TestBed;
  let service: ApiJobTransactionLogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiJobTransactionLogService]
    });
    injector = getTestBed();
    service = injector.get(ApiJobTransactionLogService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getApiJobTransactionLogs', () => {
    it('should return an Promise<ApiJobTransactionLog[]>', () => {
      const apiJobTransactionLog = [
       {seqJobId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqJobId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqJobId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getApiJobTransactionLogs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/apijobtransactionlogs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(apiJobTransactionLog);
    });
  });


  describe('#createApiJobTransactionLog', () => {
    var id = 1;
    it('should return an Promise<ApiJobTransactionLog>', () => {
      const apiJobTransactionLog: ApiJobTransactionLog = {seqJobId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createApiJobTransactionLog(apiJobTransactionLog).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apijobtransactionlogs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateApiJobTransactionLog', () => {
    var id = 1;
    it('should return an Promise<ApiJobTransactionLog>', () => {
      const apiJobTransactionLog: ApiJobTransactionLog = {seqJobId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateApiJobTransactionLog(apiJobTransactionLog, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apijobtransactionlogs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteApiJobTransactionLog', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteApiJobTransactionLog(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apijobtransactionlogs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});