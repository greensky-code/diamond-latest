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

import { StageInstHdrSupService } from './stage-inst-hdr-sup.service';
import { StageInstHdrSup } from '../api-models/stage-inst-hdr-sup.model'
import { StageInstHdrSups } from "../api-models/testing/fake-stage-inst-hdr-sup.model"

describe('StageInstHdrSupService', () => {
  let injector: TestBed;
  let service: StageInstHdrSupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageInstHdrSupService]
    });
    injector = getTestBed();
    service = injector.get(StageInstHdrSupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageInstHdrSups', () => {
    it('should return an Promise<StageInstHdrSup[]>', () => {
      const stageInstHdrSup = [
       {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqAdmProvId:1234, admProvParStat:'sample data', admProvType:'sample data', admProvSpec:'sample data', admProvIpaId:'sample data', seqAttProvId:1234, attProvParStat:'sample data', attProvType:'sample data', attProvSpec:'sample data', attProvIpaId:'sample data', attProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, seqSubsId:1234, authClaimMatchInd:'sample data', pricerBaseReimbAmt:1234, pricerOutlierPayments:1234, pricerAltLevelCarePaym:1234, pricerTotalReimbAmt:1234, pricerOutlierType:1234, pricerAverageLos:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', auditStatus:'sample data', seqOtherProvId:1234, groupId:'sample data', pcpProvId:'sample data', invalidFlags:'sample data', apiProvcontract:'sample data', placeOfService:'sample data', readmitContinueFlag:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, seqOperPhysProvId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', diagnosis9:'sample data'},
       {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqAdmProvId:1234, admProvParStat:'sample data', admProvType:'sample data', admProvSpec:'sample data', admProvIpaId:'sample data', seqAttProvId:1234, attProvParStat:'sample data', attProvType:'sample data', attProvSpec:'sample data', attProvIpaId:'sample data', attProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, seqSubsId:1234, authClaimMatchInd:'sample data', pricerBaseReimbAmt:1234, pricerOutlierPayments:1234, pricerAltLevelCarePaym:1234, pricerTotalReimbAmt:1234, pricerOutlierType:1234, pricerAverageLos:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', auditStatus:'sample data', seqOtherProvId:1234, groupId:'sample data', pcpProvId:'sample data', invalidFlags:'sample data', apiProvcontract:'sample data', placeOfService:'sample data', readmitContinueFlag:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, seqOperPhysProvId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', diagnosis9:'sample data'},
       {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqAdmProvId:1234, admProvParStat:'sample data', admProvType:'sample data', admProvSpec:'sample data', admProvIpaId:'sample data', seqAttProvId:1234, attProvParStat:'sample data', attProvType:'sample data', attProvSpec:'sample data', attProvIpaId:'sample data', attProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, seqSubsId:1234, authClaimMatchInd:'sample data', pricerBaseReimbAmt:1234, pricerOutlierPayments:1234, pricerAltLevelCarePaym:1234, pricerTotalReimbAmt:1234, pricerOutlierType:1234, pricerAverageLos:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', auditStatus:'sample data', seqOtherProvId:1234, groupId:'sample data', pcpProvId:'sample data', invalidFlags:'sample data', apiProvcontract:'sample data', placeOfService:'sample data', readmitContinueFlag:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, seqOperPhysProvId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', diagnosis9:'sample data'}

      ];
      service.getStageInstHdrSups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageinsthdrsups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageInstHdrSup);
    });
  });


  describe('#createStageInstHdrSup', () => {
    var id = 1;
    it('should return an Promise<StageInstHdrSup>', () => {
      const stageInstHdrSup: StageInstHdrSup = {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqAdmProvId:1234, admProvParStat:'sample data', admProvType:'sample data', admProvSpec:'sample data', admProvIpaId:'sample data', seqAttProvId:1234, attProvParStat:'sample data', attProvType:'sample data', attProvSpec:'sample data', attProvIpaId:'sample data', attProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, seqSubsId:1234, authClaimMatchInd:'sample data', pricerBaseReimbAmt:1234, pricerOutlierPayments:1234, pricerAltLevelCarePaym:1234, pricerTotalReimbAmt:1234, pricerOutlierType:1234, pricerAverageLos:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', auditStatus:'sample data', seqOtherProvId:1234, groupId:'sample data', pcpProvId:'sample data', invalidFlags:'sample data', apiProvcontract:'sample data', placeOfService:'sample data', readmitContinueFlag:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, seqOperPhysProvId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', diagnosis9:'sample data'};
      service.createStageInstHdrSup(stageInstHdrSup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageinsthdrsups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageInstHdrSup', () => {
    var id = 1;
    it('should return an Promise<StageInstHdrSup>', () => {
      const stageInstHdrSup: StageInstHdrSup = {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqAdmProvId:1234, admProvParStat:'sample data', admProvType:'sample data', admProvSpec:'sample data', admProvIpaId:'sample data', seqAttProvId:1234, attProvParStat:'sample data', attProvType:'sample data', attProvSpec:'sample data', attProvIpaId:'sample data', attProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, seqSubsId:1234, authClaimMatchInd:'sample data', pricerBaseReimbAmt:1234, pricerOutlierPayments:1234, pricerAltLevelCarePaym:1234, pricerTotalReimbAmt:1234, pricerOutlierType:1234, pricerAverageLos:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', auditStatus:'sample data', seqOtherProvId:1234, groupId:'sample data', pcpProvId:'sample data', invalidFlags:'sample data', apiProvcontract:'sample data', placeOfService:'sample data', readmitContinueFlag:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, seqOperPhysProvId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data', diagnosis9:'sample data'};
      service.updateStageInstHdrSup(stageInstHdrSup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageinsthdrsups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageInstHdrSup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageInstHdrSup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageinsthdrsups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});