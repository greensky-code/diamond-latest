/* Copyright (c) 2021 . All Rights Reserved. */

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

import { CiebBenPlanAccumTransLogService } from './cieb-ben-plan-accum-trans-log.service';
import { CiebBenPlanAccumTransLog } from '../api-models/cieb-ben-plan-accum-trans-log.model'
import { CiebBenPlanAccumTransLogs } from "../api-models/testing/fake-cieb-ben-plan-accum-trans-log.model"

describe('CiebBenPlanAccumTransLogService', () => {
  let injector: TestBed;
  let service: CiebBenPlanAccumTransLogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebBenPlanAccumTransLogService]
    });
    injector = getTestBed();
    service = injector.get(CiebBenPlanAccumTransLogService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebBenPlanAccumTransLogs', () => {
    it('should return an Promise<CiebBenPlanAccumTransLog[]>', () => {
      const ciebBenPlanAccumTransLog = [
       {seqPlanTransId:1234, svcRefId:'sample data', reqGroupNumber:'sample data', reqBenOptCode:'sample data', reqClmSrcSysCode:'sample data', reqAsOfDate:'sample data', reqStateCode:'sample data', invoOutcomCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPlanTransId:1234, svcRefId:'sample data', reqGroupNumber:'sample data', reqBenOptCode:'sample data', reqClmSrcSysCode:'sample data', reqAsOfDate:'sample data', reqStateCode:'sample data', invoOutcomCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPlanTransId:1234, svcRefId:'sample data', reqGroupNumber:'sample data', reqBenOptCode:'sample data', reqClmSrcSysCode:'sample data', reqAsOfDate:'sample data', reqStateCode:'sample data', invoOutcomCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebBenPlanAccumTransLogs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbenplanaccumtranslogs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebBenPlanAccumTransLog);
    });
  });


  describe('#createCiebBenPlanAccumTransLog', () => {
    var id = 1;
    it('should return an Promise<CiebBenPlanAccumTransLog>', () => {
      const ciebBenPlanAccumTransLog: CiebBenPlanAccumTransLog = {seqPlanTransId:1234, svcRefId:'sample data', reqGroupNumber:'sample data', reqBenOptCode:'sample data', reqClmSrcSysCode:'sample data', reqAsOfDate:'sample data', reqStateCode:'sample data', invoOutcomCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebBenPlanAccumTransLog(ciebBenPlanAccumTransLog).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbenplanaccumtranslogs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebBenPlanAccumTransLog', () => {
    var id = 1;
    it('should return an Promise<CiebBenPlanAccumTransLog>', () => {
      const ciebBenPlanAccumTransLog: CiebBenPlanAccumTransLog = {seqPlanTransId:1234, svcRefId:'sample data', reqGroupNumber:'sample data', reqBenOptCode:'sample data', reqClmSrcSysCode:'sample data', reqAsOfDate:'sample data', reqStateCode:'sample data', invoOutcomCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebBenPlanAccumTransLog(ciebBenPlanAccumTransLog, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbenplanaccumtranslogs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebBenPlanAccumTransLog', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebBenPlanAccumTransLog(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbenplanaccumtranslogs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});