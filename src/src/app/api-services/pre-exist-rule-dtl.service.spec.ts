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

import { PreExistRuleDtlService } from './pre-exist-rule-dtl.service';
import { PreExistRuleDtl } from '../api-models/pre-exist-rule-dtl.model'
import { PreExistRuleDtls } from "../api-models/testing/fake-pre-exist-rule-dtl.model"

describe('PreExistRuleDtlService', () => {
  let injector: TestBed;
  let service: PreExistRuleDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PreExistRuleDtlService]
    });
    injector = getTestBed();
    service = injector.get(PreExistRuleDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPreExistRuleDtls', () => {
    it('should return an Promise<PreExistRuleDtl[]>', () => {
      const preExistRuleDtl = [
       {seqPecDtlId:1234, seqPecId:1234, diagnosisType:'sample data', fromValue:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPecDtlId:1234, seqPecId:1234, diagnosisType:'sample data', fromValue:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPecDtlId:1234, seqPecId:1234, diagnosisType:'sample data', fromValue:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPreExistRuleDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/preexistruledtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(preExistRuleDtl);
    });
  });


  describe('#createPreExistRuleDtl', () => {
    var id = 1;
    it('should return an Promise<PreExistRuleDtl>', () => {
      const preExistRuleDtl: PreExistRuleDtl = {seqPecDtlId:1234, seqPecId:1234, diagnosisType:'sample data', fromValue:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPreExistRuleDtl(preExistRuleDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/preexistruledtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePreExistRuleDtl', () => {
    var id = 1;
    it('should return an Promise<PreExistRuleDtl>', () => {
      const preExistRuleDtl: PreExistRuleDtl = {seqPecDtlId:1234, seqPecId:1234, diagnosisType:'sample data', fromValue:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePreExistRuleDtl(preExistRuleDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/preexistruledtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePreExistRuleDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePreExistRuleDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/preexistruledtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});