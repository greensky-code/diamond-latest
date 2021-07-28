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

import { ReportHeaderService } from './report-header.service';
import { ReportHeader } from '../api-models/report-header.model'
import { ReportHeaders } from "../api-models/testing/fake-report-header.model"

describe('ReportHeaderService', () => {
  let injector: TestBed;
  let service: ReportHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportHeaderService]
    });
    injector = getTestBed();
    service = injector.get(ReportHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getReportHeaders', () => {
    it('should return an Promise<ReportHeader[]>', () => {
      const reportHeader = [
       {seqJobId:1234, jobId:'sample data', keywordName:'sample data', parentJobId:'sample data', requestDate:'2018-01-01', requestType:'sample data', runDate:'2018-01-01', statusInd:'sample data', deferredInd:'sample data', reprintInd:'sample data', storedProcedureId:'sample data', toolUsed:'sample data', connectString:'sample data', serverClientPrtInd:'sample data', printerName:'sample data', errorInd:1234, inProcessFlg:'sample data', workfileTableName:'sample data', templateInd:'sample data', comments:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqJobId:1234, jobId:'sample data', keywordName:'sample data', parentJobId:'sample data', requestDate:'2018-01-01', requestType:'sample data', runDate:'2018-01-01', statusInd:'sample data', deferredInd:'sample data', reprintInd:'sample data', storedProcedureId:'sample data', toolUsed:'sample data', connectString:'sample data', serverClientPrtInd:'sample data', printerName:'sample data', errorInd:1234, inProcessFlg:'sample data', workfileTableName:'sample data', templateInd:'sample data', comments:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqJobId:1234, jobId:'sample data', keywordName:'sample data', parentJobId:'sample data', requestDate:'2018-01-01', requestType:'sample data', runDate:'2018-01-01', statusInd:'sample data', deferredInd:'sample data', reprintInd:'sample data', storedProcedureId:'sample data', toolUsed:'sample data', connectString:'sample data', serverClientPrtInd:'sample data', printerName:'sample data', errorInd:1234, inProcessFlg:'sample data', workfileTableName:'sample data', templateInd:'sample data', comments:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getReportHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/reportheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(reportHeader);
    });
  });


  describe('#createReportHeader', () => {
    var id = 1;
    it('should return an Promise<ReportHeader>', () => {
      const reportHeader: ReportHeader = {seqJobId:1234, jobId:'sample data', keywordName:'sample data', parentJobId:'sample data', requestDate:'2018-01-01', requestType:'sample data', runDate:'2018-01-01', statusInd:'sample data', deferredInd:'sample data', reprintInd:'sample data', storedProcedureId:'sample data', toolUsed:'sample data', connectString:'sample data', serverClientPrtInd:'sample data', printerName:'sample data', errorInd:1234, inProcessFlg:'sample data', workfileTableName:'sample data', templateInd:'sample data', comments:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createReportHeader(reportHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateReportHeader', () => {
    var id = 1;
    it('should return an Promise<ReportHeader>', () => {
      const reportHeader: ReportHeader = {seqJobId:1234, jobId:'sample data', keywordName:'sample data', parentJobId:'sample data', requestDate:'2018-01-01', requestType:'sample data', runDate:'2018-01-01', statusInd:'sample data', deferredInd:'sample data', reprintInd:'sample data', storedProcedureId:'sample data', toolUsed:'sample data', connectString:'sample data', serverClientPrtInd:'sample data', printerName:'sample data', errorInd:1234, inProcessFlg:'sample data', workfileTableName:'sample data', templateInd:'sample data', comments:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateReportHeader(reportHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteReportHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteReportHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});