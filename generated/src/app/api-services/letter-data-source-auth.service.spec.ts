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

import { LetterDataSourceAuthService } from './letter-data-source-auth.service';
import { LetterDataSourceAuth } from '../api-models/letter-data-source-auth.model'
import { LetterDataSourceAuths } from "../api-models/testing/fake-letter-data-source-auth.model"

describe('LetterDataSourceAuthService', () => {
  let injector: TestBed;
  let service: LetterDataSourceAuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LetterDataSourceAuthService]
    });
    injector = getTestBed();
    service = injector.get(LetterDataSourceAuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLetterDataSourceAuths', () => {
    it('should return an Promise<LetterDataSourceAuth[]>', () => {
      const letterDataSourceAuth = [
       {seqLetterDataSource:1234, letterId:'sample data', letterIdSuffix:'sample data', aLastName:'sample data', aFirstName:'sample data', aShortName:'sample data', aAddrLine1:'sample data', aAddrLine2:'sample data', aCity:'sample data', aState:'sample data', aZipCode:'sample data', aPhoneNumber:'sample data', aContactName:'sample data', aContactTitle:'sample data', uAuthNumber:'sample data', uSecondaryAuthNo:'sample data', uAuthType:'sample data', uRequestedDt:'sample data', uRequestedDtText:'sample data', uSubsId:'sample data', uPersonNo:'sample data', uLastName:'sample data', uFirstName:'sample data', uMiddleInit:'sample data', uGender:'sample data', uGenderText:'sample data', uGrpId:'sample data', uGrpShortName:'sample data', uGrpLongName:'sample data', uPlanCode:'sample data', uPcpId:'sample data', uPcpSname:'sample data', uPcpLname:'sample data', uPcpFname:'sample data', uNsSubscriberId:'sample data', uMemberAge:'sample data', uIntakeDateTime:'sample data', uIntakeDateTimeText:'sample data', uCallerName:'sample data', uCallerPhoneNumber:'sample data', uPatientAcctNo:'sample data', uMedicalRecNo:'sample data', uIntakeUserDefined2:'sample data', uIntakeUserDefinedDt:'sample data', uIntakeUserDefinedDtText:'sample data', uReviewUserDefined1:'sample data', uReviewUserDefined2:'sample data', uReviewUserDefinedDt:'sample data', uReviewUserDefinedDtText:'sample data', uServiceUserDefined1:'sample data', uServiceUserDefined2:'sample data', uServiceUserDefinedDt:'sample data', uServiceUserDefinedDtText:'sample data', uStatusUserDefined1:'sample data', uStatusUserDefined2:'sample data', uStatusUserDefinedDt:'sample data', uStatusUserDefinedDtText:'sample data', uSurgCodesUserDefined1:'sample data', uSurgCodesUserDefined2:'sample data', uSurgCodesUserDefinedDt:'sample data', uSurgCodesUserDefDtText:'sample data', uNsLastName:'sample data', uNsFirstName:'sample data', uNsMiddleInitial:'sample data', uDiagnosis4:'sample data', uDiagnosis4Text:'sample data', uDiagnosis5:'sample data', uDiagnosis5Text:'sample data', uDiagnosis6:'sample data', uDiagnosis6Text:'sample data', uDiagnosis7:'sample data', uDiagnosis7Text:'sample data', uDiagnosis8:'sample data', uDiagnosis8Text:'sample data', uDiagnosis9:'sample data', uDiagnosis9Text:'sample data', uSurgProcedure4:'sample data', uProcedure4Dt:'sample data', uProcedure4DtText:'sample data', uSurgProcedure5:'sample data', uProcedure5Dt:'sample data', uProcedure5DtText:'sample data', uSurgProcedure6:'sample data', uProcedure6Dt:'sample data', uProcedure6DtText:'sample data', uDiagnosisNarrative:'sample data', uSurgicalProcedureNarrative:'sample data', uActiveDaysVisit:'sample data', uActiveProcedure:'sample data', uActiveAppeal:'sample data', uActivePhysicianAdvisor:'sample data', uActiveSecondOpinion:'sample data', uUrMessage:'sample data', rRfProvId:'sample data', rRfProvFname:'sample data', rRfProvLname:'sample data', rRfProvSname:'sample data', rRpProvId:'sample data', rRpProvFname:'sample data', rRpProvLname:'sample data', rRpProvSname:'sample data', rFcProvId:'sample data', rFcProvFname:'sample data', rFcProvLname:'sample data', rFcProvSname:'sample data', pPromptCode1:'sample data', pPromptCode2:'sample data', pPromptCode3:'sample data', pPromptCode4:'sample data', pPromptCode5:'sample data', pPromptCode6:'sample data', pPromptDate1:'sample data', pPromptDate2:'sample data', pPromptText1:'sample data', pPromptText2:'sample data', uPatientDob:'sample data', uSubscriberFname:'sample data', uSubscriberLname:'sample data', rAtProvId:'sample data', rAtProvFname:'sample data', rAtProvLname:'sample data', rAtProvSname:'sample data', rAdProvId:'sample data', rAdProvFname:'sample data', rAdProvLname:'sample data', rAdProvSname:'sample data', rInProvId:'sample data', rInProvFname:'sample data', rInProvLname:'sample data', rInProvSname:'sample data', aCountry:'sample data', uAdmitPrimaryDt:'sample data', uAdmitPrimaryDtText:'sample data', uEstimatedCost:'sample data', uExpirationDt:'sample data', uExpirationDtText:'sample data', uDiagnosis1:'sample data', uDiagnosis1Text:'sample data', uDiagnosis2:'sample data', uDiagnosis2Text:'sample data', uDiagnosis3:'sample data', uDiagnosis3Text:'sample data', uSurgProcedure1:'sample data', uProcedure1Dt:'sample data', uProcedure1DtText:'sample data', uSurgProcedure2:'sample data', uProcedure2Dt:'sample data', uProcedure2DtText:'sample data', uSurgProcedure3:'sample data', uProcedure3Dt:'sample data', uProcedure3DtText:'sample data', uReviewType:'sample data', uReviewer:'sample data', uFirstReviewDt:'sample data', uFirstReviewDtText:'sample data', uNextReviewDt:'sample data', uNextReviewDtText:'sample data', uLateNotification:'sample data', uServiceAdmitType:'sample data', uServiceAdmitTypeText:'sample data', uServiceReason:'sample data', uServiceReasonText:'sample data', uPlaceOfService:'sample data', uPlaceOfServiceText:'sample data', uMedDefCode:'sample data', uOverallStatus:'sample data', uStatusDt:'sample data', uStatusDtText:'sample data', uHoldReason:'sample data', uHoldReasonText:'sample data', uHoldDt:'sample data', uHoldDtText:'sample data', uClosedReason:'sample data', uClosedReasonText:'sample data', uClosedDt:'sample data', uClosedDtText:'sample data', uDeniedReason:'sample data', uDeniedReasonText:'sample data', uDeniedDt:'sample data', uDeniedDtText:'sample data', uSecondOpinionReq:'sample data', uNormDaysVisits:'sample data', uReqDaysVisits:'sample data', uAuthorizedDaysVis:'sample data', uDeniedDaysVis:'sample data', uAuthorizedCost:'sample data', uPriorDayAdmit:'sample data', uDischargeDiagnosis:'sample data', uDischThruDt:'sample data', uDischThruDtText:'sample data', uOutcome:'sample data', uOutcomeText:'sample data', uImpact:'sample data', uImpactText:'sample data', uDisposition:'sample data', uDispositionText:'sample data', uCaseManager:'sample data', uCaseNumber:'sample data', uCaseReferralDt:'sample data', uCaseReferralDtText:'sample data', uDataGroups:'sample data', uDatesUserDefined1:'sample data', uDatesUserDefined2:'sample data', uDatesUserDefinedDt:'sample data', uDatesUserDefinedDtText:'sample data', uDaysVisitsUserDefined1:'sample data', uDaysVisitsUserDefined2:'sample data', uDaysVisitsUserDefinedDt:'sample data', uDaysVisUserDefDtText:'sample data', uDischargeUserDefined1:'sample data', uDischargeUserDefined2:'sample data', uDischargeUserDefinedDt:'sample data', uDischargeUserDefDtText:'sample data', uDxCodesUserDefined1:'sample data', uDxCodesUserDefined2:'sample data', uDxCodesUserDefinedDt:'sample data', uDxCodesUserDefDtText:'sample data', uIntakeUserDefined1:'sample data'},
       {seqLetterDataSource:1234, letterId:'sample data', letterIdSuffix:'sample data', aLastName:'sample data', aFirstName:'sample data', aShortName:'sample data', aAddrLine1:'sample data', aAddrLine2:'sample data', aCity:'sample data', aState:'sample data', aZipCode:'sample data', aPhoneNumber:'sample data', aContactName:'sample data', aContactTitle:'sample data', uAuthNumber:'sample data', uSecondaryAuthNo:'sample data', uAuthType:'sample data', uRequestedDt:'sample data', uRequestedDtText:'sample data', uSubsId:'sample data', uPersonNo:'sample data', uLastName:'sample data', uFirstName:'sample data', uMiddleInit:'sample data', uGender:'sample data', uGenderText:'sample data', uGrpId:'sample data', uGrpShortName:'sample data', uGrpLongName:'sample data', uPlanCode:'sample data', uPcpId:'sample data', uPcpSname:'sample data', uPcpLname:'sample data', uPcpFname:'sample data', uNsSubscriberId:'sample data', uMemberAge:'sample data', uIntakeDateTime:'sample data', uIntakeDateTimeText:'sample data', uCallerName:'sample data', uCallerPhoneNumber:'sample data', uPatientAcctNo:'sample data', uMedicalRecNo:'sample data', uIntakeUserDefined2:'sample data', uIntakeUserDefinedDt:'sample data', uIntakeUserDefinedDtText:'sample data', uReviewUserDefined1:'sample data', uReviewUserDefined2:'sample data', uReviewUserDefinedDt:'sample data', uReviewUserDefinedDtText:'sample data', uServiceUserDefined1:'sample data', uServiceUserDefined2:'sample data', uServiceUserDefinedDt:'sample data', uServiceUserDefinedDtText:'sample data', uStatusUserDefined1:'sample data', uStatusUserDefined2:'sample data', uStatusUserDefinedDt:'sample data', uStatusUserDefinedDtText:'sample data', uSurgCodesUserDefined1:'sample data', uSurgCodesUserDefined2:'sample data', uSurgCodesUserDefinedDt:'sample data', uSurgCodesUserDefDtText:'sample data', uNsLastName:'sample data', uNsFirstName:'sample data', uNsMiddleInitial:'sample data', uDiagnosis4:'sample data', uDiagnosis4Text:'sample data', uDiagnosis5:'sample data', uDiagnosis5Text:'sample data', uDiagnosis6:'sample data', uDiagnosis6Text:'sample data', uDiagnosis7:'sample data', uDiagnosis7Text:'sample data', uDiagnosis8:'sample data', uDiagnosis8Text:'sample data', uDiagnosis9:'sample data', uDiagnosis9Text:'sample data', uSurgProcedure4:'sample data', uProcedure4Dt:'sample data', uProcedure4DtText:'sample data', uSurgProcedure5:'sample data', uProcedure5Dt:'sample data', uProcedure5DtText:'sample data', uSurgProcedure6:'sample data', uProcedure6Dt:'sample data', uProcedure6DtText:'sample data', uDiagnosisNarrative:'sample data', uSurgicalProcedureNarrative:'sample data', uActiveDaysVisit:'sample data', uActiveProcedure:'sample data', uActiveAppeal:'sample data', uActivePhysicianAdvisor:'sample data', uActiveSecondOpinion:'sample data', uUrMessage:'sample data', rRfProvId:'sample data', rRfProvFname:'sample data', rRfProvLname:'sample data', rRfProvSname:'sample data', rRpProvId:'sample data', rRpProvFname:'sample data', rRpProvLname:'sample data', rRpProvSname:'sample data', rFcProvId:'sample data', rFcProvFname:'sample data', rFcProvLname:'sample data', rFcProvSname:'sample data', pPromptCode1:'sample data', pPromptCode2:'sample data', pPromptCode3:'sample data', pPromptCode4:'sample data', pPromptCode5:'sample data', pPromptCode6:'sample data', pPromptDate1:'sample data', pPromptDate2:'sample data', pPromptText1:'sample data', pPromptText2:'sample data', uPatientDob:'sample data', uSubscriberFname:'sample data', uSubscriberLname:'sample data', rAtProvId:'sample data', rAtProvFname:'sample data', rAtProvLname:'sample data', rAtProvSname:'sample data', rAdProvId:'sample data', rAdProvFname:'sample data', rAdProvLname:'sample data', rAdProvSname:'sample data', rInProvId:'sample data', rInProvFname:'sample data', rInProvLname:'sample data', rInProvSname:'sample data', aCountry:'sample data', uAdmitPrimaryDt:'sample data', uAdmitPrimaryDtText:'sample data', uEstimatedCost:'sample data', uExpirationDt:'sample data', uExpirationDtText:'sample data', uDiagnosis1:'sample data', uDiagnosis1Text:'sample data', uDiagnosis2:'sample data', uDiagnosis2Text:'sample data', uDiagnosis3:'sample data', uDiagnosis3Text:'sample data', uSurgProcedure1:'sample data', uProcedure1Dt:'sample data', uProcedure1DtText:'sample data', uSurgProcedure2:'sample data', uProcedure2Dt:'sample data', uProcedure2DtText:'sample data', uSurgProcedure3:'sample data', uProcedure3Dt:'sample data', uProcedure3DtText:'sample data', uReviewType:'sample data', uReviewer:'sample data', uFirstReviewDt:'sample data', uFirstReviewDtText:'sample data', uNextReviewDt:'sample data', uNextReviewDtText:'sample data', uLateNotification:'sample data', uServiceAdmitType:'sample data', uServiceAdmitTypeText:'sample data', uServiceReason:'sample data', uServiceReasonText:'sample data', uPlaceOfService:'sample data', uPlaceOfServiceText:'sample data', uMedDefCode:'sample data', uOverallStatus:'sample data', uStatusDt:'sample data', uStatusDtText:'sample data', uHoldReason:'sample data', uHoldReasonText:'sample data', uHoldDt:'sample data', uHoldDtText:'sample data', uClosedReason:'sample data', uClosedReasonText:'sample data', uClosedDt:'sample data', uClosedDtText:'sample data', uDeniedReason:'sample data', uDeniedReasonText:'sample data', uDeniedDt:'sample data', uDeniedDtText:'sample data', uSecondOpinionReq:'sample data', uNormDaysVisits:'sample data', uReqDaysVisits:'sample data', uAuthorizedDaysVis:'sample data', uDeniedDaysVis:'sample data', uAuthorizedCost:'sample data', uPriorDayAdmit:'sample data', uDischargeDiagnosis:'sample data', uDischThruDt:'sample data', uDischThruDtText:'sample data', uOutcome:'sample data', uOutcomeText:'sample data', uImpact:'sample data', uImpactText:'sample data', uDisposition:'sample data', uDispositionText:'sample data', uCaseManager:'sample data', uCaseNumber:'sample data', uCaseReferralDt:'sample data', uCaseReferralDtText:'sample data', uDataGroups:'sample data', uDatesUserDefined1:'sample data', uDatesUserDefined2:'sample data', uDatesUserDefinedDt:'sample data', uDatesUserDefinedDtText:'sample data', uDaysVisitsUserDefined1:'sample data', uDaysVisitsUserDefined2:'sample data', uDaysVisitsUserDefinedDt:'sample data', uDaysVisUserDefDtText:'sample data', uDischargeUserDefined1:'sample data', uDischargeUserDefined2:'sample data', uDischargeUserDefinedDt:'sample data', uDischargeUserDefDtText:'sample data', uDxCodesUserDefined1:'sample data', uDxCodesUserDefined2:'sample data', uDxCodesUserDefinedDt:'sample data', uDxCodesUserDefDtText:'sample data', uIntakeUserDefined1:'sample data'},
       {seqLetterDataSource:1234, letterId:'sample data', letterIdSuffix:'sample data', aLastName:'sample data', aFirstName:'sample data', aShortName:'sample data', aAddrLine1:'sample data', aAddrLine2:'sample data', aCity:'sample data', aState:'sample data', aZipCode:'sample data', aPhoneNumber:'sample data', aContactName:'sample data', aContactTitle:'sample data', uAuthNumber:'sample data', uSecondaryAuthNo:'sample data', uAuthType:'sample data', uRequestedDt:'sample data', uRequestedDtText:'sample data', uSubsId:'sample data', uPersonNo:'sample data', uLastName:'sample data', uFirstName:'sample data', uMiddleInit:'sample data', uGender:'sample data', uGenderText:'sample data', uGrpId:'sample data', uGrpShortName:'sample data', uGrpLongName:'sample data', uPlanCode:'sample data', uPcpId:'sample data', uPcpSname:'sample data', uPcpLname:'sample data', uPcpFname:'sample data', uNsSubscriberId:'sample data', uMemberAge:'sample data', uIntakeDateTime:'sample data', uIntakeDateTimeText:'sample data', uCallerName:'sample data', uCallerPhoneNumber:'sample data', uPatientAcctNo:'sample data', uMedicalRecNo:'sample data', uIntakeUserDefined2:'sample data', uIntakeUserDefinedDt:'sample data', uIntakeUserDefinedDtText:'sample data', uReviewUserDefined1:'sample data', uReviewUserDefined2:'sample data', uReviewUserDefinedDt:'sample data', uReviewUserDefinedDtText:'sample data', uServiceUserDefined1:'sample data', uServiceUserDefined2:'sample data', uServiceUserDefinedDt:'sample data', uServiceUserDefinedDtText:'sample data', uStatusUserDefined1:'sample data', uStatusUserDefined2:'sample data', uStatusUserDefinedDt:'sample data', uStatusUserDefinedDtText:'sample data', uSurgCodesUserDefined1:'sample data', uSurgCodesUserDefined2:'sample data', uSurgCodesUserDefinedDt:'sample data', uSurgCodesUserDefDtText:'sample data', uNsLastName:'sample data', uNsFirstName:'sample data', uNsMiddleInitial:'sample data', uDiagnosis4:'sample data', uDiagnosis4Text:'sample data', uDiagnosis5:'sample data', uDiagnosis5Text:'sample data', uDiagnosis6:'sample data', uDiagnosis6Text:'sample data', uDiagnosis7:'sample data', uDiagnosis7Text:'sample data', uDiagnosis8:'sample data', uDiagnosis8Text:'sample data', uDiagnosis9:'sample data', uDiagnosis9Text:'sample data', uSurgProcedure4:'sample data', uProcedure4Dt:'sample data', uProcedure4DtText:'sample data', uSurgProcedure5:'sample data', uProcedure5Dt:'sample data', uProcedure5DtText:'sample data', uSurgProcedure6:'sample data', uProcedure6Dt:'sample data', uProcedure6DtText:'sample data', uDiagnosisNarrative:'sample data', uSurgicalProcedureNarrative:'sample data', uActiveDaysVisit:'sample data', uActiveProcedure:'sample data', uActiveAppeal:'sample data', uActivePhysicianAdvisor:'sample data', uActiveSecondOpinion:'sample data', uUrMessage:'sample data', rRfProvId:'sample data', rRfProvFname:'sample data', rRfProvLname:'sample data', rRfProvSname:'sample data', rRpProvId:'sample data', rRpProvFname:'sample data', rRpProvLname:'sample data', rRpProvSname:'sample data', rFcProvId:'sample data', rFcProvFname:'sample data', rFcProvLname:'sample data', rFcProvSname:'sample data', pPromptCode1:'sample data', pPromptCode2:'sample data', pPromptCode3:'sample data', pPromptCode4:'sample data', pPromptCode5:'sample data', pPromptCode6:'sample data', pPromptDate1:'sample data', pPromptDate2:'sample data', pPromptText1:'sample data', pPromptText2:'sample data', uPatientDob:'sample data', uSubscriberFname:'sample data', uSubscriberLname:'sample data', rAtProvId:'sample data', rAtProvFname:'sample data', rAtProvLname:'sample data', rAtProvSname:'sample data', rAdProvId:'sample data', rAdProvFname:'sample data', rAdProvLname:'sample data', rAdProvSname:'sample data', rInProvId:'sample data', rInProvFname:'sample data', rInProvLname:'sample data', rInProvSname:'sample data', aCountry:'sample data', uAdmitPrimaryDt:'sample data', uAdmitPrimaryDtText:'sample data', uEstimatedCost:'sample data', uExpirationDt:'sample data', uExpirationDtText:'sample data', uDiagnosis1:'sample data', uDiagnosis1Text:'sample data', uDiagnosis2:'sample data', uDiagnosis2Text:'sample data', uDiagnosis3:'sample data', uDiagnosis3Text:'sample data', uSurgProcedure1:'sample data', uProcedure1Dt:'sample data', uProcedure1DtText:'sample data', uSurgProcedure2:'sample data', uProcedure2Dt:'sample data', uProcedure2DtText:'sample data', uSurgProcedure3:'sample data', uProcedure3Dt:'sample data', uProcedure3DtText:'sample data', uReviewType:'sample data', uReviewer:'sample data', uFirstReviewDt:'sample data', uFirstReviewDtText:'sample data', uNextReviewDt:'sample data', uNextReviewDtText:'sample data', uLateNotification:'sample data', uServiceAdmitType:'sample data', uServiceAdmitTypeText:'sample data', uServiceReason:'sample data', uServiceReasonText:'sample data', uPlaceOfService:'sample data', uPlaceOfServiceText:'sample data', uMedDefCode:'sample data', uOverallStatus:'sample data', uStatusDt:'sample data', uStatusDtText:'sample data', uHoldReason:'sample data', uHoldReasonText:'sample data', uHoldDt:'sample data', uHoldDtText:'sample data', uClosedReason:'sample data', uClosedReasonText:'sample data', uClosedDt:'sample data', uClosedDtText:'sample data', uDeniedReason:'sample data', uDeniedReasonText:'sample data', uDeniedDt:'sample data', uDeniedDtText:'sample data', uSecondOpinionReq:'sample data', uNormDaysVisits:'sample data', uReqDaysVisits:'sample data', uAuthorizedDaysVis:'sample data', uDeniedDaysVis:'sample data', uAuthorizedCost:'sample data', uPriorDayAdmit:'sample data', uDischargeDiagnosis:'sample data', uDischThruDt:'sample data', uDischThruDtText:'sample data', uOutcome:'sample data', uOutcomeText:'sample data', uImpact:'sample data', uImpactText:'sample data', uDisposition:'sample data', uDispositionText:'sample data', uCaseManager:'sample data', uCaseNumber:'sample data', uCaseReferralDt:'sample data', uCaseReferralDtText:'sample data', uDataGroups:'sample data', uDatesUserDefined1:'sample data', uDatesUserDefined2:'sample data', uDatesUserDefinedDt:'sample data', uDatesUserDefinedDtText:'sample data', uDaysVisitsUserDefined1:'sample data', uDaysVisitsUserDefined2:'sample data', uDaysVisitsUserDefinedDt:'sample data', uDaysVisUserDefDtText:'sample data', uDischargeUserDefined1:'sample data', uDischargeUserDefined2:'sample data', uDischargeUserDefinedDt:'sample data', uDischargeUserDefDtText:'sample data', uDxCodesUserDefined1:'sample data', uDxCodesUserDefined2:'sample data', uDxCodesUserDefinedDt:'sample data', uDxCodesUserDefDtText:'sample data', uIntakeUserDefined1:'sample data'}

      ];
      service.getLetterDataSourceAuths().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/letterdatasourceauths/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(letterDataSourceAuth);
    });
  });


  describe('#createLetterDataSourceAuth', () => {
    var id = 1;
    it('should return an Promise<LetterDataSourceAuth>', () => {
      const letterDataSourceAuth: LetterDataSourceAuth = {seqLetterDataSource:1234, letterId:'sample data', letterIdSuffix:'sample data', aLastName:'sample data', aFirstName:'sample data', aShortName:'sample data', aAddrLine1:'sample data', aAddrLine2:'sample data', aCity:'sample data', aState:'sample data', aZipCode:'sample data', aPhoneNumber:'sample data', aContactName:'sample data', aContactTitle:'sample data', uAuthNumber:'sample data', uSecondaryAuthNo:'sample data', uAuthType:'sample data', uRequestedDt:'sample data', uRequestedDtText:'sample data', uSubsId:'sample data', uPersonNo:'sample data', uLastName:'sample data', uFirstName:'sample data', uMiddleInit:'sample data', uGender:'sample data', uGenderText:'sample data', uGrpId:'sample data', uGrpShortName:'sample data', uGrpLongName:'sample data', uPlanCode:'sample data', uPcpId:'sample data', uPcpSname:'sample data', uPcpLname:'sample data', uPcpFname:'sample data', uNsSubscriberId:'sample data', uMemberAge:'sample data', uIntakeDateTime:'sample data', uIntakeDateTimeText:'sample data', uCallerName:'sample data', uCallerPhoneNumber:'sample data', uPatientAcctNo:'sample data', uMedicalRecNo:'sample data', uIntakeUserDefined2:'sample data', uIntakeUserDefinedDt:'sample data', uIntakeUserDefinedDtText:'sample data', uReviewUserDefined1:'sample data', uReviewUserDefined2:'sample data', uReviewUserDefinedDt:'sample data', uReviewUserDefinedDtText:'sample data', uServiceUserDefined1:'sample data', uServiceUserDefined2:'sample data', uServiceUserDefinedDt:'sample data', uServiceUserDefinedDtText:'sample data', uStatusUserDefined1:'sample data', uStatusUserDefined2:'sample data', uStatusUserDefinedDt:'sample data', uStatusUserDefinedDtText:'sample data', uSurgCodesUserDefined1:'sample data', uSurgCodesUserDefined2:'sample data', uSurgCodesUserDefinedDt:'sample data', uSurgCodesUserDefDtText:'sample data', uNsLastName:'sample data', uNsFirstName:'sample data', uNsMiddleInitial:'sample data', uDiagnosis4:'sample data', uDiagnosis4Text:'sample data', uDiagnosis5:'sample data', uDiagnosis5Text:'sample data', uDiagnosis6:'sample data', uDiagnosis6Text:'sample data', uDiagnosis7:'sample data', uDiagnosis7Text:'sample data', uDiagnosis8:'sample data', uDiagnosis8Text:'sample data', uDiagnosis9:'sample data', uDiagnosis9Text:'sample data', uSurgProcedure4:'sample data', uProcedure4Dt:'sample data', uProcedure4DtText:'sample data', uSurgProcedure5:'sample data', uProcedure5Dt:'sample data', uProcedure5DtText:'sample data', uSurgProcedure6:'sample data', uProcedure6Dt:'sample data', uProcedure6DtText:'sample data', uDiagnosisNarrative:'sample data', uSurgicalProcedureNarrative:'sample data', uActiveDaysVisit:'sample data', uActiveProcedure:'sample data', uActiveAppeal:'sample data', uActivePhysicianAdvisor:'sample data', uActiveSecondOpinion:'sample data', uUrMessage:'sample data', rRfProvId:'sample data', rRfProvFname:'sample data', rRfProvLname:'sample data', rRfProvSname:'sample data', rRpProvId:'sample data', rRpProvFname:'sample data', rRpProvLname:'sample data', rRpProvSname:'sample data', rFcProvId:'sample data', rFcProvFname:'sample data', rFcProvLname:'sample data', rFcProvSname:'sample data', pPromptCode1:'sample data', pPromptCode2:'sample data', pPromptCode3:'sample data', pPromptCode4:'sample data', pPromptCode5:'sample data', pPromptCode6:'sample data', pPromptDate1:'sample data', pPromptDate2:'sample data', pPromptText1:'sample data', pPromptText2:'sample data', uPatientDob:'sample data', uSubscriberFname:'sample data', uSubscriberLname:'sample data', rAtProvId:'sample data', rAtProvFname:'sample data', rAtProvLname:'sample data', rAtProvSname:'sample data', rAdProvId:'sample data', rAdProvFname:'sample data', rAdProvLname:'sample data', rAdProvSname:'sample data', rInProvId:'sample data', rInProvFname:'sample data', rInProvLname:'sample data', rInProvSname:'sample data', aCountry:'sample data', uAdmitPrimaryDt:'sample data', uAdmitPrimaryDtText:'sample data', uEstimatedCost:'sample data', uExpirationDt:'sample data', uExpirationDtText:'sample data', uDiagnosis1:'sample data', uDiagnosis1Text:'sample data', uDiagnosis2:'sample data', uDiagnosis2Text:'sample data', uDiagnosis3:'sample data', uDiagnosis3Text:'sample data', uSurgProcedure1:'sample data', uProcedure1Dt:'sample data', uProcedure1DtText:'sample data', uSurgProcedure2:'sample data', uProcedure2Dt:'sample data', uProcedure2DtText:'sample data', uSurgProcedure3:'sample data', uProcedure3Dt:'sample data', uProcedure3DtText:'sample data', uReviewType:'sample data', uReviewer:'sample data', uFirstReviewDt:'sample data', uFirstReviewDtText:'sample data', uNextReviewDt:'sample data', uNextReviewDtText:'sample data', uLateNotification:'sample data', uServiceAdmitType:'sample data', uServiceAdmitTypeText:'sample data', uServiceReason:'sample data', uServiceReasonText:'sample data', uPlaceOfService:'sample data', uPlaceOfServiceText:'sample data', uMedDefCode:'sample data', uOverallStatus:'sample data', uStatusDt:'sample data', uStatusDtText:'sample data', uHoldReason:'sample data', uHoldReasonText:'sample data', uHoldDt:'sample data', uHoldDtText:'sample data', uClosedReason:'sample data', uClosedReasonText:'sample data', uClosedDt:'sample data', uClosedDtText:'sample data', uDeniedReason:'sample data', uDeniedReasonText:'sample data', uDeniedDt:'sample data', uDeniedDtText:'sample data', uSecondOpinionReq:'sample data', uNormDaysVisits:'sample data', uReqDaysVisits:'sample data', uAuthorizedDaysVis:'sample data', uDeniedDaysVis:'sample data', uAuthorizedCost:'sample data', uPriorDayAdmit:'sample data', uDischargeDiagnosis:'sample data', uDischThruDt:'sample data', uDischThruDtText:'sample data', uOutcome:'sample data', uOutcomeText:'sample data', uImpact:'sample data', uImpactText:'sample data', uDisposition:'sample data', uDispositionText:'sample data', uCaseManager:'sample data', uCaseNumber:'sample data', uCaseReferralDt:'sample data', uCaseReferralDtText:'sample data', uDataGroups:'sample data', uDatesUserDefined1:'sample data', uDatesUserDefined2:'sample data', uDatesUserDefinedDt:'sample data', uDatesUserDefinedDtText:'sample data', uDaysVisitsUserDefined1:'sample data', uDaysVisitsUserDefined2:'sample data', uDaysVisitsUserDefinedDt:'sample data', uDaysVisUserDefDtText:'sample data', uDischargeUserDefined1:'sample data', uDischargeUserDefined2:'sample data', uDischargeUserDefinedDt:'sample data', uDischargeUserDefDtText:'sample data', uDxCodesUserDefined1:'sample data', uDxCodesUserDefined2:'sample data', uDxCodesUserDefinedDt:'sample data', uDxCodesUserDefDtText:'sample data', uIntakeUserDefined1:'sample data'};
      service.createLetterDataSourceAuth(letterDataSourceAuth).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterdatasourceauths`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLetterDataSourceAuth', () => {
    var id = 1;
    it('should return an Promise<LetterDataSourceAuth>', () => {
      const letterDataSourceAuth: LetterDataSourceAuth = {seqLetterDataSource:1234, letterId:'sample data', letterIdSuffix:'sample data', aLastName:'sample data', aFirstName:'sample data', aShortName:'sample data', aAddrLine1:'sample data', aAddrLine2:'sample data', aCity:'sample data', aState:'sample data', aZipCode:'sample data', aPhoneNumber:'sample data', aContactName:'sample data', aContactTitle:'sample data', uAuthNumber:'sample data', uSecondaryAuthNo:'sample data', uAuthType:'sample data', uRequestedDt:'sample data', uRequestedDtText:'sample data', uSubsId:'sample data', uPersonNo:'sample data', uLastName:'sample data', uFirstName:'sample data', uMiddleInit:'sample data', uGender:'sample data', uGenderText:'sample data', uGrpId:'sample data', uGrpShortName:'sample data', uGrpLongName:'sample data', uPlanCode:'sample data', uPcpId:'sample data', uPcpSname:'sample data', uPcpLname:'sample data', uPcpFname:'sample data', uNsSubscriberId:'sample data', uMemberAge:'sample data', uIntakeDateTime:'sample data', uIntakeDateTimeText:'sample data', uCallerName:'sample data', uCallerPhoneNumber:'sample data', uPatientAcctNo:'sample data', uMedicalRecNo:'sample data', uIntakeUserDefined2:'sample data', uIntakeUserDefinedDt:'sample data', uIntakeUserDefinedDtText:'sample data', uReviewUserDefined1:'sample data', uReviewUserDefined2:'sample data', uReviewUserDefinedDt:'sample data', uReviewUserDefinedDtText:'sample data', uServiceUserDefined1:'sample data', uServiceUserDefined2:'sample data', uServiceUserDefinedDt:'sample data', uServiceUserDefinedDtText:'sample data', uStatusUserDefined1:'sample data', uStatusUserDefined2:'sample data', uStatusUserDefinedDt:'sample data', uStatusUserDefinedDtText:'sample data', uSurgCodesUserDefined1:'sample data', uSurgCodesUserDefined2:'sample data', uSurgCodesUserDefinedDt:'sample data', uSurgCodesUserDefDtText:'sample data', uNsLastName:'sample data', uNsFirstName:'sample data', uNsMiddleInitial:'sample data', uDiagnosis4:'sample data', uDiagnosis4Text:'sample data', uDiagnosis5:'sample data', uDiagnosis5Text:'sample data', uDiagnosis6:'sample data', uDiagnosis6Text:'sample data', uDiagnosis7:'sample data', uDiagnosis7Text:'sample data', uDiagnosis8:'sample data', uDiagnosis8Text:'sample data', uDiagnosis9:'sample data', uDiagnosis9Text:'sample data', uSurgProcedure4:'sample data', uProcedure4Dt:'sample data', uProcedure4DtText:'sample data', uSurgProcedure5:'sample data', uProcedure5Dt:'sample data', uProcedure5DtText:'sample data', uSurgProcedure6:'sample data', uProcedure6Dt:'sample data', uProcedure6DtText:'sample data', uDiagnosisNarrative:'sample data', uSurgicalProcedureNarrative:'sample data', uActiveDaysVisit:'sample data', uActiveProcedure:'sample data', uActiveAppeal:'sample data', uActivePhysicianAdvisor:'sample data', uActiveSecondOpinion:'sample data', uUrMessage:'sample data', rRfProvId:'sample data', rRfProvFname:'sample data', rRfProvLname:'sample data', rRfProvSname:'sample data', rRpProvId:'sample data', rRpProvFname:'sample data', rRpProvLname:'sample data', rRpProvSname:'sample data', rFcProvId:'sample data', rFcProvFname:'sample data', rFcProvLname:'sample data', rFcProvSname:'sample data', pPromptCode1:'sample data', pPromptCode2:'sample data', pPromptCode3:'sample data', pPromptCode4:'sample data', pPromptCode5:'sample data', pPromptCode6:'sample data', pPromptDate1:'sample data', pPromptDate2:'sample data', pPromptText1:'sample data', pPromptText2:'sample data', uPatientDob:'sample data', uSubscriberFname:'sample data', uSubscriberLname:'sample data', rAtProvId:'sample data', rAtProvFname:'sample data', rAtProvLname:'sample data', rAtProvSname:'sample data', rAdProvId:'sample data', rAdProvFname:'sample data', rAdProvLname:'sample data', rAdProvSname:'sample data', rInProvId:'sample data', rInProvFname:'sample data', rInProvLname:'sample data', rInProvSname:'sample data', aCountry:'sample data', uAdmitPrimaryDt:'sample data', uAdmitPrimaryDtText:'sample data', uEstimatedCost:'sample data', uExpirationDt:'sample data', uExpirationDtText:'sample data', uDiagnosis1:'sample data', uDiagnosis1Text:'sample data', uDiagnosis2:'sample data', uDiagnosis2Text:'sample data', uDiagnosis3:'sample data', uDiagnosis3Text:'sample data', uSurgProcedure1:'sample data', uProcedure1Dt:'sample data', uProcedure1DtText:'sample data', uSurgProcedure2:'sample data', uProcedure2Dt:'sample data', uProcedure2DtText:'sample data', uSurgProcedure3:'sample data', uProcedure3Dt:'sample data', uProcedure3DtText:'sample data', uReviewType:'sample data', uReviewer:'sample data', uFirstReviewDt:'sample data', uFirstReviewDtText:'sample data', uNextReviewDt:'sample data', uNextReviewDtText:'sample data', uLateNotification:'sample data', uServiceAdmitType:'sample data', uServiceAdmitTypeText:'sample data', uServiceReason:'sample data', uServiceReasonText:'sample data', uPlaceOfService:'sample data', uPlaceOfServiceText:'sample data', uMedDefCode:'sample data', uOverallStatus:'sample data', uStatusDt:'sample data', uStatusDtText:'sample data', uHoldReason:'sample data', uHoldReasonText:'sample data', uHoldDt:'sample data', uHoldDtText:'sample data', uClosedReason:'sample data', uClosedReasonText:'sample data', uClosedDt:'sample data', uClosedDtText:'sample data', uDeniedReason:'sample data', uDeniedReasonText:'sample data', uDeniedDt:'sample data', uDeniedDtText:'sample data', uSecondOpinionReq:'sample data', uNormDaysVisits:'sample data', uReqDaysVisits:'sample data', uAuthorizedDaysVis:'sample data', uDeniedDaysVis:'sample data', uAuthorizedCost:'sample data', uPriorDayAdmit:'sample data', uDischargeDiagnosis:'sample data', uDischThruDt:'sample data', uDischThruDtText:'sample data', uOutcome:'sample data', uOutcomeText:'sample data', uImpact:'sample data', uImpactText:'sample data', uDisposition:'sample data', uDispositionText:'sample data', uCaseManager:'sample data', uCaseNumber:'sample data', uCaseReferralDt:'sample data', uCaseReferralDtText:'sample data', uDataGroups:'sample data', uDatesUserDefined1:'sample data', uDatesUserDefined2:'sample data', uDatesUserDefinedDt:'sample data', uDatesUserDefinedDtText:'sample data', uDaysVisitsUserDefined1:'sample data', uDaysVisitsUserDefined2:'sample data', uDaysVisitsUserDefinedDt:'sample data', uDaysVisUserDefDtText:'sample data', uDischargeUserDefined1:'sample data', uDischargeUserDefined2:'sample data', uDischargeUserDefinedDt:'sample data', uDischargeUserDefDtText:'sample data', uDxCodesUserDefined1:'sample data', uDxCodesUserDefined2:'sample data', uDxCodesUserDefinedDt:'sample data', uDxCodesUserDefDtText:'sample data', uIntakeUserDefined1:'sample data'};
      service.updateLetterDataSourceAuth(letterDataSourceAuth, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterdatasourceauths/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLetterDataSourceAuth', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLetterDataSourceAuth(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterdatasourceauths/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});