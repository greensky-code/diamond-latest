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

import { HoldDenyLogService } from './hold-deny-log.service';
import { HoldDenyLog } from '../api-models/hold-deny-log.model'
import { HoldDenyLogs } from "../api-models/testing/fake-hold-deny-log.model"

describe('HoldDenyLogService', () => {
  let injector: TestBed;
  let service: HoldDenyLogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HoldDenyLogService]
    });
    injector = getTestBed();
    service = injector.get(HoldDenyLogService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getHoldDenyLogs', () => {
    it('should return an Promise<HoldDenyLog[]>', () => {
      const holdDenyLog = [
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', hdIndicator:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', hdIndicator:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', hdIndicator:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getHoldDenyLogs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/holddenylogs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(holdDenyLog);
    });
  });


  describe('#createHoldDenyLog', () => {
    var id = 1;
    it('should return an Promise<HoldDenyLog>', () => {
      const holdDenyLog: HoldDenyLog = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', hdIndicator:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createHoldDenyLog(holdDenyLog).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/holddenylogs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateHoldDenyLog', () => {
    var id = 1;
    it('should return an Promise<HoldDenyLog>', () => {
      const holdDenyLog: HoldDenyLog = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', hdIndicator:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateHoldDenyLog(holdDenyLog, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/holddenylogs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteHoldDenyLog', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteHoldDenyLog(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/holddenylogs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});