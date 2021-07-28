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

import { StageClaimOcService } from './stage-claim-oc.service';
import { StageClaimOc } from '../api-models/stage-claim-oc.model'
import { StageClaimOcs } from "../api-models/testing/fake-stage-claim-oc.model"

describe('StageClaimOcService', () => {
  let injector: TestBed;
  let service: StageClaimOcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageClaimOcService]
    });
    injector = getTestBed();
    service = injector.get(StageClaimOcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageClaimOcs', () => {
    it('should return an Promise<StageClaimOc[]>', () => {
      const stageClaimOc = [
       {batchId:'sample data', transactionId:1234, sequenceNo:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorName:'sample data', payorAddress1:'sample data', payorAddress2:'sample data', payorCity:'sample data', payorState:'sample data', payorPostalCode:'sample data', payorCountry:'sample data', payorOrganizationId:'sample data', groupName:'sample data', groupNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', patReleaseInd:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', insuredGeneration:'sample data', insuredGender:'sample data', insuredDob:'2018-01-01', insuredEmplymentStatus:'sample data', insuredEmployerLoc:'sample data', insuredEmployerName:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmt:1234, deductibleAmt:1234, coinsuranceAmt:1234, priorPayment:1234, adjudInd1:'sample data', adjudInd2:'sample data', adjudInd3:'sample data', balanceDue:1234, internalControlNo:'sample data', providerNo:'sample data', treatmentAuthCode:'sample data', refProviderNo:'sample data', insCardEffDate:'2018-01-01', insCardTermDate:'2018-01-01', insLocationId:'sample data', priorAuthNo:'sample data', payorClaimOfficeNo:'sample data', planType:'sample data', planPercentage:1234, policyNo:'sample data', insuredEmployerCity:'sample data', insuredEmployerState:'sample data', insuredEmployerPostalCode:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, sequenceNo:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorName:'sample data', payorAddress1:'sample data', payorAddress2:'sample data', payorCity:'sample data', payorState:'sample data', payorPostalCode:'sample data', payorCountry:'sample data', payorOrganizationId:'sample data', groupName:'sample data', groupNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', patReleaseInd:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', insuredGeneration:'sample data', insuredGender:'sample data', insuredDob:'2018-01-01', insuredEmplymentStatus:'sample data', insuredEmployerLoc:'sample data', insuredEmployerName:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmt:1234, deductibleAmt:1234, coinsuranceAmt:1234, priorPayment:1234, adjudInd1:'sample data', adjudInd2:'sample data', adjudInd3:'sample data', balanceDue:1234, internalControlNo:'sample data', providerNo:'sample data', treatmentAuthCode:'sample data', refProviderNo:'sample data', insCardEffDate:'2018-01-01', insCardTermDate:'2018-01-01', insLocationId:'sample data', priorAuthNo:'sample data', payorClaimOfficeNo:'sample data', planType:'sample data', planPercentage:1234, policyNo:'sample data', insuredEmployerCity:'sample data', insuredEmployerState:'sample data', insuredEmployerPostalCode:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, sequenceNo:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorName:'sample data', payorAddress1:'sample data', payorAddress2:'sample data', payorCity:'sample data', payorState:'sample data', payorPostalCode:'sample data', payorCountry:'sample data', payorOrganizationId:'sample data', groupName:'sample data', groupNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', patReleaseInd:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', insuredGeneration:'sample data', insuredGender:'sample data', insuredDob:'2018-01-01', insuredEmplymentStatus:'sample data', insuredEmployerLoc:'sample data', insuredEmployerName:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmt:1234, deductibleAmt:1234, coinsuranceAmt:1234, priorPayment:1234, adjudInd1:'sample data', adjudInd2:'sample data', adjudInd3:'sample data', balanceDue:1234, internalControlNo:'sample data', providerNo:'sample data', treatmentAuthCode:'sample data', refProviderNo:'sample data', insCardEffDate:'2018-01-01', insCardTermDate:'2018-01-01', insLocationId:'sample data', priorAuthNo:'sample data', payorClaimOfficeNo:'sample data', planType:'sample data', planPercentage:1234, policyNo:'sample data', insuredEmployerCity:'sample data', insuredEmployerState:'sample data', insuredEmployerPostalCode:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageClaimOcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimocs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageClaimOc);
    });
  });


  describe('#createStageClaimOc', () => {
    var id = 1;
    it('should return an Promise<StageClaimOc>', () => {
      const stageClaimOc: StageClaimOc = {batchId:'sample data', transactionId:1234, sequenceNo:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorName:'sample data', payorAddress1:'sample data', payorAddress2:'sample data', payorCity:'sample data', payorState:'sample data', payorPostalCode:'sample data', payorCountry:'sample data', payorOrganizationId:'sample data', groupName:'sample data', groupNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', patReleaseInd:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', insuredGeneration:'sample data', insuredGender:'sample data', insuredDob:'2018-01-01', insuredEmplymentStatus:'sample data', insuredEmployerLoc:'sample data', insuredEmployerName:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmt:1234, deductibleAmt:1234, coinsuranceAmt:1234, priorPayment:1234, adjudInd1:'sample data', adjudInd2:'sample data', adjudInd3:'sample data', balanceDue:1234, internalControlNo:'sample data', providerNo:'sample data', treatmentAuthCode:'sample data', refProviderNo:'sample data', insCardEffDate:'2018-01-01', insCardTermDate:'2018-01-01', insLocationId:'sample data', priorAuthNo:'sample data', payorClaimOfficeNo:'sample data', planType:'sample data', planPercentage:1234, policyNo:'sample data', insuredEmployerCity:'sample data', insuredEmployerState:'sample data', insuredEmployerPostalCode:'sample data', insertDatetime:'2018-01-01'};
      service.createStageClaimOc(stageClaimOc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimocs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageClaimOc', () => {
    var id = 1;
    it('should return an Promise<StageClaimOc>', () => {
      const stageClaimOc: StageClaimOc = {batchId:'sample data', transactionId:1234, sequenceNo:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorName:'sample data', payorAddress1:'sample data', payorAddress2:'sample data', payorCity:'sample data', payorState:'sample data', payorPostalCode:'sample data', payorCountry:'sample data', payorOrganizationId:'sample data', groupName:'sample data', groupNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', patReleaseInd:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', insuredGeneration:'sample data', insuredGender:'sample data', insuredDob:'2018-01-01', insuredEmplymentStatus:'sample data', insuredEmployerLoc:'sample data', insuredEmployerName:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmt:1234, deductibleAmt:1234, coinsuranceAmt:1234, priorPayment:1234, adjudInd1:'sample data', adjudInd2:'sample data', adjudInd3:'sample data', balanceDue:1234, internalControlNo:'sample data', providerNo:'sample data', treatmentAuthCode:'sample data', refProviderNo:'sample data', insCardEffDate:'2018-01-01', insCardTermDate:'2018-01-01', insLocationId:'sample data', priorAuthNo:'sample data', payorClaimOfficeNo:'sample data', planType:'sample data', planPercentage:1234, policyNo:'sample data', insuredEmployerCity:'sample data', insuredEmployerState:'sample data', insuredEmployerPostalCode:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageClaimOc(stageClaimOc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimocs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageClaimOc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageClaimOc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageclaimocs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});