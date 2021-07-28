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

import { StageEraDetailService } from './stage-era-detail.service';
import { StageEraDetail } from '../api-models/stage-era-detail.model'
import { StageEraDetails } from "../api-models/testing/fake-stage-era-detail.model"

describe('StageEraDetailService', () => {
  let injector: TestBed;
  let service: StageEraDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageEraDetailService]
    });
    injector = getTestBed();
    service = injector.get(StageEraDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageEraDetails', () => {
    it('should return an Promise<StageEraDetail[]>', () => {
      const stageEraDetail = [
       {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', netAmt:1234, productServiceIdQualifier:'sample data', procedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', quantity:1234, aProductServiceIdQualifier:'sample data', aProcedureCode:'sample data', billedAmount:1234, detailSvcDate:'2018-01-01', svcToDate:'2018-01-01', allowedReason:'sample data', allowedAmt:1234, copay1Reason:'sample data', copay1Amt:1234, copay2Reason:'sample data', copay2Amt:1234, deductibleReason:'sample data', deductibleAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, withholdReason:'sample data', withholdAmt:1234, capFundWithholdReason:'sample data', capFundWithholdAmt:1234, interestReason:'sample data', interestAmt:1234, discountReason:'sample data', discountAmt:1234, claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', revenueCode:'sample data', providerLineItemControlNo:'sample data', penaltyAmt:1234, penaltyReason:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', netAmt:1234, productServiceIdQualifier:'sample data', procedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', quantity:1234, aProductServiceIdQualifier:'sample data', aProcedureCode:'sample data', billedAmount:1234, detailSvcDate:'2018-01-01', svcToDate:'2018-01-01', allowedReason:'sample data', allowedAmt:1234, copay1Reason:'sample data', copay1Amt:1234, copay2Reason:'sample data', copay2Amt:1234, deductibleReason:'sample data', deductibleAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, withholdReason:'sample data', withholdAmt:1234, capFundWithholdReason:'sample data', capFundWithholdAmt:1234, interestReason:'sample data', interestAmt:1234, discountReason:'sample data', discountAmt:1234, claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', revenueCode:'sample data', providerLineItemControlNo:'sample data', penaltyAmt:1234, penaltyReason:'sample data'},
       {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', netAmt:1234, productServiceIdQualifier:'sample data', procedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', quantity:1234, aProductServiceIdQualifier:'sample data', aProcedureCode:'sample data', billedAmount:1234, detailSvcDate:'2018-01-01', svcToDate:'2018-01-01', allowedReason:'sample data', allowedAmt:1234, copay1Reason:'sample data', copay1Amt:1234, copay2Reason:'sample data', copay2Amt:1234, deductibleReason:'sample data', deductibleAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, withholdReason:'sample data', withholdAmt:1234, capFundWithholdReason:'sample data', capFundWithholdAmt:1234, interestReason:'sample data', interestAmt:1234, discountReason:'sample data', discountAmt:1234, claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', revenueCode:'sample data', providerLineItemControlNo:'sample data', penaltyAmt:1234, penaltyReason:'sample data'}

      ];
      service.getStageEraDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageeradetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageEraDetail);
    });
  });


  describe('#createStageEraDetail', () => {
    var id = 1;
    it('should return an Promise<StageEraDetail>', () => {
      const stageEraDetail: StageEraDetail = {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', netAmt:1234, productServiceIdQualifier:'sample data', procedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', quantity:1234, aProductServiceIdQualifier:'sample data', aProcedureCode:'sample data', billedAmount:1234, detailSvcDate:'2018-01-01', svcToDate:'2018-01-01', allowedReason:'sample data', allowedAmt:1234, copay1Reason:'sample data', copay1Amt:1234, copay2Reason:'sample data', copay2Amt:1234, deductibleReason:'sample data', deductibleAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, withholdReason:'sample data', withholdAmt:1234, capFundWithholdReason:'sample data', capFundWithholdAmt:1234, interestReason:'sample data', interestAmt:1234, discountReason:'sample data', discountAmt:1234, claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', revenueCode:'sample data', providerLineItemControlNo:'sample data', penaltyAmt:1234, penaltyReason:'sample data'};
      service.createStageEraDetail(stageEraDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeradetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageEraDetail', () => {
    var id = 1;
    it('should return an Promise<StageEraDetail>', () => {
      const stageEraDetail: StageEraDetail = {batchId:'sample data', transactionId:1234, lineNumber:1234, subLineCode:'sample data', netAmt:1234, productServiceIdQualifier:'sample data', procedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', quantity:1234, aProductServiceIdQualifier:'sample data', aProcedureCode:'sample data', billedAmount:1234, detailSvcDate:'2018-01-01', svcToDate:'2018-01-01', allowedReason:'sample data', allowedAmt:1234, copay1Reason:'sample data', copay1Amt:1234, copay2Reason:'sample data', copay2Amt:1234, deductibleReason:'sample data', deductibleAmt:1234, notCoveredReason:'sample data', notCoveredAmt:1234, otherCarrierReason:'sample data', otherCarrierAmt:1234, withholdReason:'sample data', withholdAmt:1234, capFundWithholdReason:'sample data', capFundWithholdAmt:1234, interestReason:'sample data', interestAmt:1234, discountReason:'sample data', discountAmt:1234, claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', revenueCode:'sample data', providerLineItemControlNo:'sample data', penaltyAmt:1234, penaltyReason:'sample data'};
      service.updateStageEraDetail(stageEraDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeradetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageEraDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageEraDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeradetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});