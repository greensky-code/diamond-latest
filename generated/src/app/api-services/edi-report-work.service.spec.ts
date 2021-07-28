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

import { EdiReportWorkService } from './edi-report-work.service';
import { EdiReportWork } from '../api-models/edi-report-work.model'
import { EdiReportWorks } from "../api-models/testing/fake-edi-report-work.model"

describe('EdiReportWorkService', () => {
  let injector: TestBed;
  let service: EdiReportWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EdiReportWorkService]
    });
    injector = getTestBed();
    service = injector.get(EdiReportWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getEdiReportWorks', () => {
    it('should return an Promise<EdiReportWork[]>', () => {
      const ediReportWork = [
       {seqPrediId:1234, seqMessageId:1234, messageId:1234, reportText:'sample data', seqSourceId:1234, currentValue:'sample data', newValue:'sample data', reportCode:'sample data', subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', columnChanged:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {seqPrediId:1234, seqMessageId:1234, messageId:1234, reportText:'sample data', seqSourceId:1234, currentValue:'sample data', newValue:'sample data', reportCode:'sample data', subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', columnChanged:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {seqPrediId:1234, seqMessageId:1234, messageId:1234, reportText:'sample data', seqSourceId:1234, currentValue:'sample data', newValue:'sample data', reportCode:'sample data', subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', columnChanged:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'}

      ];
      service.getEdiReportWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/edireportworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ediReportWork);
    });
  });


  describe('#createEdiReportWork', () => {
    var id = 1;
    it('should return an Promise<EdiReportWork>', () => {
      const ediReportWork: EdiReportWork = {seqPrediId:1234, seqMessageId:1234, messageId:1234, reportText:'sample data', seqSourceId:1234, currentValue:'sample data', newValue:'sample data', reportCode:'sample data', subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', columnChanged:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.createEdiReportWork(ediReportWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/edireportworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateEdiReportWork', () => {
    var id = 1;
    it('should return an Promise<EdiReportWork>', () => {
      const ediReportWork: EdiReportWork = {seqPrediId:1234, seqMessageId:1234, messageId:1234, reportText:'sample data', seqSourceId:1234, currentValue:'sample data', newValue:'sample data', reportCode:'sample data', subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', columnChanged:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.updateEdiReportWork(ediReportWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/edireportworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteEdiReportWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteEdiReportWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/edireportworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});