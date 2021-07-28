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

import { AlLtrRequestTransLogService } from './al-ltr-request-trans-log.service';
import { AlLtrRequestTransLog } from '../api-models/al-ltr-request-trans-log.model'
import { AlLtrRequestTransLogs } from "../api-models/testing/fake-al-ltr-request-trans-log.model"

describe('AlLtrRequestTransLogService', () => {
  let injector: TestBed;
  let service: AlLtrRequestTransLogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlLtrRequestTransLogService]
    });
    injector = getTestBed();
    service = injector.get(AlLtrRequestTransLogService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAlLtrRequestTransLogs', () => {
    it('should return an Promise<AlLtrRequestTransLog[]>', () => {
      const alLtrRequestTransLog = [
       {seqLetterRequestId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, exportFilename:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterRequestId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, exportFilename:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterRequestId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, exportFilename:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAlLtrRequestTransLogs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/alltrrequesttranslogs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(alLtrRequestTransLog);
    });
  });


  describe('#createAlLtrRequestTransLog', () => {
    var id = 1;
    it('should return an Promise<AlLtrRequestTransLog>', () => {
      const alLtrRequestTransLog: AlLtrRequestTransLog = {seqLetterRequestId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, exportFilename:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAlLtrRequestTransLog(alLtrRequestTransLog).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alltrrequesttranslogs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAlLtrRequestTransLog', () => {
    var id = 1;
    it('should return an Promise<AlLtrRequestTransLog>', () => {
      const alLtrRequestTransLog: AlLtrRequestTransLog = {seqLetterRequestId:1234, seqTranId:1234, actualStartTime:'2018-01-01', actualEndTime:'2018-01-01', transStatus:1234, exportFilename:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAlLtrRequestTransLog(alLtrRequestTransLog, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alltrrequesttranslogs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAlLtrRequestTransLog', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAlLtrRequestTransLog(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alltrrequesttranslogs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});