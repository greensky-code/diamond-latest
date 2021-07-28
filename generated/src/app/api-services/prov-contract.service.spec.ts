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

import { ProvContractService } from './prov-contract.service';
import { ProvContract } from '../api-models/prov-contract.model'
import { ProvContracts } from "../api-models/testing/fake-prov-contract.model"

describe('ProvContractService', () => {
  let injector: TestBed;
  let service: ProvContractService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvContractService]
    });
    injector = getTestBed();
    service = injector.get(ProvContractService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvContracts', () => {
    it('should return an Promise<ProvContract[]>', () => {
      const provContract = [
       {seqProvContract:1234, seqProvId:1234, contractType:'sample data', lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', pcpFlag:'sample data', acceptNewPatients:'sample data', enrollmentLimit:1234, thresholdMet:'sample data', thresholdMetMonth:'2018-01-01', seqVendId:1234, seqVendAddress:1234, capModelId:'sample data', userDefined1:'sample data', participationFlag:'sample data', printRemitAdvice:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, pctOfAwp:1234, dispensingFee:1234, ipaId:'sample data', serviceRegion:'sample data', claimHoldReason:'sample data', claimHoldDate:'2018-01-01', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', geographicRegion:'sample data', drgGrouperId:'sample data', grouperVersion:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, pricerFacilityNumber:'sample data', pricerPaysource:'sample data', seqCovProvGrp:1234, comCobAlwdAmtRule:'sample data', comCobAlwdAmtRsn:'sample data', capFundModelId:'sample data', capFundSubModelId:'sample data', acceptMedicareAssignFlag:'sample data', taxId:'sample data', filingLimitDays:1234, apcFacilityNumber:'sample data', apcPaysource:'sample data', excludeIncentive:'sample data', excludeAdminFee:'sample data'},
       {seqProvContract:1234, seqProvId:1234, contractType:'sample data', lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', pcpFlag:'sample data', acceptNewPatients:'sample data', enrollmentLimit:1234, thresholdMet:'sample data', thresholdMetMonth:'2018-01-01', seqVendId:1234, seqVendAddress:1234, capModelId:'sample data', userDefined1:'sample data', participationFlag:'sample data', printRemitAdvice:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, pctOfAwp:1234, dispensingFee:1234, ipaId:'sample data', serviceRegion:'sample data', claimHoldReason:'sample data', claimHoldDate:'2018-01-01', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', geographicRegion:'sample data', drgGrouperId:'sample data', grouperVersion:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, pricerFacilityNumber:'sample data', pricerPaysource:'sample data', seqCovProvGrp:1234, comCobAlwdAmtRule:'sample data', comCobAlwdAmtRsn:'sample data', capFundModelId:'sample data', capFundSubModelId:'sample data', acceptMedicareAssignFlag:'sample data', taxId:'sample data', filingLimitDays:1234, apcFacilityNumber:'sample data', apcPaysource:'sample data', excludeIncentive:'sample data', excludeAdminFee:'sample data'},
       {seqProvContract:1234, seqProvId:1234, contractType:'sample data', lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', pcpFlag:'sample data', acceptNewPatients:'sample data', enrollmentLimit:1234, thresholdMet:'sample data', thresholdMetMonth:'2018-01-01', seqVendId:1234, seqVendAddress:1234, capModelId:'sample data', userDefined1:'sample data', participationFlag:'sample data', printRemitAdvice:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, pctOfAwp:1234, dispensingFee:1234, ipaId:'sample data', serviceRegion:'sample data', claimHoldReason:'sample data', claimHoldDate:'2018-01-01', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', geographicRegion:'sample data', drgGrouperId:'sample data', grouperVersion:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, pricerFacilityNumber:'sample data', pricerPaysource:'sample data', seqCovProvGrp:1234, comCobAlwdAmtRule:'sample data', comCobAlwdAmtRsn:'sample data', capFundModelId:'sample data', capFundSubModelId:'sample data', acceptMedicareAssignFlag:'sample data', taxId:'sample data', filingLimitDays:1234, apcFacilityNumber:'sample data', apcPaysource:'sample data', excludeIncentive:'sample data', excludeAdminFee:'sample data'}

      ];
      service.getProvContracts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provcontracts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provContract);
    });
  });


  describe('#createProvContract', () => {
    var id = 1;
    it('should return an Promise<ProvContract>', () => {
      const provContract: ProvContract = {seqProvContract:1234, seqProvId:1234, contractType:'sample data', lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', pcpFlag:'sample data', acceptNewPatients:'sample data', enrollmentLimit:1234, thresholdMet:'sample data', thresholdMetMonth:'2018-01-01', seqVendId:1234, seqVendAddress:1234, capModelId:'sample data', userDefined1:'sample data', participationFlag:'sample data', printRemitAdvice:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, pctOfAwp:1234, dispensingFee:1234, ipaId:'sample data', serviceRegion:'sample data', claimHoldReason:'sample data', claimHoldDate:'2018-01-01', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', geographicRegion:'sample data', drgGrouperId:'sample data', grouperVersion:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, pricerFacilityNumber:'sample data', pricerPaysource:'sample data', seqCovProvGrp:1234, comCobAlwdAmtRule:'sample data', comCobAlwdAmtRsn:'sample data', capFundModelId:'sample data', capFundSubModelId:'sample data', acceptMedicareAssignFlag:'sample data', taxId:'sample data', filingLimitDays:1234, apcFacilityNumber:'sample data', apcPaysource:'sample data', excludeIncentive:'sample data', excludeAdminFee:'sample data'};
      service.createProvContract(provContract).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontracts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvContract', () => {
    var id = 1;
    it('should return an Promise<ProvContract>', () => {
      const provContract: ProvContract = {seqProvContract:1234, seqProvId:1234, contractType:'sample data', lineOfBusiness:'sample data', panelId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', pcpFlag:'sample data', acceptNewPatients:'sample data', enrollmentLimit:1234, thresholdMet:'sample data', thresholdMetMonth:'2018-01-01', seqVendId:1234, seqVendAddress:1234, capModelId:'sample data', userDefined1:'sample data', participationFlag:'sample data', printRemitAdvice:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, pctOfAwp:1234, dispensingFee:1234, ipaId:'sample data', serviceRegion:'sample data', claimHoldReason:'sample data', claimHoldDate:'2018-01-01', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', geographicRegion:'sample data', drgGrouperId:'sample data', grouperVersion:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, pricerFacilityNumber:'sample data', pricerPaysource:'sample data', seqCovProvGrp:1234, comCobAlwdAmtRule:'sample data', comCobAlwdAmtRsn:'sample data', capFundModelId:'sample data', capFundSubModelId:'sample data', acceptMedicareAssignFlag:'sample data', taxId:'sample data', filingLimitDays:1234, apcFacilityNumber:'sample data', apcPaysource:'sample data', excludeIncentive:'sample data', excludeAdminFee:'sample data'};
      service.updateProvContract(provContract, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontracts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvContract', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvContract(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontracts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});