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

import { ProcAddGroupFilingService } from './proc-add-group-filing.service';
import { ProcAddGroupFiling } from '../api-models/proc-add-group-filing.model'
import { ProcAddGroupFilings } from "../api-models/testing/fake-proc-add-group-filing.model"

describe('ProcAddGroupFilingService', () => {
  let injector: TestBed;
  let service: ProcAddGroupFilingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcAddGroupFilingService]
    });
    injector = getTestBed();
    service = injector.get(ProcAddGroupFilingService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcAddGroupFilings', () => {
    it('should return an Promise<ProcAddGroupFiling[]>', () => {
      const procAddGroupFiling = [
       {pGroupId:'sample data', pSeqGrpfilingId:1234, pFilingType:'sample data', pSitusState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pChangeReason:'sample data', pApplyToSubgroup:'sample data', pUser:'sample data', pError:'sample data'},
       {pGroupId:'sample data', pSeqGrpfilingId:1234, pFilingType:'sample data', pSitusState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pChangeReason:'sample data', pApplyToSubgroup:'sample data', pUser:'sample data', pError:'sample data'},
       {pGroupId:'sample data', pSeqGrpfilingId:1234, pFilingType:'sample data', pSitusState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pChangeReason:'sample data', pApplyToSubgroup:'sample data', pUser:'sample data', pError:'sample data'}

      ];
      service.getProcAddGroupFilings().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procaddgroupfilings/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procAddGroupFiling);
    });
  });


  describe('#createProcAddGroupFiling', () => {
    var id = 1;
    it('should return an Promise<ProcAddGroupFiling>', () => {
      const procAddGroupFiling: ProcAddGroupFiling = {pGroupId:'sample data', pSeqGrpfilingId:1234, pFilingType:'sample data', pSitusState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pChangeReason:'sample data', pApplyToSubgroup:'sample data', pUser:'sample data', pError:'sample data'};
      service.createProcAddGroupFiling(procAddGroupFiling).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procaddgroupfilings`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcAddGroupFiling', () => {
    var id = 1;
    it('should return an Promise<ProcAddGroupFiling>', () => {
      const procAddGroupFiling: ProcAddGroupFiling = {pGroupId:'sample data', pSeqGrpfilingId:1234, pFilingType:'sample data', pSitusState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pChangeReason:'sample data', pApplyToSubgroup:'sample data', pUser:'sample data', pError:'sample data'};
      service.updateProcAddGroupFiling(procAddGroupFiling, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procaddgroupfilings/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcAddGroupFiling', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcAddGroupFiling(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procaddgroupfilings/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});