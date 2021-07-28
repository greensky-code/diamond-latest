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

import { StagePsclmDtlService } from './stage-psclm-dtl.service';
import { StagePsclmDtl } from '../api-models/stage-psclm-dtl.model'
import { StagePsclmDtls } from "../api-models/testing/fake-stage-psclm-dtl.model"

describe('StagePsclmDtlService', () => {
  let injector: TestBed;
  let service: StagePsclmDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePsclmDtlService]
    });
    injector = getTestBed();
    service = injector.get(StagePsclmDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePsclmDtls', () => {
    it('should return an Promise<StagePsclmDtl[]>', () => {
      const stagePsclmDtl = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, procedureCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, typeOfService:'sample data', epsdt:'sample data', familyPlanningInd:'sample data', emergencySvcsInd:'sample data', cobInd:'sample data', adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', upnNo:'sample data', emgCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dmeProcCodeQualifier:'sample data', dmeProcedureCode:'sample data', dmeUnitMeasure:'sample data', dmeQuantity:1234, dmeRentalPrice:1234, dmePurchasePrice:1234, dmeRentalFrequency:'sample data', dateLatestVisit:'2018-01-01', latestHemoTestDate:'2018-01-01', latestCreatineTestDate:'2018-01-01', mammographyCertNo:'sample data', purchasedSvcChargeProvId:'sample data', purchasedSvcChargeAmt:1234, spinalManipInitTreatmentDt:'2018-01-01', providerLineItemControlNo:'sample data', cobPatLiabCvrgAmt:1234, dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, procedureCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, typeOfService:'sample data', epsdt:'sample data', familyPlanningInd:'sample data', emergencySvcsInd:'sample data', cobInd:'sample data', adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', upnNo:'sample data', emgCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dmeProcCodeQualifier:'sample data', dmeProcedureCode:'sample data', dmeUnitMeasure:'sample data', dmeQuantity:1234, dmeRentalPrice:1234, dmePurchasePrice:1234, dmeRentalFrequency:'sample data', dateLatestVisit:'2018-01-01', latestHemoTestDate:'2018-01-01', latestCreatineTestDate:'2018-01-01', mammographyCertNo:'sample data', purchasedSvcChargeProvId:'sample data', purchasedSvcChargeAmt:1234, spinalManipInitTreatmentDt:'2018-01-01', providerLineItemControlNo:'sample data', cobPatLiabCvrgAmt:1234, dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, procedureCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, typeOfService:'sample data', epsdt:'sample data', familyPlanningInd:'sample data', emergencySvcsInd:'sample data', cobInd:'sample data', adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', upnNo:'sample data', emgCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dmeProcCodeQualifier:'sample data', dmeProcedureCode:'sample data', dmeUnitMeasure:'sample data', dmeQuantity:1234, dmeRentalPrice:1234, dmePurchasePrice:1234, dmeRentalFrequency:'sample data', dateLatestVisit:'2018-01-01', latestHemoTestDate:'2018-01-01', latestCreatineTestDate:'2018-01-01', mammographyCertNo:'sample data', purchasedSvcChargeProvId:'sample data', purchasedSvcChargeAmt:1234, spinalManipInitTreatmentDt:'2018-01-01', providerLineItemControlNo:'sample data', cobPatLiabCvrgAmt:1234, dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStagePsclmDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePsclmDtl);
    });
  });


  describe('#createStagePsclmDtl', () => {
    var id = 1;
    it('should return an Promise<StagePsclmDtl>', () => {
      const stagePsclmDtl: StagePsclmDtl = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, procedureCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, typeOfService:'sample data', epsdt:'sample data', familyPlanningInd:'sample data', emergencySvcsInd:'sample data', cobInd:'sample data', adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', upnNo:'sample data', emgCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dmeProcCodeQualifier:'sample data', dmeProcedureCode:'sample data', dmeUnitMeasure:'sample data', dmeQuantity:1234, dmeRentalPrice:1234, dmePurchasePrice:1234, dmeRentalFrequency:'sample data', dateLatestVisit:'2018-01-01', latestHemoTestDate:'2018-01-01', latestCreatineTestDate:'2018-01-01', mammographyCertNo:'sample data', purchasedSvcChargeProvId:'sample data', purchasedSvcChargeAmt:1234, spinalManipInitTreatmentDt:'2018-01-01', providerLineItemControlNo:'sample data', cobPatLiabCvrgAmt:1234, dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'};
      service.createStagePsclmDtl(stagePsclmDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePsclmDtl', () => {
    var id = 1;
    it('should return an Promise<StagePsclmDtl>', () => {
      const stagePsclmDtl: StagePsclmDtl = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, procedureCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesStartTime:1234, anesEndTime:1234, anesTotalTime:1234, typeOfService:'sample data', epsdt:'sample data', familyPlanningInd:'sample data', emergencySvcsInd:'sample data', cobInd:'sample data', adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', upnNo:'sample data', emgCode:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dmeProcCodeQualifier:'sample data', dmeProcedureCode:'sample data', dmeUnitMeasure:'sample data', dmeQuantity:1234, dmeRentalPrice:1234, dmePurchasePrice:1234, dmeRentalFrequency:'sample data', dateLatestVisit:'2018-01-01', latestHemoTestDate:'2018-01-01', latestCreatineTestDate:'2018-01-01', mammographyCertNo:'sample data', purchasedSvcChargeProvId:'sample data', purchasedSvcChargeAmt:1234, spinalManipInitTreatmentDt:'2018-01-01', providerLineItemControlNo:'sample data', cobPatLiabCvrgAmt:1234, dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'};
      service.updateStagePsclmDtl(stagePsclmDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePsclmDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePsclmDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});