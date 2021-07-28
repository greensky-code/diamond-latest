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

import { ClaimApiHeaderProfsvcWService } from './claim-api-header-profsvc-w.service';
import { ClaimApiHeaderProfsvcW } from '../api-models/claim-api-header-profsvc-w.model'
import { ClaimApiHeaderProfsvcWs } from "../api-models/testing/fake-claim-api-header-profsvc-w.model"

describe('ClaimApiHeaderProfsvcWService', () => {
  let injector: TestBed;
  let service: ClaimApiHeaderProfsvcWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimApiHeaderProfsvcWService]
    });
    injector = getTestBed();
    service = injector.get(ClaimApiHeaderProfsvcWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimApiHeaderProfsvcWs', () => {
    it('should return an Promise<ClaimApiHeaderProfsvcW[]>', () => {
      const claimApiHeaderProfsvcW = [
       {claimIdNo:'sample data', priorAuthNumber:'sample data', secondaryAuth:'sample data', subscriberId:'sample data', personNumber:'sample data', patDateOfBirth:'sample data', patSex:'sample data', patLastName:'sample data', patFirstName:'sample data', patMi:'sample data', socialSecNo:'sample data', providerNumber:'sample data', vendorId:'sample data', referProvIdNo:'sample data', diagnosisCode1:'sample data', diagnosisCode2:'sample data', diagnosisCode3:'sample data', diagnosisCode4:'sample data', totalClaimCharge:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'sample data', admissionDate1:'sample data', dischargeDate1:'sample data', batchNumber:'sample data', status:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'sample data', unableToWorkThruDate:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:'sample data', medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:'sample data', facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:'sample data', ocCarrierCode:'sample data', cobAllwdAmtRule:'sample data', cobAllwdAmtRsn:'sample data', paySubscriber:'sample data', diamondId:'sample data', providerPostalCode:'sample data', explanationAttached:'sample data'},
       {claimIdNo:'sample data', priorAuthNumber:'sample data', secondaryAuth:'sample data', subscriberId:'sample data', personNumber:'sample data', patDateOfBirth:'sample data', patSex:'sample data', patLastName:'sample data', patFirstName:'sample data', patMi:'sample data', socialSecNo:'sample data', providerNumber:'sample data', vendorId:'sample data', referProvIdNo:'sample data', diagnosisCode1:'sample data', diagnosisCode2:'sample data', diagnosisCode3:'sample data', diagnosisCode4:'sample data', totalClaimCharge:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'sample data', admissionDate1:'sample data', dischargeDate1:'sample data', batchNumber:'sample data', status:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'sample data', unableToWorkThruDate:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:'sample data', medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:'sample data', facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:'sample data', ocCarrierCode:'sample data', cobAllwdAmtRule:'sample data', cobAllwdAmtRsn:'sample data', paySubscriber:'sample data', diamondId:'sample data', providerPostalCode:'sample data', explanationAttached:'sample data'},
       {claimIdNo:'sample data', priorAuthNumber:'sample data', secondaryAuth:'sample data', subscriberId:'sample data', personNumber:'sample data', patDateOfBirth:'sample data', patSex:'sample data', patLastName:'sample data', patFirstName:'sample data', patMi:'sample data', socialSecNo:'sample data', providerNumber:'sample data', vendorId:'sample data', referProvIdNo:'sample data', diagnosisCode1:'sample data', diagnosisCode2:'sample data', diagnosisCode3:'sample data', diagnosisCode4:'sample data', totalClaimCharge:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'sample data', admissionDate1:'sample data', dischargeDate1:'sample data', batchNumber:'sample data', status:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'sample data', unableToWorkThruDate:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:'sample data', medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:'sample data', facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:'sample data', ocCarrierCode:'sample data', cobAllwdAmtRule:'sample data', cobAllwdAmtRsn:'sample data', paySubscriber:'sample data', diamondId:'sample data', providerPostalCode:'sample data', explanationAttached:'sample data'}

      ];
      service.getClaimApiHeaderProfsvcWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiheaderprofsvcws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimApiHeaderProfsvcW);
    });
  });


  describe('#createClaimApiHeaderProfsvcW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiHeaderProfsvcW>', () => {
      const claimApiHeaderProfsvcW: ClaimApiHeaderProfsvcW = {claimIdNo:'sample data', priorAuthNumber:'sample data', secondaryAuth:'sample data', subscriberId:'sample data', personNumber:'sample data', patDateOfBirth:'sample data', patSex:'sample data', patLastName:'sample data', patFirstName:'sample data', patMi:'sample data', socialSecNo:'sample data', providerNumber:'sample data', vendorId:'sample data', referProvIdNo:'sample data', diagnosisCode1:'sample data', diagnosisCode2:'sample data', diagnosisCode3:'sample data', diagnosisCode4:'sample data', totalClaimCharge:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'sample data', admissionDate1:'sample data', dischargeDate1:'sample data', batchNumber:'sample data', status:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'sample data', unableToWorkThruDate:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:'sample data', medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:'sample data', facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:'sample data', ocCarrierCode:'sample data', cobAllwdAmtRule:'sample data', cobAllwdAmtRsn:'sample data', paySubscriber:'sample data', diamondId:'sample data', providerPostalCode:'sample data', explanationAttached:'sample data'};
      service.createClaimApiHeaderProfsvcW(claimApiHeaderProfsvcW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiheaderprofsvcws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimApiHeaderProfsvcW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiHeaderProfsvcW>', () => {
      const claimApiHeaderProfsvcW: ClaimApiHeaderProfsvcW = {claimIdNo:'sample data', priorAuthNumber:'sample data', secondaryAuth:'sample data', subscriberId:'sample data', personNumber:'sample data', patDateOfBirth:'sample data', patSex:'sample data', patLastName:'sample data', patFirstName:'sample data', patMi:'sample data', socialSecNo:'sample data', providerNumber:'sample data', vendorId:'sample data', referProvIdNo:'sample data', diagnosisCode1:'sample data', diagnosisCode2:'sample data', diagnosisCode3:'sample data', diagnosisCode4:'sample data', totalClaimCharge:'sample data', userDefined1:'sample data', userDefined2:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'sample data', admissionDate1:'sample data', dischargeDate1:'sample data', batchNumber:'sample data', status:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'sample data', unableToWorkThruDate:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:'sample data', medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:'sample data', facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:'sample data', ocCarrierCode:'sample data', cobAllwdAmtRule:'sample data', cobAllwdAmtRsn:'sample data', paySubscriber:'sample data', diamondId:'sample data', providerPostalCode:'sample data', explanationAttached:'sample data'};
      service.updateClaimApiHeaderProfsvcW(claimApiHeaderProfsvcW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiheaderprofsvcws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimApiHeaderProfsvcW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimApiHeaderProfsvcW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiheaderprofsvcws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});