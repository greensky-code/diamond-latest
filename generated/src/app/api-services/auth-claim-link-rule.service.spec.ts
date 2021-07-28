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

import { AuthClaimLinkRuleService } from './auth-claim-link-rule.service';
import { AuthClaimLinkRule } from '../api-models/auth-claim-link-rule.model'
import { AuthClaimLinkRules } from "../api-models/testing/fake-auth-claim-link-rule.model"

describe('AuthClaimLinkRuleService', () => {
  let injector: TestBed;
  let service: AuthClaimLinkRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthClaimLinkRuleService]
    });
    injector = getTestBed();
    service = injector.get(AuthClaimLinkRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthClaimLinkRules', () => {
    it('should return an Promise<AuthClaimLinkRule[]>', () => {
      const authClaimLinkRule = [
       {lineOfBusiness:'sample data', seqAuthType:1234, authClosedStatus:'sample data', authClosedReason:'sample data', authNewStatus:'sample data', authNewReason:'sample data', authHeldStatus:'sample data', authHeldReason:'sample data', authDeniedStatus:'sample data', authDeniedReason:'sample data', authExpiredStatus:'sample data', authExpiredReason:'sample data', authQuantityExceededStatus:'sample data', authQuantityExceededReason:'sample data', authCostExceededStatus:'sample data', authCostExceededReason:'sample data', authDateStatus:'sample data', authDateReason:'sample data', authSecOpReqStatus:'sample data', authSecOpReqReason:'sample data', authGroupPlanStatus:'sample data', authGroupPlanReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {lineOfBusiness:'sample data', seqAuthType:1234, authClosedStatus:'sample data', authClosedReason:'sample data', authNewStatus:'sample data', authNewReason:'sample data', authHeldStatus:'sample data', authHeldReason:'sample data', authDeniedStatus:'sample data', authDeniedReason:'sample data', authExpiredStatus:'sample data', authExpiredReason:'sample data', authQuantityExceededStatus:'sample data', authQuantityExceededReason:'sample data', authCostExceededStatus:'sample data', authCostExceededReason:'sample data', authDateStatus:'sample data', authDateReason:'sample data', authSecOpReqStatus:'sample data', authSecOpReqReason:'sample data', authGroupPlanStatus:'sample data', authGroupPlanReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {lineOfBusiness:'sample data', seqAuthType:1234, authClosedStatus:'sample data', authClosedReason:'sample data', authNewStatus:'sample data', authNewReason:'sample data', authHeldStatus:'sample data', authHeldReason:'sample data', authDeniedStatus:'sample data', authDeniedReason:'sample data', authExpiredStatus:'sample data', authExpiredReason:'sample data', authQuantityExceededStatus:'sample data', authQuantityExceededReason:'sample data', authCostExceededStatus:'sample data', authCostExceededReason:'sample data', authDateStatus:'sample data', authDateReason:'sample data', authSecOpReqStatus:'sample data', authSecOpReqReason:'sample data', authGroupPlanStatus:'sample data', authGroupPlanReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthClaimLinkRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimlinkrules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authClaimLinkRule);
    });
  });


  describe('#createAuthClaimLinkRule', () => {
    var id = 1;
    it('should return an Promise<AuthClaimLinkRule>', () => {
      const authClaimLinkRule: AuthClaimLinkRule = {lineOfBusiness:'sample data', seqAuthType:1234, authClosedStatus:'sample data', authClosedReason:'sample data', authNewStatus:'sample data', authNewReason:'sample data', authHeldStatus:'sample data', authHeldReason:'sample data', authDeniedStatus:'sample data', authDeniedReason:'sample data', authExpiredStatus:'sample data', authExpiredReason:'sample data', authQuantityExceededStatus:'sample data', authQuantityExceededReason:'sample data', authCostExceededStatus:'sample data', authCostExceededReason:'sample data', authDateStatus:'sample data', authDateReason:'sample data', authSecOpReqStatus:'sample data', authSecOpReqReason:'sample data', authGroupPlanStatus:'sample data', authGroupPlanReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthClaimLinkRule(authClaimLinkRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimlinkrules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthClaimLinkRule', () => {
    var id = 1;
    it('should return an Promise<AuthClaimLinkRule>', () => {
      const authClaimLinkRule: AuthClaimLinkRule = {lineOfBusiness:'sample data', seqAuthType:1234, authClosedStatus:'sample data', authClosedReason:'sample data', authNewStatus:'sample data', authNewReason:'sample data', authHeldStatus:'sample data', authHeldReason:'sample data', authDeniedStatus:'sample data', authDeniedReason:'sample data', authExpiredStatus:'sample data', authExpiredReason:'sample data', authQuantityExceededStatus:'sample data', authQuantityExceededReason:'sample data', authCostExceededStatus:'sample data', authCostExceededReason:'sample data', authDateStatus:'sample data', authDateReason:'sample data', authSecOpReqStatus:'sample data', authSecOpReqReason:'sample data', authGroupPlanStatus:'sample data', authGroupPlanReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthClaimLinkRule(authClaimLinkRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimlinkrules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthClaimLinkRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthClaimLinkRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimlinkrules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});