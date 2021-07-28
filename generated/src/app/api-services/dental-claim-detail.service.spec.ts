/* Copyright (c) 2021 . All Rights Reserved. */

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

import { DentalClaimDetailService } from './dental-claim-detail.service';
import { DentalClaimDetail } from '../api-models/dental-claim-detail.model'
import { DentalClaimDetails } from "../api-models/testing/fake-dental-claim-detail.model"

describe('DentalClaimDetailService', () => {
  let injector: TestBed;
  let service: DentalClaimDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DentalClaimDetailService]
    });
    injector = getTestBed();
    service = injector.get(DentalClaimDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDentalClaimDetails', () => {
    it('should return an Promise<DentalClaimDetail[]>', () => {
      const dentalClaimDetail = [
       {seqMcondId:1234, adminFeeExists:'sample data', evalForAdminFee:'sample data', penUncleanDays:1234, intPenDscRsn:'sample data', penaltyAmt:1234, geoZipRegion:'sample data', seqTfrulId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqIntDsctRuleId:1234, intDscntAdjReason:'sample data', paidNetAmt:1234, deductUncleanDays:1234, uncleanDays:1234, uncleanFlag:'sample data', interestResetDate:'2018-01-01', interestInquiryDate:'2018-01-01', discountAmt:1234, interestAmt:1234, withholdSurplus:1234, bmaReason:'sample data', bmaAmount:1234, printFlagChangeInd:'sample data', auditStatus:'sample data', reservedLocalUseDet:'sample data', placeOfService:'sample data', adjudDate:'2018-01-01', cobPatLiabCvrgAmt:1234, fullCvrgAmt:1234, ocAllowedAmt:1234, primaryPaidAmt:1234, diagCodePointer8:'sample data', diagCodePointer7:'sample data', diagCodePointer6:'sample data', diagCodePointer5:'sample data', diagCodePointer4:'sample data', diagCodePointer3:'sample data', diagCodePointer2:'sample data', diagCodePointer1:'sample data', anesTotalTime:1234, hiddenUserDef2:1234, hiddenUserDef1:'sample data', seqAuthDetail:1234, seqApTrans:1234, raId:'sample data', eobId:'sample data', printFlag:'sample data', glRefCode:'sample data', companyCode:'sample data', checkDate:'2018-01-01', postDate:'2018-01-01', medDefCode:'sample data', adjudicationMethod:'sample data', adjustmentReason:'sample data', netAmt:1234, withholdAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, deductibleReason:'sample data', deductibleAmt:1234, coinsReason:'sample data', coinsAmt:1234, copayReason:'sample data', copayAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, allowedReason:'sample data', allowedAmt:1234, allowedFactor:1234, billedAmt:1234, seqCerulId:1234, toothStatus:'sample data', typeOfService:'sample data', oralCavity:'sample data', quadrant:'sample data', arch:'sample data', toothSurface5:'sample data', toothSurface4:'sample data', toothSurface3:'sample data', toothSurface2:'sample data', toothSurface1:'sample data', toothNumber:'sample data', quantity:1234, procedureCode:'sample data', billedAllowedAmt:1234, billedModifier:'sample data', billedProcedure:'sample data', seqMembId:1234, seqProvId:1234, svcToDate:'2018-01-01', detailSvcDate:'2018-01-01', processingStatus:'sample data', claimStatus:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234},
       {seqMcondId:1234, adminFeeExists:'sample data', evalForAdminFee:'sample data', penUncleanDays:1234, intPenDscRsn:'sample data', penaltyAmt:1234, geoZipRegion:'sample data', seqTfrulId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqIntDsctRuleId:1234, intDscntAdjReason:'sample data', paidNetAmt:1234, deductUncleanDays:1234, uncleanDays:1234, uncleanFlag:'sample data', interestResetDate:'2018-01-01', interestInquiryDate:'2018-01-01', discountAmt:1234, interestAmt:1234, withholdSurplus:1234, bmaReason:'sample data', bmaAmount:1234, printFlagChangeInd:'sample data', auditStatus:'sample data', reservedLocalUseDet:'sample data', placeOfService:'sample data', adjudDate:'2018-01-01', cobPatLiabCvrgAmt:1234, fullCvrgAmt:1234, ocAllowedAmt:1234, primaryPaidAmt:1234, diagCodePointer8:'sample data', diagCodePointer7:'sample data', diagCodePointer6:'sample data', diagCodePointer5:'sample data', diagCodePointer4:'sample data', diagCodePointer3:'sample data', diagCodePointer2:'sample data', diagCodePointer1:'sample data', anesTotalTime:1234, hiddenUserDef2:1234, hiddenUserDef1:'sample data', seqAuthDetail:1234, seqApTrans:1234, raId:'sample data', eobId:'sample data', printFlag:'sample data', glRefCode:'sample data', companyCode:'sample data', checkDate:'2018-01-01', postDate:'2018-01-01', medDefCode:'sample data', adjudicationMethod:'sample data', adjustmentReason:'sample data', netAmt:1234, withholdAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, deductibleReason:'sample data', deductibleAmt:1234, coinsReason:'sample data', coinsAmt:1234, copayReason:'sample data', copayAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, allowedReason:'sample data', allowedAmt:1234, allowedFactor:1234, billedAmt:1234, seqCerulId:1234, toothStatus:'sample data', typeOfService:'sample data', oralCavity:'sample data', quadrant:'sample data', arch:'sample data', toothSurface5:'sample data', toothSurface4:'sample data', toothSurface3:'sample data', toothSurface2:'sample data', toothSurface1:'sample data', toothNumber:'sample data', quantity:1234, procedureCode:'sample data', billedAllowedAmt:1234, billedModifier:'sample data', billedProcedure:'sample data', seqMembId:1234, seqProvId:1234, svcToDate:'2018-01-01', detailSvcDate:'2018-01-01', processingStatus:'sample data', claimStatus:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234},
       {seqMcondId:1234, adminFeeExists:'sample data', evalForAdminFee:'sample data', penUncleanDays:1234, intPenDscRsn:'sample data', penaltyAmt:1234, geoZipRegion:'sample data', seqTfrulId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqIntDsctRuleId:1234, intDscntAdjReason:'sample data', paidNetAmt:1234, deductUncleanDays:1234, uncleanDays:1234, uncleanFlag:'sample data', interestResetDate:'2018-01-01', interestInquiryDate:'2018-01-01', discountAmt:1234, interestAmt:1234, withholdSurplus:1234, bmaReason:'sample data', bmaAmount:1234, printFlagChangeInd:'sample data', auditStatus:'sample data', reservedLocalUseDet:'sample data', placeOfService:'sample data', adjudDate:'2018-01-01', cobPatLiabCvrgAmt:1234, fullCvrgAmt:1234, ocAllowedAmt:1234, primaryPaidAmt:1234, diagCodePointer8:'sample data', diagCodePointer7:'sample data', diagCodePointer6:'sample data', diagCodePointer5:'sample data', diagCodePointer4:'sample data', diagCodePointer3:'sample data', diagCodePointer2:'sample data', diagCodePointer1:'sample data', anesTotalTime:1234, hiddenUserDef2:1234, hiddenUserDef1:'sample data', seqAuthDetail:1234, seqApTrans:1234, raId:'sample data', eobId:'sample data', printFlag:'sample data', glRefCode:'sample data', companyCode:'sample data', checkDate:'2018-01-01', postDate:'2018-01-01', medDefCode:'sample data', adjudicationMethod:'sample data', adjustmentReason:'sample data', netAmt:1234, withholdAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, deductibleReason:'sample data', deductibleAmt:1234, coinsReason:'sample data', coinsAmt:1234, copayReason:'sample data', copayAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, allowedReason:'sample data', allowedAmt:1234, allowedFactor:1234, billedAmt:1234, seqCerulId:1234, toothStatus:'sample data', typeOfService:'sample data', oralCavity:'sample data', quadrant:'sample data', arch:'sample data', toothSurface5:'sample data', toothSurface4:'sample data', toothSurface3:'sample data', toothSurface2:'sample data', toothSurface1:'sample data', toothNumber:'sample data', quantity:1234, procedureCode:'sample data', billedAllowedAmt:1234, billedModifier:'sample data', billedProcedure:'sample data', seqMembId:1234, seqProvId:1234, svcToDate:'2018-01-01', detailSvcDate:'2018-01-01', processingStatus:'sample data', claimStatus:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234}

      ];
      service.getDentalClaimDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(dentalClaimDetail);
    });
  });


  describe('#createDentalClaimDetail', () => {
    var id = 1;
    it('should return an Promise<DentalClaimDetail>', () => {
      const dentalClaimDetail: DentalClaimDetail = {seqMcondId:1234, adminFeeExists:'sample data', evalForAdminFee:'sample data', penUncleanDays:1234, intPenDscRsn:'sample data', penaltyAmt:1234, geoZipRegion:'sample data', seqTfrulId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqIntDsctRuleId:1234, intDscntAdjReason:'sample data', paidNetAmt:1234, deductUncleanDays:1234, uncleanDays:1234, uncleanFlag:'sample data', interestResetDate:'2018-01-01', interestInquiryDate:'2018-01-01', discountAmt:1234, interestAmt:1234, withholdSurplus:1234, bmaReason:'sample data', bmaAmount:1234, printFlagChangeInd:'sample data', auditStatus:'sample data', reservedLocalUseDet:'sample data', placeOfService:'sample data', adjudDate:'2018-01-01', cobPatLiabCvrgAmt:1234, fullCvrgAmt:1234, ocAllowedAmt:1234, primaryPaidAmt:1234, diagCodePointer8:'sample data', diagCodePointer7:'sample data', diagCodePointer6:'sample data', diagCodePointer5:'sample data', diagCodePointer4:'sample data', diagCodePointer3:'sample data', diagCodePointer2:'sample data', diagCodePointer1:'sample data', anesTotalTime:1234, hiddenUserDef2:1234, hiddenUserDef1:'sample data', seqAuthDetail:1234, seqApTrans:1234, raId:'sample data', eobId:'sample data', printFlag:'sample data', glRefCode:'sample data', companyCode:'sample data', checkDate:'2018-01-01', postDate:'2018-01-01', medDefCode:'sample data', adjudicationMethod:'sample data', adjustmentReason:'sample data', netAmt:1234, withholdAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, deductibleReason:'sample data', deductibleAmt:1234, coinsReason:'sample data', coinsAmt:1234, copayReason:'sample data', copayAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, allowedReason:'sample data', allowedAmt:1234, allowedFactor:1234, billedAmt:1234, seqCerulId:1234, toothStatus:'sample data', typeOfService:'sample data', oralCavity:'sample data', quadrant:'sample data', arch:'sample data', toothSurface5:'sample data', toothSurface4:'sample data', toothSurface3:'sample data', toothSurface2:'sample data', toothSurface1:'sample data', toothNumber:'sample data', quantity:1234, procedureCode:'sample data', billedAllowedAmt:1234, billedModifier:'sample data', billedProcedure:'sample data', seqMembId:1234, seqProvId:1234, svcToDate:'2018-01-01', detailSvcDate:'2018-01-01', processingStatus:'sample data', claimStatus:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234};
      service.createDentalClaimDetail(dentalClaimDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDentalClaimDetail', () => {
    var id = 1;
    it('should return an Promise<DentalClaimDetail>', () => {
      const dentalClaimDetail: DentalClaimDetail = {seqMcondId:1234, adminFeeExists:'sample data', evalForAdminFee:'sample data', penUncleanDays:1234, intPenDscRsn:'sample data', penaltyAmt:1234, geoZipRegion:'sample data', seqTfrulId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqIntDsctRuleId:1234, intDscntAdjReason:'sample data', paidNetAmt:1234, deductUncleanDays:1234, uncleanDays:1234, uncleanFlag:'sample data', interestResetDate:'2018-01-01', interestInquiryDate:'2018-01-01', discountAmt:1234, interestAmt:1234, withholdSurplus:1234, bmaReason:'sample data', bmaAmount:1234, printFlagChangeInd:'sample data', auditStatus:'sample data', reservedLocalUseDet:'sample data', placeOfService:'sample data', adjudDate:'2018-01-01', cobPatLiabCvrgAmt:1234, fullCvrgAmt:1234, ocAllowedAmt:1234, primaryPaidAmt:1234, diagCodePointer8:'sample data', diagCodePointer7:'sample data', diagCodePointer6:'sample data', diagCodePointer5:'sample data', diagCodePointer4:'sample data', diagCodePointer3:'sample data', diagCodePointer2:'sample data', diagCodePointer1:'sample data', anesTotalTime:1234, hiddenUserDef2:1234, hiddenUserDef1:'sample data', seqAuthDetail:1234, seqApTrans:1234, raId:'sample data', eobId:'sample data', printFlag:'sample data', glRefCode:'sample data', companyCode:'sample data', checkDate:'2018-01-01', postDate:'2018-01-01', medDefCode:'sample data', adjudicationMethod:'sample data', adjustmentReason:'sample data', netAmt:1234, withholdAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, deductibleReason:'sample data', deductibleAmt:1234, coinsReason:'sample data', coinsAmt:1234, copayReason:'sample data', copayAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, allowedReason:'sample data', allowedAmt:1234, allowedFactor:1234, billedAmt:1234, seqCerulId:1234, toothStatus:'sample data', typeOfService:'sample data', oralCavity:'sample data', quadrant:'sample data', arch:'sample data', toothSurface5:'sample data', toothSurface4:'sample data', toothSurface3:'sample data', toothSurface2:'sample data', toothSurface1:'sample data', toothNumber:'sample data', quantity:1234, procedureCode:'sample data', billedAllowedAmt:1234, billedModifier:'sample data', billedProcedure:'sample data', seqMembId:1234, seqProvId:1234, svcToDate:'2018-01-01', detailSvcDate:'2018-01-01', processingStatus:'sample data', claimStatus:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234};
      service.updateDentalClaimDetail(dentalClaimDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDentalClaimDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDentalClaimDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});