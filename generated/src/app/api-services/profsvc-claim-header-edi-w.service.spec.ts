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

import { ProfsvcClaimHeaderEdiWService } from './profsvc-claim-header-edi-w.service';
import { ProfsvcClaimHeaderEdiW } from '../api-models/profsvc-claim-header-edi-w.model'
import { ProfsvcClaimHeaderEdiWs } from "../api-models/testing/fake-profsvc-claim-header-edi-w.model"

describe('ProfsvcClaimHeaderEdiWService', () => {
  let injector: TestBed;
  let service: ProfsvcClaimHeaderEdiWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcClaimHeaderEdiWService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcClaimHeaderEdiWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcClaimHeaderEdiWs', () => {
    it('should return an Promise<ProfsvcClaimHeaderEdiW[]>', () => {
      const profsvcClaimHeaderEdiW = [
       {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data', extRefProvId:'sample data', extRefProvIdType:'sample data', ediStatus:'sample data', originalClaimNumber:'sample data', recInd:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:1234, otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', diamondId:'sample data', inServiceArea:'sample data', providerPostalCode:'sample data', primaryOcExists:'sample data', relInfoSign:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data', extRefProvId:'sample data', extRefProvIdType:'sample data', ediStatus:'sample data', originalClaimNumber:'sample data', recInd:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:1234, otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', diamondId:'sample data', inServiceArea:'sample data', providerPostalCode:'sample data', primaryOcExists:'sample data', relInfoSign:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data', extRefProvId:'sample data', extRefProvIdType:'sample data', ediStatus:'sample data', originalClaimNumber:'sample data', recInd:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:1234, otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', diamondId:'sample data', inServiceArea:'sample data', providerPostalCode:'sample data', primaryOcExists:'sample data', relInfoSign:'sample data'}

      ];
      service.getProfsvcClaimHeaderEdiWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimheaderediws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcClaimHeaderEdiW);
    });
  });


  describe('#createProfsvcClaimHeaderEdiW', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimHeaderEdiW>', () => {
      const profsvcClaimHeaderEdiW: ProfsvcClaimHeaderEdiW = {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data', extRefProvId:'sample data', extRefProvIdType:'sample data', ediStatus:'sample data', originalClaimNumber:'sample data', recInd:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:1234, otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', diamondId:'sample data', inServiceArea:'sample data', providerPostalCode:'sample data', primaryOcExists:'sample data', relInfoSign:'sample data'};
      service.createProfsvcClaimHeaderEdiW(profsvcClaimHeaderEdiW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimheaderediws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcClaimHeaderEdiW', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimHeaderEdiW>', () => {
      const profsvcClaimHeaderEdiW: ProfsvcClaimHeaderEdiW = {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', lineNumber:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data', extRefProvId:'sample data', extRefProvIdType:'sample data', ediStatus:'sample data', originalClaimNumber:'sample data', recInd:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', onsetTime:1234, otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', diamondId:'sample data', inServiceArea:'sample data', providerPostalCode:'sample data', primaryOcExists:'sample data', relInfoSign:'sample data'};
      service.updateProfsvcClaimHeaderEdiW(profsvcClaimHeaderEdiW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimheaderediws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcClaimHeaderEdiW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcClaimHeaderEdiW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimheaderediws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});