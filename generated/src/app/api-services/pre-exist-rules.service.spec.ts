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

import { PreExistRulesService } from './pre-exist-rules.service';
import { PreExistRules } from '../api-models/pre-exist-rules.model'
import { PreExistRuleses } from "../api-models/testing/fake-pre-exist-rules.model"

describe('PreExistRulesService', () => {
  let injector: TestBed;
  let service: PreExistRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PreExistRulesService]
    });
    injector = getTestBed();
    service = injector.get(PreExistRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPreExistRuleses', () => {
    it('should return an Promise<PreExistRules[]>', () => {
      const preExistRules = [
       {seqPecId:1234, pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPecId:1234, pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPecId:1234, pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPreExistRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/preexistruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(preExistRules);
    });
  });


  describe('#createPreExistRules', () => {
    var id = 1;
    it('should return an Promise<PreExistRules>', () => {
      const preExistRules: PreExistRules = {seqPecId:1234, pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPreExistRules(preExistRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/preexistruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePreExistRules', () => {
    var id = 1;
    it('should return an Promise<PreExistRules>', () => {
      const preExistRules: PreExistRules = {seqPecId:1234, pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePreExistRules(preExistRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/preexistruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePreExistRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePreExistRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/preexistruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});