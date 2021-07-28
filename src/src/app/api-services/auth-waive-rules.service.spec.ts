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

import { AuthWaiveRulesService } from './auth-waive-rules.service';
import { AuthWaiveRules } from '../api-models/auth-waive-rules.model'
import { AuthWaiveRuleses } from "../api-models/testing/fake-auth-waive-rules.model"

describe('AuthWaiveRulesService', () => {
  let injector: TestBed;
  let service: AuthWaiveRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthWaiveRulesService]
    });
    injector = getTestBed();
    service = injector.get(AuthWaiveRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthWaiveRuleses', () => {
    it('should return an Promise<AuthWaiveRules[]>', () => {
      const authWaiveRules = [
       {seqAwRule:1234, claimType:'sample data', awaveOrder:1234, awRuleFromDate:'2018-01-01', description:'sample data', awRuleThruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAwRule:1234, claimType:'sample data', awaveOrder:1234, awRuleFromDate:'2018-01-01', description:'sample data', awRuleThruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAwRule:1234, claimType:'sample data', awaveOrder:1234, awRuleFromDate:'2018-01-01', description:'sample data', awRuleThruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthWaiveRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authwaiveruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authWaiveRules);
    });
  });


  describe('#createAuthWaiveRules', () => {
    var id = 1;
    it('should return an Promise<AuthWaiveRules>', () => {
      const authWaiveRules: AuthWaiveRules = {seqAwRule:1234, claimType:'sample data', awaveOrder:1234, awRuleFromDate:'2018-01-01', description:'sample data', awRuleThruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthWaiveRules(authWaiveRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authwaiveruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthWaiveRules', () => {
    var id = 1;
    it('should return an Promise<AuthWaiveRules>', () => {
      const authWaiveRules: AuthWaiveRules = {seqAwRule:1234, claimType:'sample data', awaveOrder:1234, awRuleFromDate:'2018-01-01', description:'sample data', awRuleThruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthWaiveRules(authWaiveRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authwaiveruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthWaiveRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthWaiveRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authwaiveruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});