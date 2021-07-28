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

import { AuthClaimMatchRulesService } from './auth-claim-match-rules.service';
import { AuthClaimMatchRules } from '../api-models/auth-claim-match-rules.model'
import { AuthClaimMatchRuleses } from "../api-models/testing/fake-auth-claim-match-rules.model"

describe('AuthClaimMatchRulesService', () => {
  let injector: TestBed;
  let service: AuthClaimMatchRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthClaimMatchRulesService]
    });
    injector = getTestBed();
    service = injector.get(AuthClaimMatchRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthClaimMatchRuleses', () => {
    it('should return an Promise<AuthClaimMatchRules[]>', () => {
      const authClaimMatchRules = [
       {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, authStatus:'sample data', authLevel:'sample data', description:'sample data', providerUsed:'sample data', primaryDosUsed:'sample data', authBeginDaysBefore:1234, thruDosUsed:'sample data', authEndDaysAfter:1234, placeServiceUsed:'sample data', facilityIdUsed:'sample data', surgeryProcUsed:'sample data', applyAuthToClaim:'sample data', action:'sample data', reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authNumberMatch:'sample data', authPlaceServiceUsed:'sample data', claimPlaceServiceUsed:'sample data', exactPlaceServiceUsed:'sample data', diagnosisUsed:'sample data', matchFirstDigits:1234, vendorIdUsed:'sample data', primarySpecialtyUsed:'sample data', diamondIdUsed:'sample data'},
       {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, authStatus:'sample data', authLevel:'sample data', description:'sample data', providerUsed:'sample data', primaryDosUsed:'sample data', authBeginDaysBefore:1234, thruDosUsed:'sample data', authEndDaysAfter:1234, placeServiceUsed:'sample data', facilityIdUsed:'sample data', surgeryProcUsed:'sample data', applyAuthToClaim:'sample data', action:'sample data', reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authNumberMatch:'sample data', authPlaceServiceUsed:'sample data', claimPlaceServiceUsed:'sample data', exactPlaceServiceUsed:'sample data', diagnosisUsed:'sample data', matchFirstDigits:1234, vendorIdUsed:'sample data', primarySpecialtyUsed:'sample data', diamondIdUsed:'sample data'},
       {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, authStatus:'sample data', authLevel:'sample data', description:'sample data', providerUsed:'sample data', primaryDosUsed:'sample data', authBeginDaysBefore:1234, thruDosUsed:'sample data', authEndDaysAfter:1234, placeServiceUsed:'sample data', facilityIdUsed:'sample data', surgeryProcUsed:'sample data', applyAuthToClaim:'sample data', action:'sample data', reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authNumberMatch:'sample data', authPlaceServiceUsed:'sample data', claimPlaceServiceUsed:'sample data', exactPlaceServiceUsed:'sample data', diagnosisUsed:'sample data', matchFirstDigits:1234, vendorIdUsed:'sample data', primarySpecialtyUsed:'sample data', diamondIdUsed:'sample data'}

      ];
      service.getAuthClaimMatchRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimmatchruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authClaimMatchRules);
    });
  });


  describe('#createAuthClaimMatchRules', () => {
    var id = 1;
    it('should return an Promise<AuthClaimMatchRules>', () => {
      const authClaimMatchRules: AuthClaimMatchRules = {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, authStatus:'sample data', authLevel:'sample data', description:'sample data', providerUsed:'sample data', primaryDosUsed:'sample data', authBeginDaysBefore:1234, thruDosUsed:'sample data', authEndDaysAfter:1234, placeServiceUsed:'sample data', facilityIdUsed:'sample data', surgeryProcUsed:'sample data', applyAuthToClaim:'sample data', action:'sample data', reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authNumberMatch:'sample data', authPlaceServiceUsed:'sample data', claimPlaceServiceUsed:'sample data', exactPlaceServiceUsed:'sample data', diagnosisUsed:'sample data', matchFirstDigits:1234, vendorIdUsed:'sample data', primarySpecialtyUsed:'sample data', diamondIdUsed:'sample data'};
      service.createAuthClaimMatchRules(authClaimMatchRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimmatchruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthClaimMatchRules', () => {
    var id = 1;
    it('should return an Promise<AuthClaimMatchRules>', () => {
      const authClaimMatchRules: AuthClaimMatchRules = {lineOfBusiness:'sample data', claimType:'sample data', matchOrder:1234, authStatus:'sample data', authLevel:'sample data', description:'sample data', providerUsed:'sample data', primaryDosUsed:'sample data', authBeginDaysBefore:1234, thruDosUsed:'sample data', authEndDaysAfter:1234, placeServiceUsed:'sample data', facilityIdUsed:'sample data', surgeryProcUsed:'sample data', applyAuthToClaim:'sample data', action:'sample data', reasonCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authNumberMatch:'sample data', authPlaceServiceUsed:'sample data', claimPlaceServiceUsed:'sample data', exactPlaceServiceUsed:'sample data', diagnosisUsed:'sample data', matchFirstDigits:1234, vendorIdUsed:'sample data', primarySpecialtyUsed:'sample data', diamondIdUsed:'sample data'};
      service.updateAuthClaimMatchRules(authClaimMatchRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimmatchruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthClaimMatchRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthClaimMatchRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authclaimmatchruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});