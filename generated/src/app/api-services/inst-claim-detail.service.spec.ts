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

import { InstClaimDetailService } from './inst-claim-detail.service';
import { InstClaimDetail } from '../api-models/inst-claim-detail.model'
import { InstClaimDetails } from "../api-models/testing/fake-inst-claim-detail.model"

describe('InstClaimDetailService', () => {
  let injector: TestBed;
  let service: InstClaimDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstClaimDetailService]
    });
    injector = getTestBed();
    service = injector.get(InstClaimDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getInstClaimDetails', () => {
    it('should return an Promise<InstClaimDetail[]>', () => {
      const instClaimDetail = [
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, countAsDays:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', carveOut:'sample data', systemGenerated:'sample data', capOutlierInclExcl:'sample data', alternateProcCode:'sample data', accommodationRate:1234, nationalUnlabeled1:'sample data', ocAllowedAmt:1234, fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, adjudDate:'2018-01-01', capFundWithholdAmt:1234, capFundDateOverrideFlag:'sample data', capFundStatus:1234, totalUnits:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', printFlagChangeInd:'sample data', bmaAmount:1234, bmaReason:'sample data', withholdSurplus:1234, auditStatus:'sample data', apcCode:'sample data', apcPaymentStatus:'sample data', apcPayment:1234, apcRate:1234, apcWeight:1234, apcDiscount:1234, interestAmt:1234, discountAmt:1234, interestInquiryDate:'2018-01-01', interestResetDate:'2018-01-01', uncleanFlag:'sample data', uncleanDays:1234, deductUncleanDays:1234, paidNetAmt:1234, intDscntAdjReason:'sample data', seqRuleId:1234, sysRevCode:'sample data', sysBilledAmt:1234, seqTfrulId:1234, authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, apcCopay:1234, apcDeduct:1234, apcPackagedCharge:1234, apcReallocatedCharge:1234, apcOutlierPayment:1234, procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', geoZipRegion:'sample data', penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, evalForAdminFee:'sample data', adminFeeExists:'sample data', tfruleGlobalActnApply:1234},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, countAsDays:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', carveOut:'sample data', systemGenerated:'sample data', capOutlierInclExcl:'sample data', alternateProcCode:'sample data', accommodationRate:1234, nationalUnlabeled1:'sample data', ocAllowedAmt:1234, fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, adjudDate:'2018-01-01', capFundWithholdAmt:1234, capFundDateOverrideFlag:'sample data', capFundStatus:1234, totalUnits:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', printFlagChangeInd:'sample data', bmaAmount:1234, bmaReason:'sample data', withholdSurplus:1234, auditStatus:'sample data', apcCode:'sample data', apcPaymentStatus:'sample data', apcPayment:1234, apcRate:1234, apcWeight:1234, apcDiscount:1234, interestAmt:1234, discountAmt:1234, interestInquiryDate:'2018-01-01', interestResetDate:'2018-01-01', uncleanFlag:'sample data', uncleanDays:1234, deductUncleanDays:1234, paidNetAmt:1234, intDscntAdjReason:'sample data', seqRuleId:1234, sysRevCode:'sample data', sysBilledAmt:1234, seqTfrulId:1234, authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, apcCopay:1234, apcDeduct:1234, apcPackagedCharge:1234, apcReallocatedCharge:1234, apcOutlierPayment:1234, procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', geoZipRegion:'sample data', penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, evalForAdminFee:'sample data', adminFeeExists:'sample data', tfruleGlobalActnApply:1234},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, countAsDays:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', carveOut:'sample data', systemGenerated:'sample data', capOutlierInclExcl:'sample data', alternateProcCode:'sample data', accommodationRate:1234, nationalUnlabeled1:'sample data', ocAllowedAmt:1234, fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, adjudDate:'2018-01-01', capFundWithholdAmt:1234, capFundDateOverrideFlag:'sample data', capFundStatus:1234, totalUnits:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', printFlagChangeInd:'sample data', bmaAmount:1234, bmaReason:'sample data', withholdSurplus:1234, auditStatus:'sample data', apcCode:'sample data', apcPaymentStatus:'sample data', apcPayment:1234, apcRate:1234, apcWeight:1234, apcDiscount:1234, interestAmt:1234, discountAmt:1234, interestInquiryDate:'2018-01-01', interestResetDate:'2018-01-01', uncleanFlag:'sample data', uncleanDays:1234, deductUncleanDays:1234, paidNetAmt:1234, intDscntAdjReason:'sample data', seqRuleId:1234, sysRevCode:'sample data', sysBilledAmt:1234, seqTfrulId:1234, authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, apcCopay:1234, apcDeduct:1234, apcPackagedCharge:1234, apcReallocatedCharge:1234, apcOutlierPayment:1234, procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', geoZipRegion:'sample data', penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, evalForAdminFee:'sample data', adminFeeExists:'sample data', tfruleGlobalActnApply:1234}

      ];
      service.getInstClaimDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(instClaimDetail);
    });
  });


  describe('#createInstClaimDetail', () => {
    var id = 1;
    it('should return an Promise<InstClaimDetail>', () => {
      const instClaimDetail: InstClaimDetail = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, countAsDays:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', carveOut:'sample data', systemGenerated:'sample data', capOutlierInclExcl:'sample data', alternateProcCode:'sample data', accommodationRate:1234, nationalUnlabeled1:'sample data', ocAllowedAmt:1234, fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, adjudDate:'2018-01-01', capFundWithholdAmt:1234, capFundDateOverrideFlag:'sample data', capFundStatus:1234, totalUnits:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', printFlagChangeInd:'sample data', bmaAmount:1234, bmaReason:'sample data', withholdSurplus:1234, auditStatus:'sample data', apcCode:'sample data', apcPaymentStatus:'sample data', apcPayment:1234, apcRate:1234, apcWeight:1234, apcDiscount:1234, interestAmt:1234, discountAmt:1234, interestInquiryDate:'2018-01-01', interestResetDate:'2018-01-01', uncleanFlag:'sample data', uncleanDays:1234, deductUncleanDays:1234, paidNetAmt:1234, intDscntAdjReason:'sample data', seqRuleId:1234, sysRevCode:'sample data', sysBilledAmt:1234, seqTfrulId:1234, authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, apcCopay:1234, apcDeduct:1234, apcPackagedCharge:1234, apcReallocatedCharge:1234, apcOutlierPayment:1234, procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', geoZipRegion:'sample data', penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, evalForAdminFee:'sample data', adminFeeExists:'sample data', tfruleGlobalActnApply:1234};
      service.createInstClaimDetail(instClaimDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateInstClaimDetail', () => {
    var id = 1;
    it('should return an Promise<InstClaimDetail>', () => {
      const instClaimDetail: InstClaimDetail = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisPointer:1234, placeServPointer:1234, seqProvId:1234, seqMembId:1234, billedProcedure:'sample data', billedModifier:'sample data', billedAllowedAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, netAmt:1234, allowedReason:'sample data', notCoveredReason:'sample data', copay1Reason:'sample data', copay2Reason:'sample data', deductibleReason:'sample data', adjustmentReason:'sample data', otherCarrierRsn:'sample data', holdReason1:'sample data', holdReason2:'sample data', holdReason3:'sample data', claimStatus:'sample data', processingStatus:'sample data', adjudicationMethod:'sample data', medDefCode:'sample data', postDate:'2018-01-01', checkDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', printFlag:'sample data', eobId:'sample data', raId:'sample data', seqApTrans:1234, seqAuthDetail:1234, hiddenUserDef1:'sample data', hiddenUserDef2:1234, countAsDays:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', carveOut:'sample data', systemGenerated:'sample data', capOutlierInclExcl:'sample data', alternateProcCode:'sample data', accommodationRate:1234, nationalUnlabeled1:'sample data', ocAllowedAmt:1234, fullCvrgAmt:1234, cobPatLiabCvrgAmt:1234, adjudDate:'2018-01-01', capFundWithholdAmt:1234, capFundDateOverrideFlag:'sample data', capFundStatus:1234, totalUnits:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunMonth:'2018-01-01', printFlagChangeInd:'sample data', bmaAmount:1234, bmaReason:'sample data', withholdSurplus:1234, auditStatus:'sample data', apcCode:'sample data', apcPaymentStatus:'sample data', apcPayment:1234, apcRate:1234, apcWeight:1234, apcDiscount:1234, interestAmt:1234, discountAmt:1234, interestInquiryDate:'2018-01-01', interestResetDate:'2018-01-01', uncleanFlag:'sample data', uncleanDays:1234, deductUncleanDays:1234, paidNetAmt:1234, intDscntAdjReason:'sample data', seqRuleId:1234, sysRevCode:'sample data', sysBilledAmt:1234, seqTfrulId:1234, authProcCodeUsed:'sample data', authPrice:1234, seqCdaplDtl:1234, apcCopay:1234, apcDeduct:1234, apcPackagedCharge:1234, apcReallocatedCharge:1234, apcOutlierPayment:1234, procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', geoZipRegion:'sample data', penaltyAmt:1234, intPenDscRsn:'sample data', penUncleanDays:1234, evalForAdminFee:'sample data', adminFeeExists:'sample data', tfruleGlobalActnApply:1234};
      service.updateInstClaimDetail(instClaimDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteInstClaimDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteInstClaimDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});