/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../../app/shared/components/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { ClmDtlAuthProcLnkRuleService } from './clm-dtl-auth-proc-lnk-rule.service';
import { ClmDtlAuthProcLnkRule } from '../api-models/clm-dtl-auth-proc-lnk-rule.model'
// import { ClmDtlAuthProcLnkRules } from "../api-models/testing/fake-clm-dtl-auth-proc-lnk-rule.model"

describe('ClmDtlAuthProcLnkRuleService', () => {
  let injector: TestBed;
  let service: ClmDtlAuthProcLnkRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClmDtlAuthProcLnkRuleService]
    });
    injector = getTestBed();
    service = injector.get(ClmDtlAuthProcLnkRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClmDtlAuthProcLnkRules', () => {
    it('should return an Promise<ClmDtlAuthProcLnkRule[]>', () => {
      const clmDtlAuthProcLnkRule = [
       {ruleId:'sample data', description:'sample data', submtVsAuthProcCode:'sample data', priceOnAuthProcCode:'sample data', authProcCodeStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ruleId:'sample data', description:'sample data', submtVsAuthProcCode:'sample data', priceOnAuthProcCode:'sample data', authProcCodeStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ruleId:'sample data', description:'sample data', submtVsAuthProcCode:'sample data', priceOnAuthProcCode:'sample data', authProcCodeStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getClmDtlAuthProcLnkRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/clmdtlauthproclnkrules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(clmDtlAuthProcLnkRule);
    });
  });


  describe('#createClmDtlAuthProcLnkRule', () => {
    var id = 1;
    it('should return an Promise<ClmDtlAuthProcLnkRule>', () => {
      const clmDtlAuthProcLnkRule: ClmDtlAuthProcLnkRule = {ruleId:'sample data', description:'sample data', submtVsAuthProcCode:'sample data', priceOnAuthProcCode:'sample data', authProcCodeStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/clmdtlauthproclnkrules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClmDtlAuthProcLnkRule', () => {
    var id = 1;
    it('should return an Promise<ClmDtlAuthProcLnkRule>', () => {
      const clmDtlAuthProcLnkRule: ClmDtlAuthProcLnkRule = {ruleId:'sample data', description:'sample data', submtVsAuthProcCode:'sample data', priceOnAuthProcCode:'sample data', authProcCodeStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/clmdtlauthproclnkrules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClmDtlAuthProcLnkRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClmDtlAuthProcLnkRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/clmdtlauthproclnkrules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});
