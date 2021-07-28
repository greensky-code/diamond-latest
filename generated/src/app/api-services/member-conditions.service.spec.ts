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

import { MemberConditionsService } from './member-conditions.service';
import { MemberConditions } from '../api-models/member-conditions.model'
import { MemberConditionss } from "../api-models/testing/fake-member-conditions.model"

describe('MemberConditionsService', () => {
  let injector: TestBed;
  let service: MemberConditionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberConditionsService]
    });
    injector = getTestBed();
    service = injector.get(MemberConditionsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberConditionss', () => {
    it('should return an Promise<MemberConditions[]>', () => {
      const memberConditions = [
       {seqMembId:1234, seqMcondId:1234, effectiveDate:'2018-01-01', fromValue:'sample data', diagnosisType:'sample data', conditionType:'sample data', claimAction:'sample data', termDate:'2018-01-01', thruValue:'sample data', claimReason:'sample data', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqMembId:1234, seqMcondId:1234, effectiveDate:'2018-01-01', fromValue:'sample data', diagnosisType:'sample data', conditionType:'sample data', claimAction:'sample data', termDate:'2018-01-01', thruValue:'sample data', claimReason:'sample data', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqMembId:1234, seqMcondId:1234, effectiveDate:'2018-01-01', fromValue:'sample data', diagnosisType:'sample data', conditionType:'sample data', claimAction:'sample data', termDate:'2018-01-01', thruValue:'sample data', claimReason:'sample data', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getMemberConditionss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/memberconditionss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberConditions);
    });
  });


  describe('#createMemberConditions', () => {
    var id = 1;
    it('should return an Promise<MemberConditions>', () => {
      const memberConditions: MemberConditions = {seqMembId:1234, seqMcondId:1234, effectiveDate:'2018-01-01', fromValue:'sample data', diagnosisType:'sample data', conditionType:'sample data', claimAction:'sample data', termDate:'2018-01-01', thruValue:'sample data', claimReason:'sample data', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createMemberConditions(memberConditions).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberconditionss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberConditions', () => {
    var id = 1;
    it('should return an Promise<MemberConditions>', () => {
      const memberConditions: MemberConditions = {seqMembId:1234, seqMcondId:1234, effectiveDate:'2018-01-01', fromValue:'sample data', diagnosisType:'sample data', conditionType:'sample data', claimAction:'sample data', termDate:'2018-01-01', thruValue:'sample data', claimReason:'sample data', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateMemberConditions(memberConditions, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberconditionss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberConditions', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberConditions(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberconditionss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});