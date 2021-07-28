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

import { ClaimBenefitAccumService } from './claim-benefit-accum.service';
import { ClaimBenefitAccum } from '../api-models/claim-benefit-accum.model'
import { ClaimBenefitAccums } from "../api-models/testing/fake-claim-benefit-accum.model"

describe('ClaimBenefitAccumService', () => {
  let injector: TestBed;
  let service: ClaimBenefitAccumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimBenefitAccumService]
    });
    injector = getTestBed();
    service = injector.get(ClaimBenefitAccumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimBenefitAccums', () => {
    it('should return an Promise<ClaimBenefitAccum[]>', () => {
      const claimBenefitAccum = [
       {seqAccumId:1234, seqMembId:1234, seqSubsId:1234, seqGroupId:1234, ruleId:'sample data', benefitPackageId:'sample data', detailSvcDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', claimAmt:1234, claimQty:1234, relationshipCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', fileType:'sample data', admitDate:'2018-01-01', dischargeDate:'2018-01-01', benAccumClaimInd:'sample data', seqBenPackage:1234, weightedQty:1234, seqProvId:1234, compareDates:'sample data', userDefined1:'sample data'},
       {seqAccumId:1234, seqMembId:1234, seqSubsId:1234, seqGroupId:1234, ruleId:'sample data', benefitPackageId:'sample data', detailSvcDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', claimAmt:1234, claimQty:1234, relationshipCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', fileType:'sample data', admitDate:'2018-01-01', dischargeDate:'2018-01-01', benAccumClaimInd:'sample data', seqBenPackage:1234, weightedQty:1234, seqProvId:1234, compareDates:'sample data', userDefined1:'sample data'},
       {seqAccumId:1234, seqMembId:1234, seqSubsId:1234, seqGroupId:1234, ruleId:'sample data', benefitPackageId:'sample data', detailSvcDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', claimAmt:1234, claimQty:1234, relationshipCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', fileType:'sample data', admitDate:'2018-01-01', dischargeDate:'2018-01-01', benAccumClaimInd:'sample data', seqBenPackage:1234, weightedQty:1234, seqProvId:1234, compareDates:'sample data', userDefined1:'sample data'}

      ];
      service.getClaimBenefitAccums().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimbenefitaccums/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimBenefitAccum);
    });
  });


  describe('#createClaimBenefitAccum', () => {
    var id = 1;
    it('should return an Promise<ClaimBenefitAccum>', () => {
      const claimBenefitAccum: ClaimBenefitAccum = {seqAccumId:1234, seqMembId:1234, seqSubsId:1234, seqGroupId:1234, ruleId:'sample data', benefitPackageId:'sample data', detailSvcDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', claimAmt:1234, claimQty:1234, relationshipCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', fileType:'sample data', admitDate:'2018-01-01', dischargeDate:'2018-01-01', benAccumClaimInd:'sample data', seqBenPackage:1234, weightedQty:1234, seqProvId:1234, compareDates:'sample data', userDefined1:'sample data'};
      service.createClaimBenefitAccum(claimBenefitAccum).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimbenefitaccums`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimBenefitAccum', () => {
    var id = 1;
    it('should return an Promise<ClaimBenefitAccum>', () => {
      const claimBenefitAccum: ClaimBenefitAccum = {seqAccumId:1234, seqMembId:1234, seqSubsId:1234, seqGroupId:1234, ruleId:'sample data', benefitPackageId:'sample data', detailSvcDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', claimAmt:1234, claimQty:1234, relationshipCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', fileType:'sample data', admitDate:'2018-01-01', dischargeDate:'2018-01-01', benAccumClaimInd:'sample data', seqBenPackage:1234, weightedQty:1234, seqProvId:1234, compareDates:'sample data', userDefined1:'sample data'};
      service.updateClaimBenefitAccum(claimBenefitAccum, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimbenefitaccums/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimBenefitAccum', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimBenefitAccum(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimbenefitaccums/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});