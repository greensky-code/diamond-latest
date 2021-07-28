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

import { ReportSelectionParamService } from './report-selection-param.service';
import { ReportSelectionParam } from '../api-models/report-selection-param.model'
import { ReportSelectionParams } from "../api-models/testing/fake-report-selection-param.model"

describe('ReportSelectionParamService', () => {
  let injector: TestBed;
  let service: ReportSelectionParamService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportSelectionParamService]
    });
    injector = getTestBed();
    service = injector.get(ReportSelectionParamService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getReportSelectionParams', () => {
    it('should return an Promise<ReportSelectionParam[]>', () => {
      const reportSelectionParam = [
       {seqSelect:1234, seqJobId:1234, selectionTypeCode:'sample data', columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'},
       {seqSelect:1234, seqJobId:1234, selectionTypeCode:'sample data', columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'},
       {seqSelect:1234, seqJobId:1234, selectionTypeCode:'sample data', columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'}

      ];
      service.getReportSelectionParams().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/reportselectionparams/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(reportSelectionParam);
    });
  });


  describe('#createReportSelectionParam', () => {
    var id = 1;
    it('should return an Promise<ReportSelectionParam>', () => {
      const reportSelectionParam: ReportSelectionParam = {seqSelect:1234, seqJobId:1234, selectionTypeCode:'sample data', columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'};
      service.createReportSelectionParam(reportSelectionParam).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportselectionparams`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateReportSelectionParam', () => {
    var id = 1;
    it('should return an Promise<ReportSelectionParam>', () => {
      const reportSelectionParam: ReportSelectionParam = {seqSelect:1234, seqJobId:1234, selectionTypeCode:'sample data', columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'};
      service.updateReportSelectionParam(reportSelectionParam, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportselectionparams/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteReportSelectionParam', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteReportSelectionParam(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportselectionparams/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});