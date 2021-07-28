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

import { StageInstDtlService } from './stage-inst-dtl.service';
import { StageInstDtl } from '../api-models/stage-inst-dtl.model'
import { StageInstDtls } from "../api-models/testing/fake-stage-inst-dtl.model"

describe('StageInstDtlService', () => {
  let injector: TestBed;
  let service: StageInstDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageInstDtlService]
    });
    injector = getTestBed();
    service = injector.get(StageInstDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageInstDtls', () => {
    it('should return an Promise<StageInstDtl[]>', () => {
      const stageInstDtl = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisCodePtr:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copay1Amt:1234, copay1Rsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', adjudDate:'2018-01-01', alternateProcCode:'sample data', accomodationRate:1234, nationalUnlabeled1:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, ocAllowedAmt:1234, revenueCodeDesc:'sample data', processingStatusOut:'sample data', claimStatusOut:'sample data', sysRevCode:'sample data', sysBilledAmt:1234, procCodeQualifier:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', unitMeasType:'sample data', altProcCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisCodePtr:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copay1Amt:1234, copay1Rsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', adjudDate:'2018-01-01', alternateProcCode:'sample data', accomodationRate:1234, nationalUnlabeled1:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, ocAllowedAmt:1234, revenueCodeDesc:'sample data', processingStatusOut:'sample data', claimStatusOut:'sample data', sysRevCode:'sample data', sysBilledAmt:1234, procCodeQualifier:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', unitMeasType:'sample data', altProcCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisCodePtr:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copay1Amt:1234, copay1Rsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', adjudDate:'2018-01-01', alternateProcCode:'sample data', accomodationRate:1234, nationalUnlabeled1:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, ocAllowedAmt:1234, revenueCodeDesc:'sample data', processingStatusOut:'sample data', claimStatusOut:'sample data', sysRevCode:'sample data', sysBilledAmt:1234, procCodeQualifier:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', unitMeasType:'sample data', altProcCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageInstDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageinstdtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageInstDtl);
    });
  });


  describe('#createStageInstDtl', () => {
    var id = 1;
    it('should return an Promise<StageInstDtl>', () => {
      const stageInstDtl: StageInstDtl = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisCodePtr:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copay1Amt:1234, copay1Rsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', adjudDate:'2018-01-01', alternateProcCode:'sample data', accomodationRate:1234, nationalUnlabeled1:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, ocAllowedAmt:1234, revenueCodeDesc:'sample data', processingStatusOut:'sample data', claimStatusOut:'sample data', sysRevCode:'sample data', sysBilledAmt:1234, procCodeQualifier:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', unitMeasType:'sample data', altProcCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'};
      service.createStageInstDtl(stageInstDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageinstdtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageInstDtl', () => {
    var id = 1;
    it('should return an Promise<StageInstDtl>', () => {
      const stageInstDtl: StageInstDtl = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', detailThruDate:'2018-01-01', diagnosisCodePtr:1234, procedureCode:'sample data', procedureModifier:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copay1Amt:1234, copay1Rsn:'sample data', copay2Amt:1234, copay2Rsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', adjudDate:'2018-01-01', alternateProcCode:'sample data', accomodationRate:1234, nationalUnlabeled1:'sample data', interestAmt:1234, discountAmt:1234, paidNetAmt:1234, uncleanDays:1234, overrideUncleanDays:1234, ocAllowedAmt:1234, revenueCodeDesc:'sample data', processingStatusOut:'sample data', claimStatusOut:'sample data', sysRevCode:'sample data', sysBilledAmt:1234, procCodeQualifier:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', unitMeasType:'sample data', altProcCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageInstDtl(stageInstDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageinstdtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageInstDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageInstDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageinstdtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});