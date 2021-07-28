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

import { PremiumMasterService } from './premium-master.service';
import { PremiumMaster } from '../api-models/premium-master.model'
import { PremiumMasters } from "../api-models/testing/fake-premium-master.model"

describe('PremiumMasterService', () => {
  let injector: TestBed;
  let service: PremiumMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremiumMasterService]
    });
    injector = getTestBed();
    service = injector.get(PremiumMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremiumMasters', () => {
    it('should return an Promise<PremiumMaster[]>', () => {
      const premiumMaster = [
       {seqPremId:1234, seqGroupId:1234, recordType:'sample data', planRiderCode:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', benefitPackageId:'sample data', lineOfBusiness:'sample data', companyCode:'sample data', glRefCode:'sample data', tieringMethod:'sample data', rate1:1234, rate2:1234, rate3:1234, rate4:1234, rate5:1234, priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pctOfBilled:1234, priceOrAdjudicate:'sample data', pctAllowed:1234, matrixDef:'sample data', pctOfMatrix:1234, adminFee:1234, adFeeCompCode:'sample data', adFeeGlCode:'sample data', specPgmProcessCd:'sample data', geographicRegion:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adFeeLevelCode:'sample data', exclusionType:'sample data', exclusionPeriod:1234, applyPcp:'sample data', reasonCode:'sample data', cobCalcMethod:'sample data', commissionMatrixDef:'sample data', commissionCompanyCode:'sample data', commissionGlRefCode:'sample data', rateCategory:'sample data', instCobCalcMethod:'sample data', depDetermRuleCode:'sample data', cobPolicyFlag:'sample data', cobExcludeCapClaimCode:'sample data', rateModifyDate:'2018-01-01', claimFilingIndicator:'sample data', dentalCobCalcMethod:'sample data', excludeCapClmDtl:'sample data'},
       {seqPremId:1234, seqGroupId:1234, recordType:'sample data', planRiderCode:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', benefitPackageId:'sample data', lineOfBusiness:'sample data', companyCode:'sample data', glRefCode:'sample data', tieringMethod:'sample data', rate1:1234, rate2:1234, rate3:1234, rate4:1234, rate5:1234, priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pctOfBilled:1234, priceOrAdjudicate:'sample data', pctAllowed:1234, matrixDef:'sample data', pctOfMatrix:1234, adminFee:1234, adFeeCompCode:'sample data', adFeeGlCode:'sample data', specPgmProcessCd:'sample data', geographicRegion:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adFeeLevelCode:'sample data', exclusionType:'sample data', exclusionPeriod:1234, applyPcp:'sample data', reasonCode:'sample data', cobCalcMethod:'sample data', commissionMatrixDef:'sample data', commissionCompanyCode:'sample data', commissionGlRefCode:'sample data', rateCategory:'sample data', instCobCalcMethod:'sample data', depDetermRuleCode:'sample data', cobPolicyFlag:'sample data', cobExcludeCapClaimCode:'sample data', rateModifyDate:'2018-01-01', claimFilingIndicator:'sample data', dentalCobCalcMethod:'sample data', excludeCapClmDtl:'sample data'},
       {seqPremId:1234, seqGroupId:1234, recordType:'sample data', planRiderCode:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', benefitPackageId:'sample data', lineOfBusiness:'sample data', companyCode:'sample data', glRefCode:'sample data', tieringMethod:'sample data', rate1:1234, rate2:1234, rate3:1234, rate4:1234, rate5:1234, priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pctOfBilled:1234, priceOrAdjudicate:'sample data', pctAllowed:1234, matrixDef:'sample data', pctOfMatrix:1234, adminFee:1234, adFeeCompCode:'sample data', adFeeGlCode:'sample data', specPgmProcessCd:'sample data', geographicRegion:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adFeeLevelCode:'sample data', exclusionType:'sample data', exclusionPeriod:1234, applyPcp:'sample data', reasonCode:'sample data', cobCalcMethod:'sample data', commissionMatrixDef:'sample data', commissionCompanyCode:'sample data', commissionGlRefCode:'sample data', rateCategory:'sample data', instCobCalcMethod:'sample data', depDetermRuleCode:'sample data', cobPolicyFlag:'sample data', cobExcludeCapClaimCode:'sample data', rateModifyDate:'2018-01-01', claimFilingIndicator:'sample data', dentalCobCalcMethod:'sample data', excludeCapClmDtl:'sample data'}

      ];
      service.getPremiumMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/premiummasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premiumMaster);
    });
  });


  describe('#createPremiumMaster', () => {
    var id = 1;
    it('should return an Promise<PremiumMaster>', () => {
      const premiumMaster: PremiumMaster = {seqPremId:1234, seqGroupId:1234, recordType:'sample data', planRiderCode:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', benefitPackageId:'sample data', lineOfBusiness:'sample data', companyCode:'sample data', glRefCode:'sample data', tieringMethod:'sample data', rate1:1234, rate2:1234, rate3:1234, rate4:1234, rate5:1234, priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pctOfBilled:1234, priceOrAdjudicate:'sample data', pctAllowed:1234, matrixDef:'sample data', pctOfMatrix:1234, adminFee:1234, adFeeCompCode:'sample data', adFeeGlCode:'sample data', specPgmProcessCd:'sample data', geographicRegion:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adFeeLevelCode:'sample data', exclusionType:'sample data', exclusionPeriod:1234, applyPcp:'sample data', reasonCode:'sample data', cobCalcMethod:'sample data', commissionMatrixDef:'sample data', commissionCompanyCode:'sample data', commissionGlRefCode:'sample data', rateCategory:'sample data', instCobCalcMethod:'sample data', depDetermRuleCode:'sample data', cobPolicyFlag:'sample data', cobExcludeCapClaimCode:'sample data', rateModifyDate:'2018-01-01', claimFilingIndicator:'sample data', dentalCobCalcMethod:'sample data', excludeCapClmDtl:'sample data'};
      service.createPremiumMaster(premiumMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremiumMaster', () => {
    var id = 1;
    it('should return an Promise<PremiumMaster>', () => {
      const premiumMaster: PremiumMaster = {seqPremId:1234, seqGroupId:1234, recordType:'sample data', planRiderCode:'sample data', effectiveDate:'2018-01-01', endDate:'2018-01-01', benefitPackageId:'sample data', lineOfBusiness:'sample data', companyCode:'sample data', glRefCode:'sample data', tieringMethod:'sample data', rate1:1234, rate2:1234, rate3:1234, rate4:1234, rate5:1234, priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pctOfBilled:1234, priceOrAdjudicate:'sample data', pctAllowed:1234, matrixDef:'sample data', pctOfMatrix:1234, adminFee:1234, adFeeCompCode:'sample data', adFeeGlCode:'sample data', specPgmProcessCd:'sample data', geographicRegion:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adFeeLevelCode:'sample data', exclusionType:'sample data', exclusionPeriod:1234, applyPcp:'sample data', reasonCode:'sample data', cobCalcMethod:'sample data', commissionMatrixDef:'sample data', commissionCompanyCode:'sample data', commissionGlRefCode:'sample data', rateCategory:'sample data', instCobCalcMethod:'sample data', depDetermRuleCode:'sample data', cobPolicyFlag:'sample data', cobExcludeCapClaimCode:'sample data', rateModifyDate:'2018-01-01', claimFilingIndicator:'sample data', dentalCobCalcMethod:'sample data', excludeCapClmDtl:'sample data'};
      service.updatePremiumMaster(premiumMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremiumMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremiumMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});