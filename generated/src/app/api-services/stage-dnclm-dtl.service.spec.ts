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

import { StageDnclmDtlService } from './stage-dnclm-dtl.service';
import { StageDnclmDtl } from '../api-models/stage-dnclm-dtl.model'
import { StageDnclmDtls } from "../api-models/testing/fake-stage-dnclm-dtl.model"

describe('StageDnclmDtlService', () => {
  let injector: TestBed;
  let service: StageDnclmDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageDnclmDtlService]
    });
    injector = getTestBed();
    service = injector.get(StageDnclmDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageDnclmDtls', () => {
    it('should return an Promise<StageDnclmDtl[]>', () => {
      const stageDnclmDtl = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', toothNo:'sample data', toothStatus:'sample data', toothSurface1:'sample data', toothSurface2:'sample data', toothSurface3:'sample data', toothSurface4:'sample data', toothSurface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', typeOfService:'sample data', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, diagnosisCodePtr5:1234, diagnosisCodePtr6:1234, diagnosisCodePtr7:1234, diagnosisCodePtr8:1234, procedureCode:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', coinsAmt:1234, coinsRsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesTotalTime:1234, adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', uncleanDays:1234, overrideUncleanDays:1234, interestAmt:1234, discountAmt:1234, paidNetAmt:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', toothNo:'sample data', toothStatus:'sample data', toothSurface1:'sample data', toothSurface2:'sample data', toothSurface3:'sample data', toothSurface4:'sample data', toothSurface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', typeOfService:'sample data', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, diagnosisCodePtr5:1234, diagnosisCodePtr6:1234, diagnosisCodePtr7:1234, diagnosisCodePtr8:1234, procedureCode:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', coinsAmt:1234, coinsRsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesTotalTime:1234, adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', uncleanDays:1234, overrideUncleanDays:1234, interestAmt:1234, discountAmt:1234, paidNetAmt:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', toothNo:'sample data', toothStatus:'sample data', toothSurface1:'sample data', toothSurface2:'sample data', toothSurface3:'sample data', toothSurface4:'sample data', toothSurface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', typeOfService:'sample data', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, diagnosisCodePtr5:1234, diagnosisCodePtr6:1234, diagnosisCodePtr7:1234, diagnosisCodePtr8:1234, procedureCode:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', coinsAmt:1234, coinsRsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesTotalTime:1234, adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', uncleanDays:1234, overrideUncleanDays:1234, interestAmt:1234, discountAmt:1234, paidNetAmt:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageDnclmDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmdtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageDnclmDtl);
    });
  });


  describe('#createStageDnclmDtl', () => {
    var id = 1;
    it('should return an Promise<StageDnclmDtl>', () => {
      const stageDnclmDtl: StageDnclmDtl = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', toothNo:'sample data', toothStatus:'sample data', toothSurface1:'sample data', toothSurface2:'sample data', toothSurface3:'sample data', toothSurface4:'sample data', toothSurface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', typeOfService:'sample data', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, diagnosisCodePtr5:1234, diagnosisCodePtr6:1234, diagnosisCodePtr7:1234, diagnosisCodePtr8:1234, procedureCode:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', coinsAmt:1234, coinsRsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesTotalTime:1234, adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', uncleanDays:1234, overrideUncleanDays:1234, interestAmt:1234, discountAmt:1234, paidNetAmt:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'};
      service.createStageDnclmDtl(stageDnclmDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmdtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageDnclmDtl', () => {
    var id = 1;
    it('should return an Promise<StageDnclmDtl>', () => {
      const stageDnclmDtl: StageDnclmDtl = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', lineStatus:'sample data', detailSvcDate:'2018-01-01', svcThruDate:'2018-01-01', toothNo:'sample data', toothStatus:'sample data', toothSurface1:'sample data', toothSurface2:'sample data', toothSurface3:'sample data', toothSurface4:'sample data', toothSurface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', typeOfService:'sample data', placeOfService:'sample data', diagnosisCodePtr1:1234, diagnosisCodePtr2:1234, diagnosisCodePtr3:1234, diagnosisCodePtr4:1234, diagnosisCodePtr5:1234, diagnosisCodePtr6:1234, diagnosisCodePtr7:1234, diagnosisCodePtr8:1234, procedureCode:'sample data', quantity:1234, billedAmt:1234, allowedFactor:1234, allowedAmt:1234, allowedRsn:'sample data', notCoveredAmt:1234, notCoveredRsn:'sample data', copayAmt:1234, copayRsn:'sample data', coinsAmt:1234, coinsRsn:'sample data', deductibleAmt:1234, deductibleRsn:'sample data', otherCarrierAmt:1234, otherCarrierRsn:'sample data', withholdAmt:1234, netAmt:1234, primaryPaidAmt:1234, ocAllowedAmt:1234, adjustmentRsn:'sample data', checkDate:'2018-01-01', anesTotalTime:1234, adjudDate:'2018-01-01', reservedLocalUseDtl:'sample data', uncleanDays:1234, overrideUncleanDays:1234, interestAmt:1234, discountAmt:1234, paidNetAmt:1234, claimStatusOut:'sample data', processingStatusOut:'sample data', procCodeQualifier:'sample data', dtlClaimNumber:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageDnclmDtl(stageDnclmDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmdtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageDnclmDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageDnclmDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmdtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});