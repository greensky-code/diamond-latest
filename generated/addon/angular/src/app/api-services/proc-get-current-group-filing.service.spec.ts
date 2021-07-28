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

import { ProcGetCurrentGroupFilingService } from './proc-get-current-group-filing.service';
import { ProcGetCurrentGroupFiling } from '../api-models/proc-get-current-group-filing.model'
import { ProcGetCurrentGroupFilings } from "../api-models/testing/fake-proc-get-current-group-filing.model"

describe('ProcGetCurrentGroupFilingService', () => {
  let injector: TestBed;
  let service: ProcGetCurrentGroupFilingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetCurrentGroupFilingService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetCurrentGroupFilingService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetCurrentGroupFilings', () => {
    it('should return an Promise<ProcGetCurrentGroupFiling[]>', () => {
      const procGetCurrentGroupFiling = [
       {pSeqGroupId:1234, pMatchDate:'sample data', seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'sample data', termDate:'sample data', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data'},
       {pSeqGroupId:1234, pMatchDate:'sample data', seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'sample data', termDate:'sample data', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data'},
       {pSeqGroupId:1234, pMatchDate:'sample data', seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'sample data', termDate:'sample data', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProcGetCurrentGroupFilings().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcurrentgroupfilings/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetCurrentGroupFiling);
    });
  });


  describe('#createProcGetCurrentGroupFiling', () => {
    var id = 1;
    it('should return an Promise<ProcGetCurrentGroupFiling>', () => {
      const procGetCurrentGroupFiling: ProcGetCurrentGroupFiling = {pSeqGroupId:1234, pMatchDate:'sample data', seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'sample data', termDate:'sample data', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data'};
      service.createProcGetCurrentGroupFiling(procGetCurrentGroupFiling).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcurrentgroupfilings`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetCurrentGroupFiling', () => {
    var id = 1;
    it('should return an Promise<ProcGetCurrentGroupFiling>', () => {
      const procGetCurrentGroupFiling: ProcGetCurrentGroupFiling = {pSeqGroupId:1234, pMatchDate:'sample data', seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'sample data', termDate:'sample data', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'sample data', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'sample data', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProcGetCurrentGroupFiling(procGetCurrentGroupFiling, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcurrentgroupfilings/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetCurrentGroupFiling', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetCurrentGroupFiling(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcurrentgroupfilings/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});