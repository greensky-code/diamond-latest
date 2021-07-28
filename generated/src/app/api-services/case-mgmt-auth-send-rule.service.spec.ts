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

import { CaseMgmtAuthSendRuleService } from './case-mgmt-auth-send-rule.service';
import { CaseMgmtAuthSendRule } from '../api-models/case-mgmt-auth-send-rule.model'
import { CaseMgmtAuthSendRules } from "../api-models/testing/fake-case-mgmt-auth-send-rule.model"

describe('CaseMgmtAuthSendRuleService', () => {
  let injector: TestBed;
  let service: CaseMgmtAuthSendRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CaseMgmtAuthSendRuleService]
    });
    injector = getTestBed();
    service = injector.get(CaseMgmtAuthSendRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCaseMgmtAuthSendRules', () => {
    it('should return an Promise<CaseMgmtAuthSendRule[]>', () => {
      const caseMgmtAuthSendRule = [
       {caseMgmtAuthSendRuleSeq:1234, caseMgmtAuthSendRuleDet:'sample data', valueFrom:'sample data', valueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {caseMgmtAuthSendRuleSeq:1234, caseMgmtAuthSendRuleDet:'sample data', valueFrom:'sample data', valueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {caseMgmtAuthSendRuleSeq:1234, caseMgmtAuthSendRuleDet:'sample data', valueFrom:'sample data', valueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCaseMgmtAuthSendRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/casemgmtauthsendrules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(caseMgmtAuthSendRule);
    });
  });


  describe('#createCaseMgmtAuthSendRule', () => {
    var id = 1;
    it('should return an Promise<CaseMgmtAuthSendRule>', () => {
      const caseMgmtAuthSendRule: CaseMgmtAuthSendRule = {caseMgmtAuthSendRuleSeq:1234, caseMgmtAuthSendRuleDet:'sample data', valueFrom:'sample data', valueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCaseMgmtAuthSendRule(caseMgmtAuthSendRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casemgmtauthsendrules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCaseMgmtAuthSendRule', () => {
    var id = 1;
    it('should return an Promise<CaseMgmtAuthSendRule>', () => {
      const caseMgmtAuthSendRule: CaseMgmtAuthSendRule = {caseMgmtAuthSendRuleSeq:1234, caseMgmtAuthSendRuleDet:'sample data', valueFrom:'sample data', valueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCaseMgmtAuthSendRule(caseMgmtAuthSendRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casemgmtauthsendrules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCaseMgmtAuthSendRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCaseMgmtAuthSendRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casemgmtauthsendrules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});