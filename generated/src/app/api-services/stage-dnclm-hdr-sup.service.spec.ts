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

import { StageDnclmHdrSupService } from './stage-dnclm-hdr-sup.service';
import { StageDnclmHdrSup } from '../api-models/stage-dnclm-hdr-sup.model'
import { StageDnclmHdrSups } from "../api-models/testing/fake-stage-dnclm-hdr-sup.model"

describe('StageDnclmHdrSupService', () => {
  let injector: TestBed;
  let service: StageDnclmHdrSupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageDnclmHdrSupService]
    });
    injector = getTestBed();
    service = injector.get(StageDnclmHdrSupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageDnclmHdrSups', () => {
    it('should return an Promise<StageDnclmHdrSup[]>', () => {
      const stageDnclmHdrSup = [
       {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpProvId:'sample data', pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, groupId:'sample data', planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqRefProvId:1234, refProvParStat:'sample data', refProvType:'sample data', refProvSpec:'sample data', refProvIpaId:'sample data', refProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, coveringMethod:'sample data', facilityLabIdNo:'sample data', authClaimMatchInd:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', seqSubsId:1234, membrMstrHoldRsn:'sample data', membrMstrHoldDate:'2018-01-01', invalidFlags:'sample data', apiProvcontract:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data'},
       {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpProvId:'sample data', pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, groupId:'sample data', planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqRefProvId:1234, refProvParStat:'sample data', refProvType:'sample data', refProvSpec:'sample data', refProvIpaId:'sample data', refProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, coveringMethod:'sample data', facilityLabIdNo:'sample data', authClaimMatchInd:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', seqSubsId:1234, membrMstrHoldRsn:'sample data', membrMstrHoldDate:'2018-01-01', invalidFlags:'sample data', apiProvcontract:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data'},
       {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpProvId:'sample data', pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, groupId:'sample data', planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqRefProvId:1234, refProvParStat:'sample data', refProvType:'sample data', refProvSpec:'sample data', refProvIpaId:'sample data', refProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, coveringMethod:'sample data', facilityLabIdNo:'sample data', authClaimMatchInd:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', seqSubsId:1234, membrMstrHoldRsn:'sample data', membrMstrHoldDate:'2018-01-01', invalidFlags:'sample data', apiProvcontract:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data'}

      ];
      service.getStageDnclmHdrSups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmhdrsups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageDnclmHdrSup);
    });
  });


  describe('#createStageDnclmHdrSup', () => {
    var id = 1;
    it('should return an Promise<StageDnclmHdrSup>', () => {
      const stageDnclmHdrSup: StageDnclmHdrSup = {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpProvId:'sample data', pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, groupId:'sample data', planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqRefProvId:1234, refProvParStat:'sample data', refProvType:'sample data', refProvSpec:'sample data', refProvIpaId:'sample data', refProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, coveringMethod:'sample data', facilityLabIdNo:'sample data', authClaimMatchInd:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', seqSubsId:1234, membrMstrHoldRsn:'sample data', membrMstrHoldDate:'2018-01-01', invalidFlags:'sample data', apiProvcontract:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data'};
      service.createStageDnclmHdrSup(stageDnclmHdrSup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmhdrsups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageDnclmHdrSup', () => {
    var id = 1;
    it('should return an Promise<StageDnclmHdrSup>', () => {
      const stageDnclmHdrSup: StageDnclmHdrSup = {batchId:'sample data', transactionId:1234, claimStatus:'sample data', processingStatus:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpProvId:'sample data', pcpIpaId:'sample data', pcpType:'sample data', pcpSpec:'sample data', seqGroupId:1234, groupId:'sample data', planCode:'sample data', eligibleEffDate:'2018-01-01', eligibleThruDate:'2018-01-01', lob:'sample data', panelId:'sample data', riderString:'sample data', primaryOcExists:'sample data', eligStatus:'sample data', eligStatParamResult:'sample data', seqProvId:1234, seqProvAddress:1234, seqProvContract:1234, provParStat:'sample data', provType:'sample data', provSpec:'sample data', provIpaId:'sample data', provPcpFlag:'sample data', provPanel:'sample data', provIpa:'sample data', seqRefProvId:1234, refProvParStat:'sample data', refProvType:'sample data', refProvSpec:'sample data', refProvIpaId:'sample data', refProvPcp:'sample data', seqVendId:1234, seqVendAddress:1234, submittedAuthNo:1234, submittedSecAuthNo:'sample data', covProvFlag:'sample data', seqCovProvParent:1234, reimbMethod:'sample data', authClass:'sample data', authWaiveMethod:'sample data', authLevel:'sample data', inSvcArea:'sample data', acceptMedicareAssignFlag:'sample data', seqDefaultVendId:1234, seqDefaultVendAddr:1234, seqPaySubVendId:1234, seqPaySubVendAddrId:1234, authMatchOrder:1234, coveringMethod:'sample data', facilityLabIdNo:'sample data', authClaimMatchInd:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, participationFlag:'sample data', parRsnCode:'sample data', nonParRsnCode:'sample data', bmaParamParvalue:'sample data', seqMembOthCov:1234, apiSuppressEob:'sample data', batchNo:'sample data', seqSubsId:1234, membrMstrHoldRsn:'sample data', membrMstrHoldDate:'2018-01-01', invalidFlags:'sample data', apiProvcontract:'sample data', waiveMatchOrder:'sample data', privacyApplies:'sample data', seqMcondId:1234, diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', diagnosis5:'sample data', diagnosis6:'sample data', diagnosis7:'sample data', diagnosis8:'sample data'};
      service.updateStageDnclmHdrSup(stageDnclmHdrSup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmhdrsups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageDnclmHdrSup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageDnclmHdrSup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmhdrsups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});