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

import { MemberEligHistoryRetroService } from './member-elig-history-retro.service';
import { MemberEligHistoryRetro } from '../api-models/member-elig-history-retro.model'
import { MemberEligHistoryRetroes } from "../api-models/testing/fake-member-elig-history-retro.model"

describe('MemberEligHistoryRetroService', () => {
  let injector: TestBed;
  let service: MemberEligHistoryRetroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberEligHistoryRetroService]
    });
    injector = getTestBed();
    service = injector.get(MemberEligHistoryRetroService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberEligHistoryRetroes', () => {
    it('should return an Promise<MemberEligHistoryRetro[]>', () => {
      const memberEligHistoryRetro = [
       {seqEligHistRetro:1234, changeDateTime:'2018-01-01', changeType:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', salary:1234, pecEndDate:'2018-01-01', reasonCode:'sample data', pecWaived:'sample data', billEffectiveFromDate:'2018-01-01', billedThruDate:'2018-01-01', paidThruDate:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', useEftFlg:'sample data', benefitStartDate:'2018-01-01', seqEnrollmentRule:1234, mcareRiskAccretionDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskRefusedDate:'2018-01-01', comments:'sample data', userDefined2:'sample data', userDefined3:'sample data', rateType:'sample data', privacyOn:'sample data', entMcarePartAFlg:'sample data', entMcarePartBFlg:'sample data', entMcareWelfareFlg:'sample data', entMcarePipdcgFactor:1234, medicarePartAEffectDate:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', dateOfDeath:'2018-01-01', facName:'sample data', facAddressLine1:'sample data', facAddressLine2:'sample data', facCity:'sample data', facState:'sample data', facCounty:'sample data', facZipCode:'sample data', facCountry:'sample data', facPhoneNumber:'sample data', facAdmissionDate:'2018-01-01', facDischargeDate:'2018-01-01', facMmCertification:'sample data', medRiskUserDefined1:'sample data', medRiskUserDefined2:'sample data', medRiskUserDate1:'2018-01-01', medRiskUserDate2:'2018-01-01', pbpAcknowledgeIndicator:'sample data', mcUserDefined1:'sample data', mcUserDefined2:'sample data', mcUserDate1:'2018-01-01', mcUserDate2:'2018-01-01', pbpEffectiveDate:'2018-01-01', geocode:'sample data', pbp:'sample data', facSeqProvId:1234, csIndicator:'sample data', mcarePartABTermDate:'2018-01-01', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'},
       {seqEligHistRetro:1234, changeDateTime:'2018-01-01', changeType:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', salary:1234, pecEndDate:'2018-01-01', reasonCode:'sample data', pecWaived:'sample data', billEffectiveFromDate:'2018-01-01', billedThruDate:'2018-01-01', paidThruDate:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', useEftFlg:'sample data', benefitStartDate:'2018-01-01', seqEnrollmentRule:1234, mcareRiskAccretionDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskRefusedDate:'2018-01-01', comments:'sample data', userDefined2:'sample data', userDefined3:'sample data', rateType:'sample data', privacyOn:'sample data', entMcarePartAFlg:'sample data', entMcarePartBFlg:'sample data', entMcareWelfareFlg:'sample data', entMcarePipdcgFactor:1234, medicarePartAEffectDate:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', dateOfDeath:'2018-01-01', facName:'sample data', facAddressLine1:'sample data', facAddressLine2:'sample data', facCity:'sample data', facState:'sample data', facCounty:'sample data', facZipCode:'sample data', facCountry:'sample data', facPhoneNumber:'sample data', facAdmissionDate:'2018-01-01', facDischargeDate:'2018-01-01', facMmCertification:'sample data', medRiskUserDefined1:'sample data', medRiskUserDefined2:'sample data', medRiskUserDate1:'2018-01-01', medRiskUserDate2:'2018-01-01', pbpAcknowledgeIndicator:'sample data', mcUserDefined1:'sample data', mcUserDefined2:'sample data', mcUserDate1:'2018-01-01', mcUserDate2:'2018-01-01', pbpEffectiveDate:'2018-01-01', geocode:'sample data', pbp:'sample data', facSeqProvId:1234, csIndicator:'sample data', mcarePartABTermDate:'2018-01-01', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'},
       {seqEligHistRetro:1234, changeDateTime:'2018-01-01', changeType:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', salary:1234, pecEndDate:'2018-01-01', reasonCode:'sample data', pecWaived:'sample data', billEffectiveFromDate:'2018-01-01', billedThruDate:'2018-01-01', paidThruDate:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', useEftFlg:'sample data', benefitStartDate:'2018-01-01', seqEnrollmentRule:1234, mcareRiskAccretionDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskRefusedDate:'2018-01-01', comments:'sample data', userDefined2:'sample data', userDefined3:'sample data', rateType:'sample data', privacyOn:'sample data', entMcarePartAFlg:'sample data', entMcarePartBFlg:'sample data', entMcareWelfareFlg:'sample data', entMcarePipdcgFactor:1234, medicarePartAEffectDate:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', dateOfDeath:'2018-01-01', facName:'sample data', facAddressLine1:'sample data', facAddressLine2:'sample data', facCity:'sample data', facState:'sample data', facCounty:'sample data', facZipCode:'sample data', facCountry:'sample data', facPhoneNumber:'sample data', facAdmissionDate:'2018-01-01', facDischargeDate:'2018-01-01', facMmCertification:'sample data', medRiskUserDefined1:'sample data', medRiskUserDefined2:'sample data', medRiskUserDate1:'2018-01-01', medRiskUserDate2:'2018-01-01', pbpAcknowledgeIndicator:'sample data', mcUserDefined1:'sample data', mcUserDefined2:'sample data', mcUserDate1:'2018-01-01', mcUserDate2:'2018-01-01', pbpEffectiveDate:'2018-01-01', geocode:'sample data', pbp:'sample data', facSeqProvId:1234, csIndicator:'sample data', mcarePartABTermDate:'2018-01-01', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'}

      ];
      service.getMemberEligHistoryRetroes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistoryretroes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberEligHistoryRetro);
    });
  });


  describe('#createMemberEligHistoryRetro', () => {
    var id = 1;
    it('should return an Promise<MemberEligHistoryRetro>', () => {
      const memberEligHistoryRetro: MemberEligHistoryRetro = {seqEligHistRetro:1234, changeDateTime:'2018-01-01', changeType:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', salary:1234, pecEndDate:'2018-01-01', reasonCode:'sample data', pecWaived:'sample data', billEffectiveFromDate:'2018-01-01', billedThruDate:'2018-01-01', paidThruDate:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', useEftFlg:'sample data', benefitStartDate:'2018-01-01', seqEnrollmentRule:1234, mcareRiskAccretionDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskRefusedDate:'2018-01-01', comments:'sample data', userDefined2:'sample data', userDefined3:'sample data', rateType:'sample data', privacyOn:'sample data', entMcarePartAFlg:'sample data', entMcarePartBFlg:'sample data', entMcareWelfareFlg:'sample data', entMcarePipdcgFactor:1234, medicarePartAEffectDate:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', dateOfDeath:'2018-01-01', facName:'sample data', facAddressLine1:'sample data', facAddressLine2:'sample data', facCity:'sample data', facState:'sample data', facCounty:'sample data', facZipCode:'sample data', facCountry:'sample data', facPhoneNumber:'sample data', facAdmissionDate:'2018-01-01', facDischargeDate:'2018-01-01', facMmCertification:'sample data', medRiskUserDefined1:'sample data', medRiskUserDefined2:'sample data', medRiskUserDate1:'2018-01-01', medRiskUserDate2:'2018-01-01', pbpAcknowledgeIndicator:'sample data', mcUserDefined1:'sample data', mcUserDefined2:'sample data', mcUserDate1:'2018-01-01', mcUserDate2:'2018-01-01', pbpEffectiveDate:'2018-01-01', geocode:'sample data', pbp:'sample data', facSeqProvId:1234, csIndicator:'sample data', mcarePartABTermDate:'2018-01-01', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'};
      service.createMemberEligHistoryRetro(memberEligHistoryRetro).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistoryretroes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberEligHistoryRetro', () => {
    var id = 1;
    it('should return an Promise<MemberEligHistoryRetro>', () => {
      const memberEligHistoryRetro: MemberEligHistoryRetro = {seqEligHistRetro:1234, changeDateTime:'2018-01-01', changeType:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', salary:1234, pecEndDate:'2018-01-01', reasonCode:'sample data', pecWaived:'sample data', billEffectiveFromDate:'2018-01-01', billedThruDate:'2018-01-01', paidThruDate:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', useEftFlg:'sample data', benefitStartDate:'2018-01-01', seqEnrollmentRule:1234, mcareRiskAccretionDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskRefusedDate:'2018-01-01', comments:'sample data', userDefined2:'sample data', userDefined3:'sample data', rateType:'sample data', privacyOn:'sample data', entMcarePartAFlg:'sample data', entMcarePartBFlg:'sample data', entMcareWelfareFlg:'sample data', entMcarePipdcgFactor:1234, medicarePartAEffectDate:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', dateOfDeath:'2018-01-01', facName:'sample data', facAddressLine1:'sample data', facAddressLine2:'sample data', facCity:'sample data', facState:'sample data', facCounty:'sample data', facZipCode:'sample data', facCountry:'sample data', facPhoneNumber:'sample data', facAdmissionDate:'2018-01-01', facDischargeDate:'2018-01-01', facMmCertification:'sample data', medRiskUserDefined1:'sample data', medRiskUserDefined2:'sample data', medRiskUserDate1:'2018-01-01', medRiskUserDate2:'2018-01-01', pbpAcknowledgeIndicator:'sample data', mcUserDefined1:'sample data', mcUserDefined2:'sample data', mcUserDate1:'2018-01-01', mcUserDate2:'2018-01-01', pbpEffectiveDate:'2018-01-01', geocode:'sample data', pbp:'sample data', facSeqProvId:1234, csIndicator:'sample data', mcarePartABTermDate:'2018-01-01', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'};
      service.updateMemberEligHistoryRetro(memberEligHistoryRetro, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistoryretroes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberEligHistoryRetro', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberEligHistoryRetro(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistoryretroes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});