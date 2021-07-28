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

import { ClmDtlAuthProcLnkHdrService } from './clm-dtl-auth-proc-lnk-hdr.service';
import { ClmDtlAuthProcLnkHdr } from '../api-models/clm-dtl-auth-proc-lnk-hdr.model'
import { ClmDtlAuthProcLnkHdrs } from "../api-models/testing/fake-clm-dtl-auth-proc-lnk-hdr.model"

describe('ClmDtlAuthProcLnkHdrService', () => {
  let injector: TestBed;
  let service: ClmDtlAuthProcLnkHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClmDtlAuthProcLnkHdrService]
    });
    injector = getTestBed();
    service = injector.get(ClmDtlAuthProcLnkHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClmDtlAuthProcLnkHdrs', () => {
    it('should return an Promise<ClmDtlAuthProcLnkHdr[]>', () => {
      const clmDtlAuthProcLnkHdr = [
       {seqCdaplHdr:1234, lineOfBusiness:'sample data', authType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', tieBrkOnPrice:'sample data', tieBrkOnProc:'sample data', mtchOnDtlForInp:'sample data', exceedDaysAction:'sample data', exceedDaysReason:'sample data', modifierUsedAction:'sample data', modifierUsedReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', exceedAmtAction:'sample data', exceedAmtReason:'sample data'},
       {seqCdaplHdr:1234, lineOfBusiness:'sample data', authType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', tieBrkOnPrice:'sample data', tieBrkOnProc:'sample data', mtchOnDtlForInp:'sample data', exceedDaysAction:'sample data', exceedDaysReason:'sample data', modifierUsedAction:'sample data', modifierUsedReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', exceedAmtAction:'sample data', exceedAmtReason:'sample data'},
       {seqCdaplHdr:1234, lineOfBusiness:'sample data', authType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', tieBrkOnPrice:'sample data', tieBrkOnProc:'sample data', mtchOnDtlForInp:'sample data', exceedDaysAction:'sample data', exceedDaysReason:'sample data', modifierUsedAction:'sample data', modifierUsedReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', exceedAmtAction:'sample data', exceedAmtReason:'sample data'}

      ];
      service.getClmDtlAuthProcLnkHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/clmdtlauthproclnkhdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(clmDtlAuthProcLnkHdr);
    });
  });


  describe('#createClmDtlAuthProcLnkHdr', () => {
    var id = 1;
    it('should return an Promise<ClmDtlAuthProcLnkHdr>', () => {
      const clmDtlAuthProcLnkHdr: ClmDtlAuthProcLnkHdr = {seqCdaplHdr:1234, lineOfBusiness:'sample data', authType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', tieBrkOnPrice:'sample data', tieBrkOnProc:'sample data', mtchOnDtlForInp:'sample data', exceedDaysAction:'sample data', exceedDaysReason:'sample data', modifierUsedAction:'sample data', modifierUsedReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', exceedAmtAction:'sample data', exceedAmtReason:'sample data'};
      service.createClmDtlAuthProcLnkHdr(clmDtlAuthProcLnkHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/clmdtlauthproclnkhdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClmDtlAuthProcLnkHdr', () => {
    var id = 1;
    it('should return an Promise<ClmDtlAuthProcLnkHdr>', () => {
      const clmDtlAuthProcLnkHdr: ClmDtlAuthProcLnkHdr = {seqCdaplHdr:1234, lineOfBusiness:'sample data', authType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', tieBrkOnPrice:'sample data', tieBrkOnProc:'sample data', mtchOnDtlForInp:'sample data', exceedDaysAction:'sample data', exceedDaysReason:'sample data', modifierUsedAction:'sample data', modifierUsedReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', exceedAmtAction:'sample data', exceedAmtReason:'sample data'};
      service.updateClmDtlAuthProcLnkHdr(clmDtlAuthProcLnkHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/clmdtlauthproclnkhdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClmDtlAuthProcLnkHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClmDtlAuthProcLnkHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/clmdtlauthproclnkhdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});