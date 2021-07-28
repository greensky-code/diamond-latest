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

import { CaseReasonService } from './case-reason.service';
import { CaseReason } from '../api-models/case-reason.model'
import { CaseReasons } from "../api-models/testing/fake-case-reason.model"

describe('CaseReasonService', () => {
  let injector: TestBed;
  let service: CaseReasonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CaseReasonService]
    });
    injector = getTestBed();
    service = injector.get(CaseReasonService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCaseReasons', () => {
    it('should return an Promise<CaseReason[]>', () => {
      const caseReason = [
       {seqCaseId:1234, seqCaseReasonId:1234, seqCallerId:1234, sequenceNumber:1234, transDate:'2018-01-01', reasonCsCode:'sample data', reasonCat1CsCode:'sample data', reasonCat2CsCode:'sample data', contactToneCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCaseId:1234, seqCaseReasonId:1234, seqCallerId:1234, sequenceNumber:1234, transDate:'2018-01-01', reasonCsCode:'sample data', reasonCat1CsCode:'sample data', reasonCat2CsCode:'sample data', contactToneCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCaseId:1234, seqCaseReasonId:1234, seqCallerId:1234, sequenceNumber:1234, transDate:'2018-01-01', reasonCsCode:'sample data', reasonCat1CsCode:'sample data', reasonCat2CsCode:'sample data', contactToneCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCaseReasons().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/casereasons/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(caseReason);
    });
  });


  describe('#createCaseReason', () => {
    var id = 1;
    it('should return an Promise<CaseReason>', () => {
      const caseReason: CaseReason = {seqCaseId:1234, seqCaseReasonId:1234, seqCallerId:1234, sequenceNumber:1234, transDate:'2018-01-01', reasonCsCode:'sample data', reasonCat1CsCode:'sample data', reasonCat2CsCode:'sample data', contactToneCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCaseReason(caseReason).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casereasons`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCaseReason', () => {
    var id = 1;
    it('should return an Promise<CaseReason>', () => {
      const caseReason: CaseReason = {seqCaseId:1234, seqCaseReasonId:1234, seqCallerId:1234, sequenceNumber:1234, transDate:'2018-01-01', reasonCsCode:'sample data', reasonCat1CsCode:'sample data', reasonCat2CsCode:'sample data', contactToneCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCaseReason(caseReason, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casereasons/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCaseReason', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCaseReason(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casereasons/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});