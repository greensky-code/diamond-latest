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

import { ProfsvcClaimDetailEdiWService } from './profsvc-claim-detail-edi-w.service';
import { ProfsvcClaimDetailEdiW } from '../api-models/profsvc-claim-detail-edi-w.model'
import { ProfsvcClaimDetailEdiWs } from "../api-models/testing/fake-profsvc-claim-detail-edi-w.model"

describe('ProfsvcClaimDetailEdiWService', () => {
  let injector: TestBed;
  let service: ProfsvcClaimDetailEdiWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcClaimDetailEdiWService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcClaimDetailEdiWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcClaimDetailEdiWs', () => {
    it('should return an Promise<ProfsvcClaimDetailEdiW[]>', () => {
      const profsvcClaimDetailEdiW = [
       {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', typeOfService:'sample data', originalClaimNumber:'sample data', ediStatus:'sample data', recInd:'sample data', svcToDate:'2018-01-01', placeOfService:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', withholdSurplus:1234, epsdt:'sample data', familyPlanningIndicator:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', typeOfService:'sample data', originalClaimNumber:'sample data', ediStatus:'sample data', recInd:'sample data', svcToDate:'2018-01-01', placeOfService:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', withholdSurplus:1234, epsdt:'sample data', familyPlanningIndicator:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', typeOfService:'sample data', originalClaimNumber:'sample data', ediStatus:'sample data', recInd:'sample data', svcToDate:'2018-01-01', placeOfService:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', withholdSurplus:1234, epsdt:'sample data', familyPlanningIndicator:'sample data'}

      ];
      service.getProfsvcClaimDetailEdiWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailediws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcClaimDetailEdiW);
    });
  });


  describe('#createProfsvcClaimDetailEdiW', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimDetailEdiW>', () => {
      const profsvcClaimDetailEdiW: ProfsvcClaimDetailEdiW = {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', typeOfService:'sample data', originalClaimNumber:'sample data', ediStatus:'sample data', recInd:'sample data', svcToDate:'2018-01-01', placeOfService:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', withholdSurplus:1234, epsdt:'sample data', familyPlanningIndicator:'sample data'};
      service.createProfsvcClaimDetailEdiW(profsvcClaimDetailEdiW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailediws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcClaimDetailEdiW', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimDetailEdiW>', () => {
      const profsvcClaimDetailEdiW: ProfsvcClaimDetailEdiW = {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', typeOfService:'sample data', originalClaimNumber:'sample data', ediStatus:'sample data', recInd:'sample data', svcToDate:'2018-01-01', placeOfService:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', withholdSurplus:1234, epsdt:'sample data', familyPlanningIndicator:'sample data'};
      service.updateProfsvcClaimDetailEdiW(profsvcClaimDetailEdiW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailediws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcClaimDetailEdiW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcClaimDetailEdiW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailediws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});