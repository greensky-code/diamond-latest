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

import { CaseReasonRuleService } from './case-reason-rule.service';
import { CaseReasonRule } from '../api-models/case-reason-rule.model'
import { CaseReasonRules } from "../api-models/testing/fake-case-reason-rule.model"

describe('CaseReasonRuleService', () => {
  let injector: TestBed;
  let service: CaseReasonRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CaseReasonRuleService]
    });
    injector = getTestBed();
    service = injector.get(CaseReasonRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCaseReasonRules', () => {
    it('should return an Promise<CaseReasonRule[]>', () => {
      const caseReasonRule = [
       {seqReasonRuleId:1234, reasonCsCode:'sample data', category1CsCode:'sample data', category2CsCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqReasonRuleId:1234, reasonCsCode:'sample data', category1CsCode:'sample data', category2CsCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqReasonRuleId:1234, reasonCsCode:'sample data', category1CsCode:'sample data', category2CsCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCaseReasonRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/casereasonrules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(caseReasonRule);
    });
  });


  describe('#createCaseReasonRule', () => {
    var id = 1;
    it('should return an Promise<CaseReasonRule>', () => {
      const caseReasonRule: CaseReasonRule = {seqReasonRuleId:1234, reasonCsCode:'sample data', category1CsCode:'sample data', category2CsCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCaseReasonRule(caseReasonRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casereasonrules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCaseReasonRule', () => {
    var id = 1;
    it('should return an Promise<CaseReasonRule>', () => {
      const caseReasonRule: CaseReasonRule = {seqReasonRuleId:1234, reasonCsCode:'sample data', category1CsCode:'sample data', category2CsCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCaseReasonRule(caseReasonRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casereasonrules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCaseReasonRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCaseReasonRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casereasonrules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});