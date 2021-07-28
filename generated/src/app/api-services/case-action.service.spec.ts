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

import { CaseActionService } from './case-action.service';
import { CaseAction } from '../api-models/case-action.model'
import { CaseActions } from "../api-models/testing/fake-case-action.model"

describe('CaseActionService', () => {
  let injector: TestBed;
  let service: CaseActionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CaseActionService]
    });
    injector = getTestBed();
    service = injector.get(CaseActionService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCaseActions', () => {
    it('should return an Promise<CaseAction[]>', () => {
      const caseAction = [
       {seqCaseId:1234, seqCaseReasonId:1234, seqActionId:1234, sequenceNumber:1234, requestor:'sample data', requestDate:'2018-01-01', assignedRep:'sample data', xrefTypeCsCode:'sample data', xrefNumber:'sample data', dueDate:'2018-01-01', statusCsCode:'sample data', statusDate:'2018-01-01', request:'sample data', respondToEntity:'sample data', seqCallerId:1234, responseMethodCsCode:'sample data', responseLetterId:'sample data', responseDate:'2018-01-01', response:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCaseId:1234, seqCaseReasonId:1234, seqActionId:1234, sequenceNumber:1234, requestor:'sample data', requestDate:'2018-01-01', assignedRep:'sample data', xrefTypeCsCode:'sample data', xrefNumber:'sample data', dueDate:'2018-01-01', statusCsCode:'sample data', statusDate:'2018-01-01', request:'sample data', respondToEntity:'sample data', seqCallerId:1234, responseMethodCsCode:'sample data', responseLetterId:'sample data', responseDate:'2018-01-01', response:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCaseId:1234, seqCaseReasonId:1234, seqActionId:1234, sequenceNumber:1234, requestor:'sample data', requestDate:'2018-01-01', assignedRep:'sample data', xrefTypeCsCode:'sample data', xrefNumber:'sample data', dueDate:'2018-01-01', statusCsCode:'sample data', statusDate:'2018-01-01', request:'sample data', respondToEntity:'sample data', seqCallerId:1234, responseMethodCsCode:'sample data', responseLetterId:'sample data', responseDate:'2018-01-01', response:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCaseActions().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/caseactions/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(caseAction);
    });
  });


  describe('#createCaseAction', () => {
    var id = 1;
    it('should return an Promise<CaseAction>', () => {
      const caseAction: CaseAction = {seqCaseId:1234, seqCaseReasonId:1234, seqActionId:1234, sequenceNumber:1234, requestor:'sample data', requestDate:'2018-01-01', assignedRep:'sample data', xrefTypeCsCode:'sample data', xrefNumber:'sample data', dueDate:'2018-01-01', statusCsCode:'sample data', statusDate:'2018-01-01', request:'sample data', respondToEntity:'sample data', seqCallerId:1234, responseMethodCsCode:'sample data', responseLetterId:'sample data', responseDate:'2018-01-01', response:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCaseAction(caseAction).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caseactions`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCaseAction', () => {
    var id = 1;
    it('should return an Promise<CaseAction>', () => {
      const caseAction: CaseAction = {seqCaseId:1234, seqCaseReasonId:1234, seqActionId:1234, sequenceNumber:1234, requestor:'sample data', requestDate:'2018-01-01', assignedRep:'sample data', xrefTypeCsCode:'sample data', xrefNumber:'sample data', dueDate:'2018-01-01', statusCsCode:'sample data', statusDate:'2018-01-01', request:'sample data', respondToEntity:'sample data', seqCallerId:1234, responseMethodCsCode:'sample data', responseLetterId:'sample data', responseDate:'2018-01-01', response:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCaseAction(caseAction, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caseactions/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCaseAction', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCaseAction(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caseactions/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});