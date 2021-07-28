/* Copyright (c) 2021 . All Rights Reserved. */

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

import { MemberEligHistoryService } from './member-elig-history.service';
import { MemberEligHistory } from '../api-models/member-elig-history.model'
import { MemberEligHistorys } from "../api-models/testing/fake-member-elig-history.model"

describe('MemberEligHistoryService', () => {
  let injector: TestBed;
  let service: MemberEligHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberEligHistoryService]
    });
    injector = getTestBed();
    service = injector.get(MemberEligHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberEligHistorys', () => {
    it('should return an Promise<MemberEligHistory[]>', () => {
      const memberEligHistory = [
       {riderCode20:'sample data', riderCode19:'sample data', riderCode18:'sample data', riderCode17:'sample data', riderCode16:'sample data', riderCode15:'sample data', riderCode14:'sample data', riderCode13:'sample data', riderCode12:'sample data', riderCode11:'sample data', riderCode10:'sample data', riderCode9:'sample data', mcarePartABTermDate:'2018-01-01', csIndicator:'sample data', facSeqProvId:1234, pbp:'sample data', geocode:'sample data', pbpEffectiveDate:'2018-01-01', mcUserDate2:'2018-01-01', mcUserDate1:'2018-01-01', mcUserDefined2:'sample data', mcUserDefined1:'sample data', pbpAcknowledgeIndicator:'sample data', medRiskUserDate2:'2018-01-01', medRiskUserDate1:'2018-01-01', medRiskUserDefined2:'sample data', medRiskUserDefined1:'sample data', facMmCertification:'sample data', facDischargeDate:'2018-01-01', facAdmissionDate:'2018-01-01', facPhoneNumber:'sample data', facCountry:'sample data', facZipCode:'sample data', facCounty:'sample data', facState:'sample data', facCity:'sample data', facAddressLine2:'sample data', facAddressLine1:'sample data', facName:'sample data', dateOfDeath:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', medicarePartAEffectDate:'2018-01-01', entMcarePipdcgFactor:1234, entMcareWelfareFlg:'sample data', entMcarePartBFlg:'sample data', entMcarePartAFlg:'sample data', seqSiteAddressId:1234, siteCode:'sample data', pcpChangeReason:'sample data', privacyOn:'sample data', pcpaaOccurred:'sample data', rateType:'sample data', userDefined3:'sample data', userDefined2:'sample data', comments:'sample data', mcareRiskRefusedDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskAccretionDate:'2018-01-01', seqEnrollmentRule:1234, benefitStartDate:'2018-01-01', useEftFlg:'sample data', subscLocation:'sample data', subscDept:'sample data', paidThruDate:'2018-01-01', billedThruDate:'2018-01-01', billEffectiveFromDate:'2018-01-01', pecWaived:'sample data', reasonCode:'sample data', pecEndDate:'2018-01-01', salary:1234, userDefined1:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqProv2Id:1234, panelId:'sample data', ipaId:'sample data', seqProvId:1234, premOverrideCode:'sample data', premOverrideAmt:1234, premOverrideStep:1234, eligStatus:'sample data', hireDate:'2018-01-01', otherStatusFlag:'sample data', medicareStatusFlg:'sample data', riderCode8:'sample data', riderCode7:'sample data', riderCode6:'sample data', riderCode5:'sample data', riderCode4:'sample data', riderCode3:'sample data', riderCode2:'sample data', riderCode1:'sample data', lineOfBusiness:'sample data', planCode:'sample data', seqGroupId:1234, relationshipCode:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, seqEligHist:1234},
       {riderCode20:'sample data', riderCode19:'sample data', riderCode18:'sample data', riderCode17:'sample data', riderCode16:'sample data', riderCode15:'sample data', riderCode14:'sample data', riderCode13:'sample data', riderCode12:'sample data', riderCode11:'sample data', riderCode10:'sample data', riderCode9:'sample data', mcarePartABTermDate:'2018-01-01', csIndicator:'sample data', facSeqProvId:1234, pbp:'sample data', geocode:'sample data', pbpEffectiveDate:'2018-01-01', mcUserDate2:'2018-01-01', mcUserDate1:'2018-01-01', mcUserDefined2:'sample data', mcUserDefined1:'sample data', pbpAcknowledgeIndicator:'sample data', medRiskUserDate2:'2018-01-01', medRiskUserDate1:'2018-01-01', medRiskUserDefined2:'sample data', medRiskUserDefined1:'sample data', facMmCertification:'sample data', facDischargeDate:'2018-01-01', facAdmissionDate:'2018-01-01', facPhoneNumber:'sample data', facCountry:'sample data', facZipCode:'sample data', facCounty:'sample data', facState:'sample data', facCity:'sample data', facAddressLine2:'sample data', facAddressLine1:'sample data', facName:'sample data', dateOfDeath:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', medicarePartAEffectDate:'2018-01-01', entMcarePipdcgFactor:1234, entMcareWelfareFlg:'sample data', entMcarePartBFlg:'sample data', entMcarePartAFlg:'sample data', seqSiteAddressId:1234, siteCode:'sample data', pcpChangeReason:'sample data', privacyOn:'sample data', pcpaaOccurred:'sample data', rateType:'sample data', userDefined3:'sample data', userDefined2:'sample data', comments:'sample data', mcareRiskRefusedDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskAccretionDate:'2018-01-01', seqEnrollmentRule:1234, benefitStartDate:'2018-01-01', useEftFlg:'sample data', subscLocation:'sample data', subscDept:'sample data', paidThruDate:'2018-01-01', billedThruDate:'2018-01-01', billEffectiveFromDate:'2018-01-01', pecWaived:'sample data', reasonCode:'sample data', pecEndDate:'2018-01-01', salary:1234, userDefined1:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqProv2Id:1234, panelId:'sample data', ipaId:'sample data', seqProvId:1234, premOverrideCode:'sample data', premOverrideAmt:1234, premOverrideStep:1234, eligStatus:'sample data', hireDate:'2018-01-01', otherStatusFlag:'sample data', medicareStatusFlg:'sample data', riderCode8:'sample data', riderCode7:'sample data', riderCode6:'sample data', riderCode5:'sample data', riderCode4:'sample data', riderCode3:'sample data', riderCode2:'sample data', riderCode1:'sample data', lineOfBusiness:'sample data', planCode:'sample data', seqGroupId:1234, relationshipCode:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, seqEligHist:1234},
       {riderCode20:'sample data', riderCode19:'sample data', riderCode18:'sample data', riderCode17:'sample data', riderCode16:'sample data', riderCode15:'sample data', riderCode14:'sample data', riderCode13:'sample data', riderCode12:'sample data', riderCode11:'sample data', riderCode10:'sample data', riderCode9:'sample data', mcarePartABTermDate:'2018-01-01', csIndicator:'sample data', facSeqProvId:1234, pbp:'sample data', geocode:'sample data', pbpEffectiveDate:'2018-01-01', mcUserDate2:'2018-01-01', mcUserDate1:'2018-01-01', mcUserDefined2:'sample data', mcUserDefined1:'sample data', pbpAcknowledgeIndicator:'sample data', medRiskUserDate2:'2018-01-01', medRiskUserDate1:'2018-01-01', medRiskUserDefined2:'sample data', medRiskUserDefined1:'sample data', facMmCertification:'sample data', facDischargeDate:'2018-01-01', facAdmissionDate:'2018-01-01', facPhoneNumber:'sample data', facCountry:'sample data', facZipCode:'sample data', facCounty:'sample data', facState:'sample data', facCity:'sample data', facAddressLine2:'sample data', facAddressLine1:'sample data', facName:'sample data', dateOfDeath:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', medicarePartAEffectDate:'2018-01-01', entMcarePipdcgFactor:1234, entMcareWelfareFlg:'sample data', entMcarePartBFlg:'sample data', entMcarePartAFlg:'sample data', seqSiteAddressId:1234, siteCode:'sample data', pcpChangeReason:'sample data', privacyOn:'sample data', pcpaaOccurred:'sample data', rateType:'sample data', userDefined3:'sample data', userDefined2:'sample data', comments:'sample data', mcareRiskRefusedDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskAccretionDate:'2018-01-01', seqEnrollmentRule:1234, benefitStartDate:'2018-01-01', useEftFlg:'sample data', subscLocation:'sample data', subscDept:'sample data', paidThruDate:'2018-01-01', billedThruDate:'2018-01-01', billEffectiveFromDate:'2018-01-01', pecWaived:'sample data', reasonCode:'sample data', pecEndDate:'2018-01-01', salary:1234, userDefined1:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqProv2Id:1234, panelId:'sample data', ipaId:'sample data', seqProvId:1234, premOverrideCode:'sample data', premOverrideAmt:1234, premOverrideStep:1234, eligStatus:'sample data', hireDate:'2018-01-01', otherStatusFlag:'sample data', medicareStatusFlg:'sample data', riderCode8:'sample data', riderCode7:'sample data', riderCode6:'sample data', riderCode5:'sample data', riderCode4:'sample data', riderCode3:'sample data', riderCode2:'sample data', riderCode1:'sample data', lineOfBusiness:'sample data', planCode:'sample data', seqGroupId:1234, relationshipCode:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, seqEligHist:1234}

      ];
      service.getMemberEligHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberEligHistory);
    });
  });


  describe('#createMemberEligHistory', () => {
    var id = 1;
    it('should return an Promise<MemberEligHistory>', () => {
      const memberEligHistory: MemberEligHistory = {riderCode20:'sample data', riderCode19:'sample data', riderCode18:'sample data', riderCode17:'sample data', riderCode16:'sample data', riderCode15:'sample data', riderCode14:'sample data', riderCode13:'sample data', riderCode12:'sample data', riderCode11:'sample data', riderCode10:'sample data', riderCode9:'sample data', mcarePartABTermDate:'2018-01-01', csIndicator:'sample data', facSeqProvId:1234, pbp:'sample data', geocode:'sample data', pbpEffectiveDate:'2018-01-01', mcUserDate2:'2018-01-01', mcUserDate1:'2018-01-01', mcUserDefined2:'sample data', mcUserDefined1:'sample data', pbpAcknowledgeIndicator:'sample data', medRiskUserDate2:'2018-01-01', medRiskUserDate1:'2018-01-01', medRiskUserDefined2:'sample data', medRiskUserDefined1:'sample data', facMmCertification:'sample data', facDischargeDate:'2018-01-01', facAdmissionDate:'2018-01-01', facPhoneNumber:'sample data', facCountry:'sample data', facZipCode:'sample data', facCounty:'sample data', facState:'sample data', facCity:'sample data', facAddressLine2:'sample data', facAddressLine1:'sample data', facName:'sample data', dateOfDeath:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', medicarePartAEffectDate:'2018-01-01', entMcarePipdcgFactor:1234, entMcareWelfareFlg:'sample data', entMcarePartBFlg:'sample data', entMcarePartAFlg:'sample data', seqSiteAddressId:1234, siteCode:'sample data', pcpChangeReason:'sample data', privacyOn:'sample data', pcpaaOccurred:'sample data', rateType:'sample data', userDefined3:'sample data', userDefined2:'sample data', comments:'sample data', mcareRiskRefusedDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskAccretionDate:'2018-01-01', seqEnrollmentRule:1234, benefitStartDate:'2018-01-01', useEftFlg:'sample data', subscLocation:'sample data', subscDept:'sample data', paidThruDate:'2018-01-01', billedThruDate:'2018-01-01', billEffectiveFromDate:'2018-01-01', pecWaived:'sample data', reasonCode:'sample data', pecEndDate:'2018-01-01', salary:1234, userDefined1:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqProv2Id:1234, panelId:'sample data', ipaId:'sample data', seqProvId:1234, premOverrideCode:'sample data', premOverrideAmt:1234, premOverrideStep:1234, eligStatus:'sample data', hireDate:'2018-01-01', otherStatusFlag:'sample data', medicareStatusFlg:'sample data', riderCode8:'sample data', riderCode7:'sample data', riderCode6:'sample data', riderCode5:'sample data', riderCode4:'sample data', riderCode3:'sample data', riderCode2:'sample data', riderCode1:'sample data', lineOfBusiness:'sample data', planCode:'sample data', seqGroupId:1234, relationshipCode:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, seqEligHist:1234};
      service.createMemberEligHistory(memberEligHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberEligHistory', () => {
    var id = 1;
    it('should return an Promise<MemberEligHistory>', () => {
      const memberEligHistory: MemberEligHistory = {riderCode20:'sample data', riderCode19:'sample data', riderCode18:'sample data', riderCode17:'sample data', riderCode16:'sample data', riderCode15:'sample data', riderCode14:'sample data', riderCode13:'sample data', riderCode12:'sample data', riderCode11:'sample data', riderCode10:'sample data', riderCode9:'sample data', mcarePartABTermDate:'2018-01-01', csIndicator:'sample data', facSeqProvId:1234, pbp:'sample data', geocode:'sample data', pbpEffectiveDate:'2018-01-01', mcUserDate2:'2018-01-01', mcUserDate1:'2018-01-01', mcUserDefined2:'sample data', mcUserDefined1:'sample data', pbpAcknowledgeIndicator:'sample data', medRiskUserDate2:'2018-01-01', medRiskUserDate1:'2018-01-01', medRiskUserDefined2:'sample data', medRiskUserDefined1:'sample data', facMmCertification:'sample data', facDischargeDate:'2018-01-01', facAdmissionDate:'2018-01-01', facPhoneNumber:'sample data', facCountry:'sample data', facZipCode:'sample data', facCounty:'sample data', facState:'sample data', facCity:'sample data', facAddressLine2:'sample data', facAddressLine1:'sample data', facName:'sample data', dateOfDeath:'2018-01-01', medicarePartBEnrollDate:'2018-01-01', medicarePartAEffectDate:'2018-01-01', entMcarePipdcgFactor:1234, entMcareWelfareFlg:'sample data', entMcarePartBFlg:'sample data', entMcarePartAFlg:'sample data', seqSiteAddressId:1234, siteCode:'sample data', pcpChangeReason:'sample data', privacyOn:'sample data', pcpaaOccurred:'sample data', rateType:'sample data', userDefined3:'sample data', userDefined2:'sample data', comments:'sample data', mcareRiskRefusedDate:'2018-01-01', mcareRiskDeletionDate:'2018-01-01', mcareRiskAccretionDate:'2018-01-01', seqEnrollmentRule:1234, benefitStartDate:'2018-01-01', useEftFlg:'sample data', subscLocation:'sample data', subscDept:'sample data', paidThruDate:'2018-01-01', billedThruDate:'2018-01-01', billEffectiveFromDate:'2018-01-01', pecWaived:'sample data', reasonCode:'sample data', pecEndDate:'2018-01-01', salary:1234, userDefined1:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqProv2Id:1234, panelId:'sample data', ipaId:'sample data', seqProvId:1234, premOverrideCode:'sample data', premOverrideAmt:1234, premOverrideStep:1234, eligStatus:'sample data', hireDate:'2018-01-01', otherStatusFlag:'sample data', medicareStatusFlg:'sample data', riderCode8:'sample data', riderCode7:'sample data', riderCode6:'sample data', riderCode5:'sample data', riderCode4:'sample data', riderCode3:'sample data', riderCode2:'sample data', riderCode1:'sample data', lineOfBusiness:'sample data', planCode:'sample data', seqGroupId:1234, relationshipCode:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, seqEligHist:1234};
      service.updateMemberEligHistory(memberEligHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberEligHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberEligHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});