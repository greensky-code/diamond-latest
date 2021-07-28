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

import { ClaimsDuplicateRuleService } from './claims-duplicate-rule.service';
import { ClaimsDuplicateRule } from '../api-models/claims-duplicate-rule.model'
import { ClaimsDuplicateRules } from "../api-models/testing/fake-claims-duplicate-rule.model"

describe('ClaimsDuplicateRuleService', () => {
  let injector: TestBed;
  let service: ClaimsDuplicateRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimsDuplicateRuleService]
    });
    injector = getTestBed();
    service = injector.get(ClaimsDuplicateRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimsDuplicateRules', () => {
    it('should return an Promise<ClaimsDuplicateRule[]>', () => {
      const claimsDuplicateRule = [
       {claimDupRule:'sample data', claimType:'sample data', description:'sample data', primDtUsed1:'sample data', primDtDaysBef1:1234, primDtDaysAft1:1234, sameSrvProv1:'sample data', sameTotBill1:'sample data', samePlcServ1:'sample data', specDateUsed1:'sample data', specDtDaysBef1:1234, specDtDaysAft1:1234, sameBillAmt1:'sample data', sameProcCode1:'sample data', sameMedDef1:'sample data', action1:'sample data', reasonCode1:'sample data', primDtUsed2:'sample data', primDtDaysBef2:1234, primDtDaysAft2:1234, sameSrvProv2:'sample data', sameTotBill2:'sample data', samePlcServ2:'sample data', specDateUsed2:'sample data', specDtDaysBef2:1234, specDtDaysAft2:1234, sameBillAmt2:'sample data', sameProcCode2:'sample data', sameMedDef2:'sample data', action2:'sample data', reasonCode2:'sample data', primDtUsed3:'sample data', primDtDaysBef3:1234, primDtDaysAft3:1234, sameSrvProv3:'sample data', sameTotBill3:'sample data', samePlcServ3:'sample data', specDateUsed3:'sample data', specDtDaysBef3:1234, specDtDaysAft3:1234, sameBillAmt3:'sample data', sameProcCode3:'sample data', sameMedDef3:'sample data', action3:'sample data', reasonCode3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sameProcMod1:'sample data', sameProcMod2:'sample data', sameProcMod3:'sample data', sameTooth1:'sample data', sameTooth2:'sample data', sameTooth3:'sample data'},
       {claimDupRule:'sample data', claimType:'sample data', description:'sample data', primDtUsed1:'sample data', primDtDaysBef1:1234, primDtDaysAft1:1234, sameSrvProv1:'sample data', sameTotBill1:'sample data', samePlcServ1:'sample data', specDateUsed1:'sample data', specDtDaysBef1:1234, specDtDaysAft1:1234, sameBillAmt1:'sample data', sameProcCode1:'sample data', sameMedDef1:'sample data', action1:'sample data', reasonCode1:'sample data', primDtUsed2:'sample data', primDtDaysBef2:1234, primDtDaysAft2:1234, sameSrvProv2:'sample data', sameTotBill2:'sample data', samePlcServ2:'sample data', specDateUsed2:'sample data', specDtDaysBef2:1234, specDtDaysAft2:1234, sameBillAmt2:'sample data', sameProcCode2:'sample data', sameMedDef2:'sample data', action2:'sample data', reasonCode2:'sample data', primDtUsed3:'sample data', primDtDaysBef3:1234, primDtDaysAft3:1234, sameSrvProv3:'sample data', sameTotBill3:'sample data', samePlcServ3:'sample data', specDateUsed3:'sample data', specDtDaysBef3:1234, specDtDaysAft3:1234, sameBillAmt3:'sample data', sameProcCode3:'sample data', sameMedDef3:'sample data', action3:'sample data', reasonCode3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sameProcMod1:'sample data', sameProcMod2:'sample data', sameProcMod3:'sample data', sameTooth1:'sample data', sameTooth2:'sample data', sameTooth3:'sample data'},
       {claimDupRule:'sample data', claimType:'sample data', description:'sample data', primDtUsed1:'sample data', primDtDaysBef1:1234, primDtDaysAft1:1234, sameSrvProv1:'sample data', sameTotBill1:'sample data', samePlcServ1:'sample data', specDateUsed1:'sample data', specDtDaysBef1:1234, specDtDaysAft1:1234, sameBillAmt1:'sample data', sameProcCode1:'sample data', sameMedDef1:'sample data', action1:'sample data', reasonCode1:'sample data', primDtUsed2:'sample data', primDtDaysBef2:1234, primDtDaysAft2:1234, sameSrvProv2:'sample data', sameTotBill2:'sample data', samePlcServ2:'sample data', specDateUsed2:'sample data', specDtDaysBef2:1234, specDtDaysAft2:1234, sameBillAmt2:'sample data', sameProcCode2:'sample data', sameMedDef2:'sample data', action2:'sample data', reasonCode2:'sample data', primDtUsed3:'sample data', primDtDaysBef3:1234, primDtDaysAft3:1234, sameSrvProv3:'sample data', sameTotBill3:'sample data', samePlcServ3:'sample data', specDateUsed3:'sample data', specDtDaysBef3:1234, specDtDaysAft3:1234, sameBillAmt3:'sample data', sameProcCode3:'sample data', sameMedDef3:'sample data', action3:'sample data', reasonCode3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sameProcMod1:'sample data', sameProcMod2:'sample data', sameProcMod3:'sample data', sameTooth1:'sample data', sameTooth2:'sample data', sameTooth3:'sample data'}

      ];
      service.getClaimsDuplicateRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimsduplicaterules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimsDuplicateRule);
    });
  });


  describe('#createClaimsDuplicateRule', () => {
    var id = 1;
    it('should return an Promise<ClaimsDuplicateRule>', () => {
      const claimsDuplicateRule: ClaimsDuplicateRule = {claimDupRule:'sample data', claimType:'sample data', description:'sample data', primDtUsed1:'sample data', primDtDaysBef1:1234, primDtDaysAft1:1234, sameSrvProv1:'sample data', sameTotBill1:'sample data', samePlcServ1:'sample data', specDateUsed1:'sample data', specDtDaysBef1:1234, specDtDaysAft1:1234, sameBillAmt1:'sample data', sameProcCode1:'sample data', sameMedDef1:'sample data', action1:'sample data', reasonCode1:'sample data', primDtUsed2:'sample data', primDtDaysBef2:1234, primDtDaysAft2:1234, sameSrvProv2:'sample data', sameTotBill2:'sample data', samePlcServ2:'sample data', specDateUsed2:'sample data', specDtDaysBef2:1234, specDtDaysAft2:1234, sameBillAmt2:'sample data', sameProcCode2:'sample data', sameMedDef2:'sample data', action2:'sample data', reasonCode2:'sample data', primDtUsed3:'sample data', primDtDaysBef3:1234, primDtDaysAft3:1234, sameSrvProv3:'sample data', sameTotBill3:'sample data', samePlcServ3:'sample data', specDateUsed3:'sample data', specDtDaysBef3:1234, specDtDaysAft3:1234, sameBillAmt3:'sample data', sameProcCode3:'sample data', sameMedDef3:'sample data', action3:'sample data', reasonCode3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sameProcMod1:'sample data', sameProcMod2:'sample data', sameProcMod3:'sample data', sameTooth1:'sample data', sameTooth2:'sample data', sameTooth3:'sample data'};
      service.createClaimsDuplicateRule(claimsDuplicateRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimsduplicaterules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimsDuplicateRule', () => {
    var id = 1;
    it('should return an Promise<ClaimsDuplicateRule>', () => {
      const claimsDuplicateRule: ClaimsDuplicateRule = {claimDupRule:'sample data', claimType:'sample data', description:'sample data', primDtUsed1:'sample data', primDtDaysBef1:1234, primDtDaysAft1:1234, sameSrvProv1:'sample data', sameTotBill1:'sample data', samePlcServ1:'sample data', specDateUsed1:'sample data', specDtDaysBef1:1234, specDtDaysAft1:1234, sameBillAmt1:'sample data', sameProcCode1:'sample data', sameMedDef1:'sample data', action1:'sample data', reasonCode1:'sample data', primDtUsed2:'sample data', primDtDaysBef2:1234, primDtDaysAft2:1234, sameSrvProv2:'sample data', sameTotBill2:'sample data', samePlcServ2:'sample data', specDateUsed2:'sample data', specDtDaysBef2:1234, specDtDaysAft2:1234, sameBillAmt2:'sample data', sameProcCode2:'sample data', sameMedDef2:'sample data', action2:'sample data', reasonCode2:'sample data', primDtUsed3:'sample data', primDtDaysBef3:1234, primDtDaysAft3:1234, sameSrvProv3:'sample data', sameTotBill3:'sample data', samePlcServ3:'sample data', specDateUsed3:'sample data', specDtDaysBef3:1234, specDtDaysAft3:1234, sameBillAmt3:'sample data', sameProcCode3:'sample data', sameMedDef3:'sample data', action3:'sample data', reasonCode3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sameProcMod1:'sample data', sameProcMod2:'sample data', sameProcMod3:'sample data', sameTooth1:'sample data', sameTooth2:'sample data', sameTooth3:'sample data'};
      service.updateClaimsDuplicateRule(claimsDuplicateRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimsduplicaterules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimsDuplicateRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimsDuplicateRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimsduplicaterules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});