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

import { ProvEnrollmentRulesService } from './prov-enrollment-rules.service';
import { ProvEnrollmentRules } from '../api-models/prov-enrollment-rules.model'
import { ProvEnrollmentRuleses } from "../api-models/testing/fake-prov-enrollment-rules.model"

describe('ProvEnrollmentRulesService', () => {
  let injector: TestBed;
  let service: ProvEnrollmentRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvEnrollmentRulesService]
    });
    injector = getTestBed();
    service = injector.get(ProvEnrollmentRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvEnrollmentRuleses', () => {
    it('should return an Promise<ProvEnrollmentRules[]>', () => {
      const provEnrollmentRules = [
       {seqEnrollmentRule:1234, seqProvId:1234, lineOfBusiness:'sample data', seqProvAddress:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasonCode:'sample data', acceptNewPatients:'sample data', acceptExistingPatients:'sample data', acceptedGender:'sample data', acceptedAgeFrom:1234, acceptedAgeTo:1234, enrollmentLimitCnt:1234, currentEnrollmentCnt:1234, overrideGenderFlag:'sample data', overrideAgeFlag:'sample data', overrideAccptNewPatFlag:'sample data', overrideEnrlLimitFlag:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', ipaId:'sample data', panelId:'sample data', availForAutoAssign:'sample data', userDefined1:'sample data', userDefined2:'sample data', pcpaaDatetime:'2018-01-01', userDate1:'2018-01-01', userDate2:'2018-01-01'},
       {seqEnrollmentRule:1234, seqProvId:1234, lineOfBusiness:'sample data', seqProvAddress:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasonCode:'sample data', acceptNewPatients:'sample data', acceptExistingPatients:'sample data', acceptedGender:'sample data', acceptedAgeFrom:1234, acceptedAgeTo:1234, enrollmentLimitCnt:1234, currentEnrollmentCnt:1234, overrideGenderFlag:'sample data', overrideAgeFlag:'sample data', overrideAccptNewPatFlag:'sample data', overrideEnrlLimitFlag:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', ipaId:'sample data', panelId:'sample data', availForAutoAssign:'sample data', userDefined1:'sample data', userDefined2:'sample data', pcpaaDatetime:'2018-01-01', userDate1:'2018-01-01', userDate2:'2018-01-01'},
       {seqEnrollmentRule:1234, seqProvId:1234, lineOfBusiness:'sample data', seqProvAddress:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasonCode:'sample data', acceptNewPatients:'sample data', acceptExistingPatients:'sample data', acceptedGender:'sample data', acceptedAgeFrom:1234, acceptedAgeTo:1234, enrollmentLimitCnt:1234, currentEnrollmentCnt:1234, overrideGenderFlag:'sample data', overrideAgeFlag:'sample data', overrideAccptNewPatFlag:'sample data', overrideEnrlLimitFlag:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', ipaId:'sample data', panelId:'sample data', availForAutoAssign:'sample data', userDefined1:'sample data', userDefined2:'sample data', pcpaaDatetime:'2018-01-01', userDate1:'2018-01-01', userDate2:'2018-01-01'}

      ];
      service.getProvEnrollmentRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provenrollmentruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provEnrollmentRules);
    });
  });


  describe('#createProvEnrollmentRules', () => {
    var id = 1;
    it('should return an Promise<ProvEnrollmentRules>', () => {
      const provEnrollmentRules: ProvEnrollmentRules = {seqEnrollmentRule:1234, seqProvId:1234, lineOfBusiness:'sample data', seqProvAddress:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasonCode:'sample data', acceptNewPatients:'sample data', acceptExistingPatients:'sample data', acceptedGender:'sample data', acceptedAgeFrom:1234, acceptedAgeTo:1234, enrollmentLimitCnt:1234, currentEnrollmentCnt:1234, overrideGenderFlag:'sample data', overrideAgeFlag:'sample data', overrideAccptNewPatFlag:'sample data', overrideEnrlLimitFlag:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', ipaId:'sample data', panelId:'sample data', availForAutoAssign:'sample data', userDefined1:'sample data', userDefined2:'sample data', pcpaaDatetime:'2018-01-01', userDate1:'2018-01-01', userDate2:'2018-01-01'};
      service.createProvEnrollmentRules(provEnrollmentRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provenrollmentruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvEnrollmentRules', () => {
    var id = 1;
    it('should return an Promise<ProvEnrollmentRules>', () => {
      const provEnrollmentRules: ProvEnrollmentRules = {seqEnrollmentRule:1234, seqProvId:1234, lineOfBusiness:'sample data', seqProvAddress:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasonCode:'sample data', acceptNewPatients:'sample data', acceptExistingPatients:'sample data', acceptedGender:'sample data', acceptedAgeFrom:1234, acceptedAgeTo:1234, enrollmentLimitCnt:1234, currentEnrollmentCnt:1234, overrideGenderFlag:'sample data', overrideAgeFlag:'sample data', overrideAccptNewPatFlag:'sample data', overrideEnrlLimitFlag:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', ipaId:'sample data', panelId:'sample data', availForAutoAssign:'sample data', userDefined1:'sample data', userDefined2:'sample data', pcpaaDatetime:'2018-01-01', userDate1:'2018-01-01', userDate2:'2018-01-01'};
      service.updateProvEnrollmentRules(provEnrollmentRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provenrollmentruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvEnrollmentRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvEnrollmentRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provenrollmentruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});