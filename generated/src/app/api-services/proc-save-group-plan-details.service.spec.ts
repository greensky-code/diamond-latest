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

import { ProcSaveGroupPlanDetailsService } from './proc-save-group-plan-details.service';
import { ProcSaveGroupPlanDetails } from '../api-models/proc-save-group-plan-details.model'
import { ProcSaveGroupPlanDetail } from "../api-models/testing/fake-proc-save-group-plan-details.model"

describe('ProcSaveGroupPlanDetailsService', () => {
  let injector: TestBed;
  let service: ProcSaveGroupPlanDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcSaveGroupPlanDetailsService]
    });
    injector = getTestBed();
    service = injector.get(ProcSaveGroupPlanDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcSaveGroupPlanDetail', () => {
    it('should return an Promise<ProcSaveGroupPlanDetails[]>', () => {
      const procSaveGroupPlanDetails = [
       {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', pHaadPrdCd:'sample data', pDhaPrdCd:'sample data', pOtherUaePrdCd:'sample data', pDubaiEntityId:'sample data', pNetworkTierClassification:'sample data', pNetworkEffectiveDate:'sample data', pNetworkTermDate:'sample data', pUserId:'sample data', pPhotoIndicator:'sample data', pClientDubaiWorkLocCode:'sample data', pHaadPolicyHolderType:'sample data', pQbokGblPlanInd:'sample data', pQbokEffDate:'sample data', pQbokTermDate:'sample data', pUaeGblPlanInd:'sample data', pUaeEffDate:'sample data', pUaeTermDate:'sample data'},
       {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', pHaadPrdCd:'sample data', pDhaPrdCd:'sample data', pOtherUaePrdCd:'sample data', pDubaiEntityId:'sample data', pNetworkTierClassification:'sample data', pNetworkEffectiveDate:'sample data', pNetworkTermDate:'sample data', pUserId:'sample data', pPhotoIndicator:'sample data', pClientDubaiWorkLocCode:'sample data', pHaadPolicyHolderType:'sample data', pQbokGblPlanInd:'sample data', pQbokEffDate:'sample data', pQbokTermDate:'sample data', pUaeGblPlanInd:'sample data', pUaeEffDate:'sample data', pUaeTermDate:'sample data'},
       {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', pHaadPrdCd:'sample data', pDhaPrdCd:'sample data', pOtherUaePrdCd:'sample data', pDubaiEntityId:'sample data', pNetworkTierClassification:'sample data', pNetworkEffectiveDate:'sample data', pNetworkTermDate:'sample data', pUserId:'sample data', pPhotoIndicator:'sample data', pClientDubaiWorkLocCode:'sample data', pHaadPolicyHolderType:'sample data', pQbokGblPlanInd:'sample data', pQbokEffDate:'sample data', pQbokTermDate:'sample data', pUaeGblPlanInd:'sample data', pUaeEffDate:'sample data', pUaeTermDate:'sample data'}

      ];
      service.getProcSaveGroupPlanDetail().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procsavegroupplandetail/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procSaveGroupPlanDetails);
    });
  });


  describe('#createProcSaveGroupPlanDetails', () => {
    var id = 1;
    it('should return an Promise<ProcSaveGroupPlanDetails>', () => {
      const procSaveGroupPlanDetails: ProcSaveGroupPlanDetails = {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', pHaadPrdCd:'sample data', pDhaPrdCd:'sample data', pOtherUaePrdCd:'sample data', pDubaiEntityId:'sample data', pNetworkTierClassification:'sample data', pNetworkEffectiveDate:'sample data', pNetworkTermDate:'sample data', pUserId:'sample data', pPhotoIndicator:'sample data', pClientDubaiWorkLocCode:'sample data', pHaadPolicyHolderType:'sample data', pQbokGblPlanInd:'sample data', pQbokEffDate:'sample data', pQbokTermDate:'sample data', pUaeGblPlanInd:'sample data', pUaeEffDate:'sample data', pUaeTermDate:'sample data'};
      service.createProcSaveGroupPlanDetails(procSaveGroupPlanDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsavegroupplandetail`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcSaveGroupPlanDetails', () => {
    var id = 1;
    it('should return an Promise<ProcSaveGroupPlanDetails>', () => {
      const procSaveGroupPlanDetails: ProcSaveGroupPlanDetails = {pGroupId:'sample data', pPartner:'sample data', pNoteType:'sample data', pHaadPrdCd:'sample data', pDhaPrdCd:'sample data', pOtherUaePrdCd:'sample data', pDubaiEntityId:'sample data', pNetworkTierClassification:'sample data', pNetworkEffectiveDate:'sample data', pNetworkTermDate:'sample data', pUserId:'sample data', pPhotoIndicator:'sample data', pClientDubaiWorkLocCode:'sample data', pHaadPolicyHolderType:'sample data', pQbokGblPlanInd:'sample data', pQbokEffDate:'sample data', pQbokTermDate:'sample data', pUaeGblPlanInd:'sample data', pUaeEffDate:'sample data', pUaeTermDate:'sample data'};
      service.updateProcSaveGroupPlanDetails(procSaveGroupPlanDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsavegroupplandetail/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcSaveGroupPlanDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcSaveGroupPlanDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsavegroupplandetail/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});