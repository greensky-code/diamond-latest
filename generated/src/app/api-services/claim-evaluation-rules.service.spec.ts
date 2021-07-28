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

import { ClaimEvaluationRulesService } from './claim-evaluation-rules.service';
import { ClaimEvaluationRules } from '../api-models/claim-evaluation-rules.model'
import { ClaimEvaluationRuleses } from "../api-models/testing/fake-claim-evaluation-rules.model"

describe('ClaimEvaluationRulesService', () => {
  let injector: TestBed;
  let service: ClaimEvaluationRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimEvaluationRulesService]
    });
    injector = getTestBed();
    service = injector.get(ClaimEvaluationRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimEvaluationRuleses', () => {
    it('should return an Promise<ClaimEvaluationRules[]>', () => {
      const claimEvaluationRules = [
       {seqCerulId:1234, primaryMatch:'sample data', provider:'sample data', procedureCode:'sample data', benefitPackage:'sample data', medicalDefinitions:'sample data', timeframe:'sample data', timeUnits:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCerulId:1234, primaryMatch:'sample data', provider:'sample data', procedureCode:'sample data', benefitPackage:'sample data', medicalDefinitions:'sample data', timeframe:'sample data', timeUnits:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCerulId:1234, primaryMatch:'sample data', provider:'sample data', procedureCode:'sample data', benefitPackage:'sample data', medicalDefinitions:'sample data', timeframe:'sample data', timeUnits:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getClaimEvaluationRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimevaluationruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimEvaluationRules);
    });
  });


  describe('#createClaimEvaluationRules', () => {
    var id = 1;
    it('should return an Promise<ClaimEvaluationRules>', () => {
      const claimEvaluationRules: ClaimEvaluationRules = {seqCerulId:1234, primaryMatch:'sample data', provider:'sample data', procedureCode:'sample data', benefitPackage:'sample data', medicalDefinitions:'sample data', timeframe:'sample data', timeUnits:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createClaimEvaluationRules(claimEvaluationRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimevaluationruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimEvaluationRules', () => {
    var id = 1;
    it('should return an Promise<ClaimEvaluationRules>', () => {
      const claimEvaluationRules: ClaimEvaluationRules = {seqCerulId:1234, primaryMatch:'sample data', provider:'sample data', procedureCode:'sample data', benefitPackage:'sample data', medicalDefinitions:'sample data', timeframe:'sample data', timeUnits:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateClaimEvaluationRules(claimEvaluationRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimevaluationruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimEvaluationRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimEvaluationRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimevaluationruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});