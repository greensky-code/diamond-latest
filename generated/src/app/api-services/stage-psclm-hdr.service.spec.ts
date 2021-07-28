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

import { StagePsclmHdrService } from './stage-psclm-hdr.service';
import { StagePsclmHdr } from '../api-models/stage-psclm-hdr.model'
import { StagePsclmHdrs } from "../api-models/testing/fake-stage-psclm-hdr.model"

describe('StagePsclmHdrService', () => {
  let injector: TestBed;
  let service: StagePsclmHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePsclmHdrService]
    });
    injector = getTestBed();
    service = injector.get(StagePsclmHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePsclmHdrs', () => {
    it('should return an Promise<StagePsclmHdr[]>', () => {
      const stagePsclmHdr = [
       {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', seqClaimId:1234, originalRefNo:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNo:1234, secAuthNo:'sample data', diamondId:'sample data', subscriberId:'sample data', personNo:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleName:'sample data', patientSsn:'sample data', patientDob:'2018-01-01', patientGender:'sample data', patientAddress:'sample data', patientCity:'sample data', patientState:'sample data', patientPostalCode:'sample data', patientPhone:'sample data', receivedDate:'2018-01-01', totalBilledAmt:1234, placeOfService:'sample data', serviceRsn:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', paySubscriber:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patientControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate:'2018-01-01', subscriberZipCode:'sample data', patientAdd2:'sample data', provAddress2:'sample data', provMiddleName:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', cobPtRelCode:'sample data', totalOcAllowed:1234, facilityAddress2:'sample data', facilityTaxIdNo:'sample data', labTaxIdNo:'sample data', facilityNatlIdNo:'sample data', labNatlIdNo:'sample data', claimSubmReasonCode:'sample data', secDiamProvIdQual:'sample data', secDiamProvId:'sample data', secDiamVendIdQual:'sample data', secDiamVendId:'sample data', secDiamRefProvIdQual:'sample data', secDiamRefProvId:'sample data', dischargeDate:'2018-01-01', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', patientPaidAmt:1234, facilityNo:'sample data', labNo:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', provId:'sample data', provNationalId:'sample data', provTaxId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress1:'sample data', provCity:'sample data', provState:'sample data', provPostalCode:'sample data', provPhone:'sample data', provTaxonomyCode:'sample data', refProvId:'sample data', refProvNationalId:'sample data', refProvTaxId:'sample data', refProvLastName:'sample data', refProvFirstName:'sample data', refProvMiddleName:'sample data', refProvTaxonomyCode:'sample data', vendId:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendLastName:'sample data', vendFirstName:'sample data', vendAddress1:'sample data', vendPostalCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', acceptMedicareAssign:'sample data', insuredEmpName:'sample data', insuredAddress:'sample data', insuredCity:'sample data', insuredState:'sample data', insuredPostalCode:'sample data', insuredPhone:'sample data', insuredPlanName:'sample data', patientStatus:'sample data', otherInsuredLastName:'sample data', otherInsuredFirstName:'sample data', otherInsuredMiddleName:'sample data', otherInsuredDob:'2018-01-01', otherInsuredGender:'sample data', otherInsuredEmployer:'sample data', otherInsuredPlanName:'sample data', otherAccidentInd:'sample data', totalBalanceDue:1234, facilityName:'sample data', facilityAddress:'sample data', facilityCity:'sample data', facilityState:'sample data', facilityPostalCode:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleName:'sample data', subscriberSsn:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', companyId:'sample data', companyName:'sample data', companyAddress:'sample data', companyCity:'sample data', companyState:'sample data', companyPostalCode:'sample data', relInfoSign:'sample data', relInfoSignDate:'2018-01-01', relPayProv:'sample data', signRendProv:'sample data', signRendProvDate:'2018-01-01', natProvPracGroupId:'sample data', claimNo:'sample data', relationshipCode:'sample data', cobCode:'sample data', claimFilingInd:'sample data', insertDate:'2018-01-01', ocCarrierCode:'sample data', totalPatLiabilityAmt:1234, memberDateOfDeath:'2018-01-01', memberWeightPounds:1234, memberPregnancyInd:'sample data', spinalManipInitTreatment:'2018-01-01', spinalManipConditionCode:'sample data', spinalManipDesc1:'sample data', spinalManipDesc2:'sample data', spinalManipXrayAvailibility:'sample data', footCareLastVisitDate:'2018-01-01', mammographyCertNo:'sample data', epsdtReferral:'sample data', epsdtCode:'sample data', epsdtConditionInd1:'sample data', epsdtConditionInd2:'sample data', epsdtConditionInd3:'sample data', vendCity:'sample data', vendState:'sample data', vendAddress2:'sample data', subscriberAddress1:'sample data', subscriberAddress2:'sample data', subscriberCity:'sample data', subscriberState:'sample data'},
       {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', seqClaimId:1234, originalRefNo:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNo:1234, secAuthNo:'sample data', diamondId:'sample data', subscriberId:'sample data', personNo:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleName:'sample data', patientSsn:'sample data', patientDob:'2018-01-01', patientGender:'sample data', patientAddress:'sample data', patientCity:'sample data', patientState:'sample data', patientPostalCode:'sample data', patientPhone:'sample data', receivedDate:'2018-01-01', totalBilledAmt:1234, placeOfService:'sample data', serviceRsn:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', paySubscriber:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patientControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate:'2018-01-01', subscriberZipCode:'sample data', patientAdd2:'sample data', provAddress2:'sample data', provMiddleName:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', cobPtRelCode:'sample data', totalOcAllowed:1234, facilityAddress2:'sample data', facilityTaxIdNo:'sample data', labTaxIdNo:'sample data', facilityNatlIdNo:'sample data', labNatlIdNo:'sample data', claimSubmReasonCode:'sample data', secDiamProvIdQual:'sample data', secDiamProvId:'sample data', secDiamVendIdQual:'sample data', secDiamVendId:'sample data', secDiamRefProvIdQual:'sample data', secDiamRefProvId:'sample data', dischargeDate:'2018-01-01', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', patientPaidAmt:1234, facilityNo:'sample data', labNo:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', provId:'sample data', provNationalId:'sample data', provTaxId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress1:'sample data', provCity:'sample data', provState:'sample data', provPostalCode:'sample data', provPhone:'sample data', provTaxonomyCode:'sample data', refProvId:'sample data', refProvNationalId:'sample data', refProvTaxId:'sample data', refProvLastName:'sample data', refProvFirstName:'sample data', refProvMiddleName:'sample data', refProvTaxonomyCode:'sample data', vendId:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendLastName:'sample data', vendFirstName:'sample data', vendAddress1:'sample data', vendPostalCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', acceptMedicareAssign:'sample data', insuredEmpName:'sample data', insuredAddress:'sample data', insuredCity:'sample data', insuredState:'sample data', insuredPostalCode:'sample data', insuredPhone:'sample data', insuredPlanName:'sample data', patientStatus:'sample data', otherInsuredLastName:'sample data', otherInsuredFirstName:'sample data', otherInsuredMiddleName:'sample data', otherInsuredDob:'2018-01-01', otherInsuredGender:'sample data', otherInsuredEmployer:'sample data', otherInsuredPlanName:'sample data', otherAccidentInd:'sample data', totalBalanceDue:1234, facilityName:'sample data', facilityAddress:'sample data', facilityCity:'sample data', facilityState:'sample data', facilityPostalCode:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleName:'sample data', subscriberSsn:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', companyId:'sample data', companyName:'sample data', companyAddress:'sample data', companyCity:'sample data', companyState:'sample data', companyPostalCode:'sample data', relInfoSign:'sample data', relInfoSignDate:'2018-01-01', relPayProv:'sample data', signRendProv:'sample data', signRendProvDate:'2018-01-01', natProvPracGroupId:'sample data', claimNo:'sample data', relationshipCode:'sample data', cobCode:'sample data', claimFilingInd:'sample data', insertDate:'2018-01-01', ocCarrierCode:'sample data', totalPatLiabilityAmt:1234, memberDateOfDeath:'2018-01-01', memberWeightPounds:1234, memberPregnancyInd:'sample data', spinalManipInitTreatment:'2018-01-01', spinalManipConditionCode:'sample data', spinalManipDesc1:'sample data', spinalManipDesc2:'sample data', spinalManipXrayAvailibility:'sample data', footCareLastVisitDate:'2018-01-01', mammographyCertNo:'sample data', epsdtReferral:'sample data', epsdtCode:'sample data', epsdtConditionInd1:'sample data', epsdtConditionInd2:'sample data', epsdtConditionInd3:'sample data', vendCity:'sample data', vendState:'sample data', vendAddress2:'sample data', subscriberAddress1:'sample data', subscriberAddress2:'sample data', subscriberCity:'sample data', subscriberState:'sample data'},
       {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', seqClaimId:1234, originalRefNo:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNo:1234, secAuthNo:'sample data', diamondId:'sample data', subscriberId:'sample data', personNo:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleName:'sample data', patientSsn:'sample data', patientDob:'2018-01-01', patientGender:'sample data', patientAddress:'sample data', patientCity:'sample data', patientState:'sample data', patientPostalCode:'sample data', patientPhone:'sample data', receivedDate:'2018-01-01', totalBilledAmt:1234, placeOfService:'sample data', serviceRsn:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', paySubscriber:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patientControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate:'2018-01-01', subscriberZipCode:'sample data', patientAdd2:'sample data', provAddress2:'sample data', provMiddleName:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', cobPtRelCode:'sample data', totalOcAllowed:1234, facilityAddress2:'sample data', facilityTaxIdNo:'sample data', labTaxIdNo:'sample data', facilityNatlIdNo:'sample data', labNatlIdNo:'sample data', claimSubmReasonCode:'sample data', secDiamProvIdQual:'sample data', secDiamProvId:'sample data', secDiamVendIdQual:'sample data', secDiamVendId:'sample data', secDiamRefProvIdQual:'sample data', secDiamRefProvId:'sample data', dischargeDate:'2018-01-01', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', patientPaidAmt:1234, facilityNo:'sample data', labNo:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', provId:'sample data', provNationalId:'sample data', provTaxId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress1:'sample data', provCity:'sample data', provState:'sample data', provPostalCode:'sample data', provPhone:'sample data', provTaxonomyCode:'sample data', refProvId:'sample data', refProvNationalId:'sample data', refProvTaxId:'sample data', refProvLastName:'sample data', refProvFirstName:'sample data', refProvMiddleName:'sample data', refProvTaxonomyCode:'sample data', vendId:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendLastName:'sample data', vendFirstName:'sample data', vendAddress1:'sample data', vendPostalCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', acceptMedicareAssign:'sample data', insuredEmpName:'sample data', insuredAddress:'sample data', insuredCity:'sample data', insuredState:'sample data', insuredPostalCode:'sample data', insuredPhone:'sample data', insuredPlanName:'sample data', patientStatus:'sample data', otherInsuredLastName:'sample data', otherInsuredFirstName:'sample data', otherInsuredMiddleName:'sample data', otherInsuredDob:'2018-01-01', otherInsuredGender:'sample data', otherInsuredEmployer:'sample data', otherInsuredPlanName:'sample data', otherAccidentInd:'sample data', totalBalanceDue:1234, facilityName:'sample data', facilityAddress:'sample data', facilityCity:'sample data', facilityState:'sample data', facilityPostalCode:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleName:'sample data', subscriberSsn:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', companyId:'sample data', companyName:'sample data', companyAddress:'sample data', companyCity:'sample data', companyState:'sample data', companyPostalCode:'sample data', relInfoSign:'sample data', relInfoSignDate:'2018-01-01', relPayProv:'sample data', signRendProv:'sample data', signRendProvDate:'2018-01-01', natProvPracGroupId:'sample data', claimNo:'sample data', relationshipCode:'sample data', cobCode:'sample data', claimFilingInd:'sample data', insertDate:'2018-01-01', ocCarrierCode:'sample data', totalPatLiabilityAmt:1234, memberDateOfDeath:'2018-01-01', memberWeightPounds:1234, memberPregnancyInd:'sample data', spinalManipInitTreatment:'2018-01-01', spinalManipConditionCode:'sample data', spinalManipDesc1:'sample data', spinalManipDesc2:'sample data', spinalManipXrayAvailibility:'sample data', footCareLastVisitDate:'2018-01-01', mammographyCertNo:'sample data', epsdtReferral:'sample data', epsdtCode:'sample data', epsdtConditionInd1:'sample data', epsdtConditionInd2:'sample data', epsdtConditionInd3:'sample data', vendCity:'sample data', vendState:'sample data', vendAddress2:'sample data', subscriberAddress1:'sample data', subscriberAddress2:'sample data', subscriberCity:'sample data', subscriberState:'sample data'}

      ];
      service.getStagePsclmHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmhdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePsclmHdr);
    });
  });


  describe('#createStagePsclmHdr', () => {
    var id = 1;
    it('should return an Promise<StagePsclmHdr>', () => {
      const stagePsclmHdr: StagePsclmHdr = {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', seqClaimId:1234, originalRefNo:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNo:1234, secAuthNo:'sample data', diamondId:'sample data', subscriberId:'sample data', personNo:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleName:'sample data', patientSsn:'sample data', patientDob:'2018-01-01', patientGender:'sample data', patientAddress:'sample data', patientCity:'sample data', patientState:'sample data', patientPostalCode:'sample data', patientPhone:'sample data', receivedDate:'2018-01-01', totalBilledAmt:1234, placeOfService:'sample data', serviceRsn:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', paySubscriber:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patientControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate:'2018-01-01', subscriberZipCode:'sample data', patientAdd2:'sample data', provAddress2:'sample data', provMiddleName:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', cobPtRelCode:'sample data', totalOcAllowed:1234, facilityAddress2:'sample data', facilityTaxIdNo:'sample data', labTaxIdNo:'sample data', facilityNatlIdNo:'sample data', labNatlIdNo:'sample data', claimSubmReasonCode:'sample data', secDiamProvIdQual:'sample data', secDiamProvId:'sample data', secDiamVendIdQual:'sample data', secDiamVendId:'sample data', secDiamRefProvIdQual:'sample data', secDiamRefProvId:'sample data', dischargeDate:'2018-01-01', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', patientPaidAmt:1234, facilityNo:'sample data', labNo:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', provId:'sample data', provNationalId:'sample data', provTaxId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress1:'sample data', provCity:'sample data', provState:'sample data', provPostalCode:'sample data', provPhone:'sample data', provTaxonomyCode:'sample data', refProvId:'sample data', refProvNationalId:'sample data', refProvTaxId:'sample data', refProvLastName:'sample data', refProvFirstName:'sample data', refProvMiddleName:'sample data', refProvTaxonomyCode:'sample data', vendId:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendLastName:'sample data', vendFirstName:'sample data', vendAddress1:'sample data', vendPostalCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', acceptMedicareAssign:'sample data', insuredEmpName:'sample data', insuredAddress:'sample data', insuredCity:'sample data', insuredState:'sample data', insuredPostalCode:'sample data', insuredPhone:'sample data', insuredPlanName:'sample data', patientStatus:'sample data', otherInsuredLastName:'sample data', otherInsuredFirstName:'sample data', otherInsuredMiddleName:'sample data', otherInsuredDob:'2018-01-01', otherInsuredGender:'sample data', otherInsuredEmployer:'sample data', otherInsuredPlanName:'sample data', otherAccidentInd:'sample data', totalBalanceDue:1234, facilityName:'sample data', facilityAddress:'sample data', facilityCity:'sample data', facilityState:'sample data', facilityPostalCode:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleName:'sample data', subscriberSsn:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', companyId:'sample data', companyName:'sample data', companyAddress:'sample data', companyCity:'sample data', companyState:'sample data', companyPostalCode:'sample data', relInfoSign:'sample data', relInfoSignDate:'2018-01-01', relPayProv:'sample data', signRendProv:'sample data', signRendProvDate:'2018-01-01', natProvPracGroupId:'sample data', claimNo:'sample data', relationshipCode:'sample data', cobCode:'sample data', claimFilingInd:'sample data', insertDate:'2018-01-01', ocCarrierCode:'sample data', totalPatLiabilityAmt:1234, memberDateOfDeath:'2018-01-01', memberWeightPounds:1234, memberPregnancyInd:'sample data', spinalManipInitTreatment:'2018-01-01', spinalManipConditionCode:'sample data', spinalManipDesc1:'sample data', spinalManipDesc2:'sample data', spinalManipXrayAvailibility:'sample data', footCareLastVisitDate:'2018-01-01', mammographyCertNo:'sample data', epsdtReferral:'sample data', epsdtCode:'sample data', epsdtConditionInd1:'sample data', epsdtConditionInd2:'sample data', epsdtConditionInd3:'sample data', vendCity:'sample data', vendState:'sample data', vendAddress2:'sample data', subscriberAddress1:'sample data', subscriberAddress2:'sample data', subscriberCity:'sample data', subscriberState:'sample data'};
      service.createStagePsclmHdr(stagePsclmHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmhdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePsclmHdr', () => {
    var id = 1;
    it('should return an Promise<StagePsclmHdr>', () => {
      const stagePsclmHdr: StagePsclmHdr = {batchId:'sample data', transactionId:1234, transactionStatus:'sample data', seqClaimId:1234, originalRefNo:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNo:1234, secAuthNo:'sample data', diamondId:'sample data', subscriberId:'sample data', personNo:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleName:'sample data', patientSsn:'sample data', patientDob:'2018-01-01', patientGender:'sample data', patientAddress:'sample data', patientCity:'sample data', patientState:'sample data', patientPostalCode:'sample data', patientPhone:'sample data', receivedDate:'2018-01-01', totalBilledAmt:1234, placeOfService:'sample data', serviceRsn:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', paySubscriber:'sample data', otherInsuranceInd:'sample data', assignOfBenefits:'sample data', emplRelatedInd:'sample data', accidentInd:'sample data', accidentSymptomDate:'2018-01-01', patientControlNo:'sample data', provAssignInd:'sample data', sameSimilarSymptomInd:'sample data', sameSimilarSymptomDate:'2018-01-01', admissionDate:'2018-01-01', subscriberZipCode:'sample data', patientAdd2:'sample data', provAddress2:'sample data', provMiddleName:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', cobPtRelCode:'sample data', totalOcAllowed:1234, facilityAddress2:'sample data', facilityTaxIdNo:'sample data', labTaxIdNo:'sample data', facilityNatlIdNo:'sample data', labNatlIdNo:'sample data', claimSubmReasonCode:'sample data', secDiamProvIdQual:'sample data', secDiamProvId:'sample data', secDiamVendIdQual:'sample data', secDiamVendId:'sample data', secDiamRefProvIdQual:'sample data', secDiamRefProvId:'sample data', dischargeDate:'2018-01-01', unableToWorkBeginDate:'2018-01-01', unableToWorkThruDate:'2018-01-01', patientPaidAmt:1234, facilityNo:'sample data', labNo:'sample data', autoAccidentInd:'sample data', autoAccidentState:'sample data', releaseMedRecsInd:'sample data', provId:'sample data', provNationalId:'sample data', provTaxId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress1:'sample data', provCity:'sample data', provState:'sample data', provPostalCode:'sample data', provPhone:'sample data', provTaxonomyCode:'sample data', refProvId:'sample data', refProvNationalId:'sample data', refProvTaxId:'sample data', refProvLastName:'sample data', refProvFirstName:'sample data', refProvMiddleName:'sample data', refProvTaxonomyCode:'sample data', vendId:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendLastName:'sample data', vendFirstName:'sample data', vendAddress1:'sample data', vendPostalCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', reservedLocalUseHdr:'sample data', outsideLabInd:'sample data', outsideLabCharges:1234, medicaidResubmitCode:'sample data', acceptMedicareAssign:'sample data', insuredEmpName:'sample data', insuredAddress:'sample data', insuredCity:'sample data', insuredState:'sample data', insuredPostalCode:'sample data', insuredPhone:'sample data', insuredPlanName:'sample data', patientStatus:'sample data', otherInsuredLastName:'sample data', otherInsuredFirstName:'sample data', otherInsuredMiddleName:'sample data', otherInsuredDob:'2018-01-01', otherInsuredGender:'sample data', otherInsuredEmployer:'sample data', otherInsuredPlanName:'sample data', otherAccidentInd:'sample data', totalBalanceDue:1234, facilityName:'sample data', facilityAddress:'sample data', facilityCity:'sample data', facilityState:'sample data', facilityPostalCode:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleName:'sample data', subscriberSsn:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', companyId:'sample data', companyName:'sample data', companyAddress:'sample data', companyCity:'sample data', companyState:'sample data', companyPostalCode:'sample data', relInfoSign:'sample data', relInfoSignDate:'2018-01-01', relPayProv:'sample data', signRendProv:'sample data', signRendProvDate:'2018-01-01', natProvPracGroupId:'sample data', claimNo:'sample data', relationshipCode:'sample data', cobCode:'sample data', claimFilingInd:'sample data', insertDate:'2018-01-01', ocCarrierCode:'sample data', totalPatLiabilityAmt:1234, memberDateOfDeath:'2018-01-01', memberWeightPounds:1234, memberPregnancyInd:'sample data', spinalManipInitTreatment:'2018-01-01', spinalManipConditionCode:'sample data', spinalManipDesc1:'sample data', spinalManipDesc2:'sample data', spinalManipXrayAvailibility:'sample data', footCareLastVisitDate:'2018-01-01', mammographyCertNo:'sample data', epsdtReferral:'sample data', epsdtCode:'sample data', epsdtConditionInd1:'sample data', epsdtConditionInd2:'sample data', epsdtConditionInd3:'sample data', vendCity:'sample data', vendState:'sample data', vendAddress2:'sample data', subscriberAddress1:'sample data', subscriberAddress2:'sample data', subscriberCity:'sample data', subscriberState:'sample data'};
      service.updateStagePsclmHdr(stagePsclmHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmhdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePsclmHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePsclmHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmhdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});