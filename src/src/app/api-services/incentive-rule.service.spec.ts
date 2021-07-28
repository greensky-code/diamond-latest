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

import { IncentiveRuleService } from './incentive-rule.service';
import { IncentiveRule } from '../api-models/incentive-rule.model'
import { IncentiveRules } from "../api-models/testing/fake-incentive-rule.model"

describe('IncentiveRuleService', () => {
  let injector: TestBed;
  let service: IncentiveRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IncentiveRuleService]
    });
    injector = getTestBed();
    service = injector.get(IncentiveRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIncentiveRules', () => {
    it('should return an Promise<IncentiveRule[]>', () => {
      const incentiveRule = [
       {seqIncentiveRule:1234, ruleId:'sample data', description:'sample data', lineOfBusiness:'sample data', ipaId:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', accessProgramFlag:'sample data', accessIncentiveAmount:1234, accessCapApply:'sample data', accessIncentivePercent:1234, accessMinMembersFlag:'sample data', accessMinMembersNumber:1234, accessTotEnrlInLimits:'sample data', accessLobEnrlInLimits:'sample data', accessLobAcceptsNewMember:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIncentiveRule:1234, ruleId:'sample data', description:'sample data', lineOfBusiness:'sample data', ipaId:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', accessProgramFlag:'sample data', accessIncentiveAmount:1234, accessCapApply:'sample data', accessIncentivePercent:1234, accessMinMembersFlag:'sample data', accessMinMembersNumber:1234, accessTotEnrlInLimits:'sample data', accessLobEnrlInLimits:'sample data', accessLobAcceptsNewMember:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIncentiveRule:1234, ruleId:'sample data', description:'sample data', lineOfBusiness:'sample data', ipaId:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', accessProgramFlag:'sample data', accessIncentiveAmount:1234, accessCapApply:'sample data', accessIncentivePercent:1234, accessMinMembersFlag:'sample data', accessMinMembersNumber:1234, accessTotEnrlInLimits:'sample data', accessLobEnrlInLimits:'sample data', accessLobAcceptsNewMember:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getIncentiveRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/incentiverules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(incentiveRule);
    });
  });


  describe('#createIncentiveRule', () => {
    var id = 1;
    it('should return an Promise<IncentiveRule>', () => {
      const incentiveRule: IncentiveRule = {seqIncentiveRule:1234, ruleId:'sample data', description:'sample data', lineOfBusiness:'sample data', ipaId:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', accessProgramFlag:'sample data', accessIncentiveAmount:1234, accessCapApply:'sample data', accessIncentivePercent:1234, accessMinMembersFlag:'sample data', accessMinMembersNumber:1234, accessTotEnrlInLimits:'sample data', accessLobEnrlInLimits:'sample data', accessLobAcceptsNewMember:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createIncentiveRule(incentiveRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/incentiverules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIncentiveRule', () => {
    var id = 1;
    it('should return an Promise<IncentiveRule>', () => {
      const incentiveRule: IncentiveRule = {seqIncentiveRule:1234, ruleId:'sample data', description:'sample data', lineOfBusiness:'sample data', ipaId:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', accessProgramFlag:'sample data', accessIncentiveAmount:1234, accessCapApply:'sample data', accessIncentivePercent:1234, accessMinMembersFlag:'sample data', accessMinMembersNumber:1234, accessTotEnrlInLimits:'sample data', accessLobEnrlInLimits:'sample data', accessLobAcceptsNewMember:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateIncentiveRule(incentiveRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/incentiverules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIncentiveRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIncentiveRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/incentiverules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});