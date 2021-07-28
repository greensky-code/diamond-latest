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

import { MemberOtherCoverageService } from './member-other-coverage.service';
import { MemberOtherCoverage } from '../api-models/member-other-coverage.model'
import { MemberOtherCoverages } from "../api-models/testing/fake-member-other-coverage.model"

describe('MemberOtherCoverageService', () => {
  let injector: TestBed;
  let service: MemberOtherCoverageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberOtherCoverageService]
    });
    injector = getTestBed();
    service = injector.get(MemberOtherCoverageService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberOtherCoverages', () => {
    it('should return an Promise<MemberOtherCoverage[]>', () => {
      const memberOtherCoverage = [
       {seqMembOthCov:1234, seqMembId:1234, seqSubsId:1234, carrierCode:'sample data', coverageEffecDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', policyNumber:'sample data', cobCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherFamCoverage:'sample data', personNumber1:'sample data', personNumber2:'sample data', personNumber3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', entitlementCode:'sample data', verifOthCarrierDate:'2018-01-01', verifStatusCode:'sample data', verifSourceLastName:'sample data', verifSourceFirstName:'sample data', verifSourcePhoneNo:'sample data', comments:'sample data', coverageTypeCode:'sample data', employerGroup:'sample data', planTypeCode:'sample data', productType:'sample data', othCarrierSubsId:'sample data', othCarrierSubsLastName:'sample data', othCarrierSubsFirstName:'sample data', othCarrierSubsDob:'2018-01-01', othCarrierSubsGender:'sample data', relationshipCode:'sample data', othCarrierCobFlag:'sample data', depDetermRuleCode:'sample data', secDepDetermRuleCode:'sample data', paymentPolicyCode:'sample data', preCertReqdFlag:'sample data', caseNumber:'sample data', diagnosisCode:'sample data', statusCode:'sample data', facility:'sample data', eventDate1:'2018-01-01', eventDate1TypeCode:'sample data', eventDate2:'2018-01-01', eventDate2TypeCode:'sample data', eventDate3:'2018-01-01', eventDate3TypeCode:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', workingAgedStatus:'sample data', cobhsUserDate1:'2018-01-01', cobhsUserDate2:'2018-01-01'},
       {seqMembOthCov:1234, seqMembId:1234, seqSubsId:1234, carrierCode:'sample data', coverageEffecDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', policyNumber:'sample data', cobCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherFamCoverage:'sample data', personNumber1:'sample data', personNumber2:'sample data', personNumber3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', entitlementCode:'sample data', verifOthCarrierDate:'2018-01-01', verifStatusCode:'sample data', verifSourceLastName:'sample data', verifSourceFirstName:'sample data', verifSourcePhoneNo:'sample data', comments:'sample data', coverageTypeCode:'sample data', employerGroup:'sample data', planTypeCode:'sample data', productType:'sample data', othCarrierSubsId:'sample data', othCarrierSubsLastName:'sample data', othCarrierSubsFirstName:'sample data', othCarrierSubsDob:'2018-01-01', othCarrierSubsGender:'sample data', relationshipCode:'sample data', othCarrierCobFlag:'sample data', depDetermRuleCode:'sample data', secDepDetermRuleCode:'sample data', paymentPolicyCode:'sample data', preCertReqdFlag:'sample data', caseNumber:'sample data', diagnosisCode:'sample data', statusCode:'sample data', facility:'sample data', eventDate1:'2018-01-01', eventDate1TypeCode:'sample data', eventDate2:'2018-01-01', eventDate2TypeCode:'sample data', eventDate3:'2018-01-01', eventDate3TypeCode:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', workingAgedStatus:'sample data', cobhsUserDate1:'2018-01-01', cobhsUserDate2:'2018-01-01'},
       {seqMembOthCov:1234, seqMembId:1234, seqSubsId:1234, carrierCode:'sample data', coverageEffecDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', policyNumber:'sample data', cobCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherFamCoverage:'sample data', personNumber1:'sample data', personNumber2:'sample data', personNumber3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', entitlementCode:'sample data', verifOthCarrierDate:'2018-01-01', verifStatusCode:'sample data', verifSourceLastName:'sample data', verifSourceFirstName:'sample data', verifSourcePhoneNo:'sample data', comments:'sample data', coverageTypeCode:'sample data', employerGroup:'sample data', planTypeCode:'sample data', productType:'sample data', othCarrierSubsId:'sample data', othCarrierSubsLastName:'sample data', othCarrierSubsFirstName:'sample data', othCarrierSubsDob:'2018-01-01', othCarrierSubsGender:'sample data', relationshipCode:'sample data', othCarrierCobFlag:'sample data', depDetermRuleCode:'sample data', secDepDetermRuleCode:'sample data', paymentPolicyCode:'sample data', preCertReqdFlag:'sample data', caseNumber:'sample data', diagnosisCode:'sample data', statusCode:'sample data', facility:'sample data', eventDate1:'2018-01-01', eventDate1TypeCode:'sample data', eventDate2:'2018-01-01', eventDate2TypeCode:'sample data', eventDate3:'2018-01-01', eventDate3TypeCode:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', workingAgedStatus:'sample data', cobhsUserDate1:'2018-01-01', cobhsUserDate2:'2018-01-01'}

      ];
      service.getMemberOtherCoverages().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/memberothercoverages/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberOtherCoverage);
    });
  });


  describe('#createMemberOtherCoverage', () => {
    var id = 1;
    it('should return an Promise<MemberOtherCoverage>', () => {
      const memberOtherCoverage: MemberOtherCoverage = {seqMembOthCov:1234, seqMembId:1234, seqSubsId:1234, carrierCode:'sample data', coverageEffecDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', policyNumber:'sample data', cobCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherFamCoverage:'sample data', personNumber1:'sample data', personNumber2:'sample data', personNumber3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', entitlementCode:'sample data', verifOthCarrierDate:'2018-01-01', verifStatusCode:'sample data', verifSourceLastName:'sample data', verifSourceFirstName:'sample data', verifSourcePhoneNo:'sample data', comments:'sample data', coverageTypeCode:'sample data', employerGroup:'sample data', planTypeCode:'sample data', productType:'sample data', othCarrierSubsId:'sample data', othCarrierSubsLastName:'sample data', othCarrierSubsFirstName:'sample data', othCarrierSubsDob:'2018-01-01', othCarrierSubsGender:'sample data', relationshipCode:'sample data', othCarrierCobFlag:'sample data', depDetermRuleCode:'sample data', secDepDetermRuleCode:'sample data', paymentPolicyCode:'sample data', preCertReqdFlag:'sample data', caseNumber:'sample data', diagnosisCode:'sample data', statusCode:'sample data', facility:'sample data', eventDate1:'2018-01-01', eventDate1TypeCode:'sample data', eventDate2:'2018-01-01', eventDate2TypeCode:'sample data', eventDate3:'2018-01-01', eventDate3TypeCode:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', workingAgedStatus:'sample data', cobhsUserDate1:'2018-01-01', cobhsUserDate2:'2018-01-01'};
      service.createMemberOtherCoverage(memberOtherCoverage).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberothercoverages`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberOtherCoverage', () => {
    var id = 1;
    it('should return an Promise<MemberOtherCoverage>', () => {
      const memberOtherCoverage: MemberOtherCoverage = {seqMembOthCov:1234, seqMembId:1234, seqSubsId:1234, carrierCode:'sample data', coverageEffecDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', policyNumber:'sample data', cobCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherFamCoverage:'sample data', personNumber1:'sample data', personNumber2:'sample data', personNumber3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', entitlementCode:'sample data', verifOthCarrierDate:'2018-01-01', verifStatusCode:'sample data', verifSourceLastName:'sample data', verifSourceFirstName:'sample data', verifSourcePhoneNo:'sample data', comments:'sample data', coverageTypeCode:'sample data', employerGroup:'sample data', planTypeCode:'sample data', productType:'sample data', othCarrierSubsId:'sample data', othCarrierSubsLastName:'sample data', othCarrierSubsFirstName:'sample data', othCarrierSubsDob:'2018-01-01', othCarrierSubsGender:'sample data', relationshipCode:'sample data', othCarrierCobFlag:'sample data', depDetermRuleCode:'sample data', secDepDetermRuleCode:'sample data', paymentPolicyCode:'sample data', preCertReqdFlag:'sample data', caseNumber:'sample data', diagnosisCode:'sample data', statusCode:'sample data', facility:'sample data', eventDate1:'2018-01-01', eventDate1TypeCode:'sample data', eventDate2:'2018-01-01', eventDate2TypeCode:'sample data', eventDate3:'2018-01-01', eventDate3TypeCode:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', workingAgedStatus:'sample data', cobhsUserDate1:'2018-01-01', cobhsUserDate2:'2018-01-01'};
      service.updateMemberOtherCoverage(memberOtherCoverage, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberothercoverages/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberOtherCoverage', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberOtherCoverage(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberothercoverages/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});