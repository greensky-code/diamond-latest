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

import { ClaimOtherCarrierService } from './claim-other-carrier.service';
import { ClaimOtherCarrier } from '../api-models/claim-other-carrier.model'
import { ClaimOtherCarriers } from "../api-models/testing/fake-claim-other-carrier.model"

describe('ClaimOtherCarrierService', () => {
  let injector: TestBed;
  let service: ClaimOtherCarrierService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimOtherCarrierService]
    });
    injector = getTestBed();
    service = injector.get(ClaimOtherCarrierService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimOtherCarriers', () => {
    it('should return an Promise<ClaimOtherCarrier[]>', () => {
      const claimOtherCarrier = [
       {seqClaimId:1234, sequenceNo:1234, seqMembId:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'2018-01-01', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmount:1234, deductibleAmount:1234, coinsuranceAmount:1234, payorAmountPaid:1234, zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'2018-01-01', insCardTermDate:'2018-01-01', balanceDue:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', payorCountry:'sample data', treatmentAuthCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', securityCode:'sample data', cobCode:'sample data', cobPtRelCode:'sample data'},
       {seqClaimId:1234, sequenceNo:1234, seqMembId:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'2018-01-01', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmount:1234, deductibleAmount:1234, coinsuranceAmount:1234, payorAmountPaid:1234, zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'2018-01-01', insCardTermDate:'2018-01-01', balanceDue:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', payorCountry:'sample data', treatmentAuthCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', securityCode:'sample data', cobCode:'sample data', cobPtRelCode:'sample data'},
       {seqClaimId:1234, sequenceNo:1234, seqMembId:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'2018-01-01', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmount:1234, deductibleAmount:1234, coinsuranceAmount:1234, payorAmountPaid:1234, zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'2018-01-01', insCardTermDate:'2018-01-01', balanceDue:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', payorCountry:'sample data', treatmentAuthCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', securityCode:'sample data', cobCode:'sample data', cobPtRelCode:'sample data'}

      ];
      service.getClaimOtherCarriers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimothercarriers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimOtherCarrier);
    });
  });


  describe('#createClaimOtherCarrier', () => {
    var id = 1;
    it('should return an Promise<ClaimOtherCarrier>', () => {
      const claimOtherCarrier: ClaimOtherCarrier = {seqClaimId:1234, sequenceNo:1234, seqMembId:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'2018-01-01', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmount:1234, deductibleAmount:1234, coinsuranceAmount:1234, payorAmountPaid:1234, zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'2018-01-01', insCardTermDate:'2018-01-01', balanceDue:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', payorCountry:'sample data', treatmentAuthCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', securityCode:'sample data', cobCode:'sample data', cobPtRelCode:'sample data'};
      service.createClaimOtherCarrier(claimOtherCarrier).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimothercarriers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimOtherCarrier', () => {
    var id = 1;
    it('should return an Promise<ClaimOtherCarrier>', () => {
      const claimOtherCarrier: ClaimOtherCarrier = {seqClaimId:1234, sequenceNo:1234, seqMembId:1234, claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'2018-01-01', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:1234, disallowedOther:1234, allowedAmount:1234, deductibleAmount:1234, coinsuranceAmount:1234, payorAmountPaid:1234, zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'2018-01-01', insCardTermDate:'2018-01-01', balanceDue:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', payorCountry:'sample data', treatmentAuthCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', securityCode:'sample data', cobCode:'sample data', cobPtRelCode:'sample data'};
      service.updateClaimOtherCarrier(claimOtherCarrier, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimothercarriers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimOtherCarrier', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimOtherCarrier(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimothercarriers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});