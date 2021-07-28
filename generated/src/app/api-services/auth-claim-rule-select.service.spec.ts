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

import { AuthClaimRuleSelectService } from './auth-claim-rule-select.service';
import { AuthClaimRuleSelect } from '../api-models/auth-claim-rule-select.model'
import { AuthClaimRuleSelects } from "../api-models/testing/fake-auth-claim-rule-select.model"

describe('AuthClaimRuleSelectService', () => {
  let injector: TestBed;
  let service: AuthClaimRuleSelectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthClaimRuleSelectService]
    });
    injector = getTestBed();
    service = injector.get(AuthClaimRuleSelectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthClaimRuleSelects', () => {
    it('should return an Promise<AuthClaimRuleSelect[]>', () => {
      const authClaimRuleSelect = [
       {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, seqRuleId:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, seqRuleId:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, seqRuleId:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthClaimRuleSelects().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimruleselects/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authClaimRuleSelect);
    });
  });


  describe('#createAuthClaimRuleSelect', () => {
    var id = 1;
    it('should return an Promise<AuthClaimRuleSelect>', () => {
      const authClaimRuleSelect: AuthClaimRuleSelect = {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, seqRuleId:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthClaimRuleSelect(authClaimRuleSelect).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimruleselects`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthClaimRuleSelect', () => {
    var id = 1;
    it('should return an Promise<AuthClaimRuleSelect>', () => {
      const authClaimRuleSelect: AuthClaimRuleSelect = {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, seqRuleId:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthClaimRuleSelect(authClaimRuleSelect, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimruleselects/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthClaimRuleSelect', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthClaimRuleSelect(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimruleselects/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});