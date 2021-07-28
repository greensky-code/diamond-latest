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

import { DentalClaimHeaderService } from './dental-claim-header.service';
import { DentalClaimHeader } from '../api-models/dental-claim-header.model'
import { DentalClaimHeaders } from "../api-models/testing/fake-dental-claim-header.model"

describe('DentalClaimHeaderService', () => {
  let injector: TestBed;
  let service: DentalClaimHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DentalClaimHeaderService]
    });
    injector = getTestBed();
    service = injector.get(DentalClaimHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDentalClaimHeaders', () => {
    it('should return an Promise<DentalClaimHeader[]>', () => {
      const dentalClaimHeader = [
       {seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', providerPostalCode:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService:'sample data', serviceReason:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', seqProvContract:1234, paySubscriber:'sample data', payDependent:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', origSeqProvContract:1234, ocCarrierCode:'sample data', authLevel:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', releaseMedRecsInd:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', auditStatus:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234, authMatchOrder:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, acceptMedicareAssignFlag:'sample data', explanationAttached:'sample data', inServiceArea:'sample data', headerChanged:'sample data', primaryOcExists:'sample data', adaTypeSubmission:'sample data', adaSpec:'sample data', specialProgramInd:'sample data', firstVisitCurSeriesDate:'2018-01-01', placeOfTreatment:'sample data', xraysOrModelsEnclosedInd:'sample data', xraysOrModelsCount:1234, orthodontiaInd:'sample data', orthoAppliancesPlacedDate:'2018-01-01', orthoMonthsRemaining:1234, prosthesisInd:'sample data', replacementReason:'sample data', priorReplacementDate:'2018-01-01', occupIllnessInjuryInd:'sample data', occupIllnessInjuryDate:'2018-01-01', occupIllnessInjuryDesc:'sample data', autoAccidentInd:'sample data', autoAccidentDate:'2018-01-01', autoAccidentDesc:'sample data', otherAccidentInd:'sample data', otherAccidentDate:'2018-01-01', otherAccidentDesc:'sample data', neitherInd:'sample data', remarks:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', invalidDataInd:'sample data', privacyApplies:'sample data', seqMcondId:1234, memberState:'sample data'},
       {seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', providerPostalCode:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService:'sample data', serviceReason:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', seqProvContract:1234, paySubscriber:'sample data', payDependent:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', origSeqProvContract:1234, ocCarrierCode:'sample data', authLevel:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', releaseMedRecsInd:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', auditStatus:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234, authMatchOrder:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, acceptMedicareAssignFlag:'sample data', explanationAttached:'sample data', inServiceArea:'sample data', headerChanged:'sample data', primaryOcExists:'sample data', adaTypeSubmission:'sample data', adaSpec:'sample data', specialProgramInd:'sample data', firstVisitCurSeriesDate:'2018-01-01', placeOfTreatment:'sample data', xraysOrModelsEnclosedInd:'sample data', xraysOrModelsCount:1234, orthodontiaInd:'sample data', orthoAppliancesPlacedDate:'2018-01-01', orthoMonthsRemaining:1234, prosthesisInd:'sample data', replacementReason:'sample data', priorReplacementDate:'2018-01-01', occupIllnessInjuryInd:'sample data', occupIllnessInjuryDate:'2018-01-01', occupIllnessInjuryDesc:'sample data', autoAccidentInd:'sample data', autoAccidentDate:'2018-01-01', autoAccidentDesc:'sample data', otherAccidentInd:'sample data', otherAccidentDate:'2018-01-01', otherAccidentDesc:'sample data', neitherInd:'sample data', remarks:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', invalidDataInd:'sample data', privacyApplies:'sample data', seqMcondId:1234, memberState:'sample data'},
       {seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', providerPostalCode:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService:'sample data', serviceReason:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', seqProvContract:1234, paySubscriber:'sample data', payDependent:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', origSeqProvContract:1234, ocCarrierCode:'sample data', authLevel:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', releaseMedRecsInd:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', auditStatus:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234, authMatchOrder:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, acceptMedicareAssignFlag:'sample data', explanationAttached:'sample data', inServiceArea:'sample data', headerChanged:'sample data', primaryOcExists:'sample data', adaTypeSubmission:'sample data', adaSpec:'sample data', specialProgramInd:'sample data', firstVisitCurSeriesDate:'2018-01-01', placeOfTreatment:'sample data', xraysOrModelsEnclosedInd:'sample data', xraysOrModelsCount:1234, orthodontiaInd:'sample data', orthoAppliancesPlacedDate:'2018-01-01', orthoMonthsRemaining:1234, prosthesisInd:'sample data', replacementReason:'sample data', priorReplacementDate:'2018-01-01', occupIllnessInjuryInd:'sample data', occupIllnessInjuryDate:'2018-01-01', occupIllnessInjuryDesc:'sample data', autoAccidentInd:'sample data', autoAccidentDate:'2018-01-01', autoAccidentDesc:'sample data', otherAccidentInd:'sample data', otherAccidentDate:'2018-01-01', otherAccidentDesc:'sample data', neitherInd:'sample data', remarks:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', invalidDataInd:'sample data', privacyApplies:'sample data', seqMcondId:1234, memberState:'sample data'}

      ];
      service.getDentalClaimHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(dentalClaimHeader);
    });
  });


  describe('#createDentalClaimHeader', () => {
    var id = 1;
    it('should return an Promise<DentalClaimHeader>', () => {
      const dentalClaimHeader: DentalClaimHeader = {seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', providerPostalCode:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService:'sample data', serviceReason:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', seqProvContract:1234, paySubscriber:'sample data', payDependent:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', origSeqProvContract:1234, ocCarrierCode:'sample data', authLevel:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', releaseMedRecsInd:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', auditStatus:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234, authMatchOrder:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, acceptMedicareAssignFlag:'sample data', explanationAttached:'sample data', inServiceArea:'sample data', headerChanged:'sample data', primaryOcExists:'sample data', adaTypeSubmission:'sample data', adaSpec:'sample data', specialProgramInd:'sample data', firstVisitCurSeriesDate:'2018-01-01', placeOfTreatment:'sample data', xraysOrModelsEnclosedInd:'sample data', xraysOrModelsCount:1234, orthodontiaInd:'sample data', orthoAppliancesPlacedDate:'2018-01-01', orthoMonthsRemaining:1234, prosthesisInd:'sample data', replacementReason:'sample data', priorReplacementDate:'2018-01-01', occupIllnessInjuryInd:'sample data', occupIllnessInjuryDate:'2018-01-01', occupIllnessInjuryDesc:'sample data', autoAccidentInd:'sample data', autoAccidentDate:'2018-01-01', autoAccidentDesc:'sample data', otherAccidentInd:'sample data', otherAccidentDate:'2018-01-01', otherAccidentDesc:'sample data', neitherInd:'sample data', remarks:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', invalidDataInd:'sample data', privacyApplies:'sample data', seqMcondId:1234, memberState:'sample data'};
      service.createDentalClaimHeader(dentalClaimHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDentalClaimHeader', () => {
    var id = 1;
    it('should return an Promise<DentalClaimHeader>', () => {
      const dentalClaimHeader: DentalClaimHeader = {seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', providerPostalCode:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService:'sample data', serviceReason:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', seqProvContract:1234, paySubscriber:'sample data', payDependent:'sample data', submittedAuthNumber:1234, submittedSecondaryAuth:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', patControlNo:'sample data', provAssignInd:'sample data', facilityLabIdNo:'sample data', admissionDate1:'2018-01-01', dischargeDate1:'2018-01-01', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', coveringMethod:'sample data', origSeqProvContract:1234, ocCarrierCode:'sample data', authLevel:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', originalReferenceNumber:'sample data', patientPaidAmount:1234, facilityNumber:'sample data', labNumber:'sample data', releaseMedRecsInd:'sample data', authWaiveMethod:'sample data', providerPanel:'sample data', providerIpa:'sample data', authClass:'sample data', refProvPcp:'sample data', auditStatus:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234, authMatchOrder:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, acceptMedicareAssignFlag:'sample data', explanationAttached:'sample data', inServiceArea:'sample data', headerChanged:'sample data', primaryOcExists:'sample data', adaTypeSubmission:'sample data', adaSpec:'sample data', specialProgramInd:'sample data', firstVisitCurSeriesDate:'2018-01-01', placeOfTreatment:'sample data', xraysOrModelsEnclosedInd:'sample data', xraysOrModelsCount:1234, orthodontiaInd:'sample data', orthoAppliancesPlacedDate:'2018-01-01', orthoMonthsRemaining:1234, prosthesisInd:'sample data', replacementReason:'sample data', priorReplacementDate:'2018-01-01', occupIllnessInjuryInd:'sample data', occupIllnessInjuryDate:'2018-01-01', occupIllnessInjuryDesc:'sample data', autoAccidentInd:'sample data', autoAccidentDate:'2018-01-01', autoAccidentDesc:'sample data', otherAccidentInd:'sample data', otherAccidentDate:'2018-01-01', otherAccidentDesc:'sample data', neitherInd:'sample data', remarks:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', invalidDataInd:'sample data', privacyApplies:'sample data', seqMcondId:1234, memberState:'sample data'};
      service.updateDentalClaimHeader(dentalClaimHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDentalClaimHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDentalClaimHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});