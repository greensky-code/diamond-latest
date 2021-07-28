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

import { ProcGetGroupPlanDetailsService } from './proc-get-group-plan-details.service';
import { ProcGetGroupPlanDetails } from '../api-models/proc-get-group-plan-details.model'
import { ProcGetGroupPlanDetail } from "../api-models/testing/fake-proc-get-group-plan-details.model"

describe('ProcGetGroupPlanDetailsService', () => {
  let injector: TestBed;
  let service: ProcGetGroupPlanDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetGroupPlanDetailsService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetGroupPlanDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetGroupPlanDetail', () => {
    it('should return an Promise<ProcGetGroupPlanDetails[]>', () => {
      const procGetGroupPlanDetails = [
       {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data', oDubaiEntityId:'sample data', oNetworkTierClassification:'sample data', oNetworkEffectiveDate:'sample data', oNetworkTermDate:'sample data', oPhotoIndicator:'sample data', oClientDubaiWorkLocCode:'sample data', oHaadPolicyHolderType:'sample data', oQbokGblPlanInd:'sample data', oQbokEffDate:'sample data', oQbokTermDate:'sample data', oUaeGblPlanInd:'sample data', oUaeEffDate:'sample data', oUaeTermDate:'sample data'},
       {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data', oDubaiEntityId:'sample data', oNetworkTierClassification:'sample data', oNetworkEffectiveDate:'sample data', oNetworkTermDate:'sample data', oPhotoIndicator:'sample data', oClientDubaiWorkLocCode:'sample data', oHaadPolicyHolderType:'sample data', oQbokGblPlanInd:'sample data', oQbokEffDate:'sample data', oQbokTermDate:'sample data', oUaeGblPlanInd:'sample data', oUaeEffDate:'sample data', oUaeTermDate:'sample data'},
       {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data', oDubaiEntityId:'sample data', oNetworkTierClassification:'sample data', oNetworkEffectiveDate:'sample data', oNetworkTermDate:'sample data', oPhotoIndicator:'sample data', oClientDubaiWorkLocCode:'sample data', oHaadPolicyHolderType:'sample data', oQbokGblPlanInd:'sample data', oQbokEffDate:'sample data', oQbokTermDate:'sample data', oUaeGblPlanInd:'sample data', oUaeEffDate:'sample data', oUaeTermDate:'sample data'}

      ];
      service.getProcGetGroupPlanDetail().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupplandetail/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetGroupPlanDetails);
    });
  });


  describe('#createProcGetGroupPlanDetails', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupPlanDetails>', () => {
      const procGetGroupPlanDetails: ProcGetGroupPlanDetails = {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data', oDubaiEntityId:'sample data', oNetworkTierClassification:'sample data', oNetworkEffectiveDate:'sample data', oNetworkTermDate:'sample data', oPhotoIndicator:'sample data', oClientDubaiWorkLocCode:'sample data', oHaadPolicyHolderType:'sample data', oQbokGblPlanInd:'sample data', oQbokEffDate:'sample data', oQbokTermDate:'sample data', oUaeGblPlanInd:'sample data', oUaeEffDate:'sample data', oUaeTermDate:'sample data'};
      service.createProcGetGroupPlanDetails(procGetGroupPlanDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupplandetail`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetGroupPlanDetails', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupPlanDetails>', () => {
      const procGetGroupPlanDetails: ProcGetGroupPlanDetails = {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data', oDubaiEntityId:'sample data', oNetworkTierClassification:'sample data', oNetworkEffectiveDate:'sample data', oNetworkTermDate:'sample data', oPhotoIndicator:'sample data', oClientDubaiWorkLocCode:'sample data', oHaadPolicyHolderType:'sample data', oQbokGblPlanInd:'sample data', oQbokEffDate:'sample data', oQbokTermDate:'sample data', oUaeGblPlanInd:'sample data', oUaeEffDate:'sample data', oUaeTermDate:'sample data'};
      service.updateProcGetGroupPlanDetails(procGetGroupPlanDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupplandetail/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetGroupPlanDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetGroupPlanDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupplandetail/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});