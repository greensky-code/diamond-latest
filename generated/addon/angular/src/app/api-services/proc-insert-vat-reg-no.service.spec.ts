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

import { ProcInsertVatRegNoService } from './proc-insert-vat-reg-no.service';
import { ProcInsertVatRegNo } from '../api-models/proc-insert-vat-reg-no.model'
import { ProcInsertVatRegNoes } from "../api-models/testing/fake-proc-insert-vat-reg-no.model"

describe('ProcInsertVatRegNoService', () => {
  let injector: TestBed;
  let service: ProcInsertVatRegNoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcInsertVatRegNoService]
    });
    injector = getTestBed();
    service = injector.get(ProcInsertVatRegNoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcInsertVatRegNoes', () => {
    it('should return an Promise<ProcInsertVatRegNo[]>', () => {
      const procInsertVatRegNo = [
       {pGroupId:'sample data', pType:'sample data', pRegistrationNo:'sample data', pRegistrationName:'sample data', pCountryCode:'sample data', pRegionCode:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'},
       {pGroupId:'sample data', pType:'sample data', pRegistrationNo:'sample data', pRegistrationName:'sample data', pCountryCode:'sample data', pRegionCode:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'},
       {pGroupId:'sample data', pType:'sample data', pRegistrationNo:'sample data', pRegistrationName:'sample data', pCountryCode:'sample data', pRegionCode:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'}

      ];
      service.getProcInsertVatRegNoes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procinsertvatregnoes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procInsertVatRegNo);
    });
  });


  describe('#createProcInsertVatRegNo', () => {
    var id = 1;
    it('should return an Promise<ProcInsertVatRegNo>', () => {
      const procInsertVatRegNo: ProcInsertVatRegNo = {pGroupId:'sample data', pType:'sample data', pRegistrationNo:'sample data', pRegistrationName:'sample data', pCountryCode:'sample data', pRegionCode:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'};
      service.createProcInsertVatRegNo(procInsertVatRegNo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procinsertvatregnoes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcInsertVatRegNo', () => {
    var id = 1;
    it('should return an Promise<ProcInsertVatRegNo>', () => {
      const procInsertVatRegNo: ProcInsertVatRegNo = {pGroupId:'sample data', pType:'sample data', pRegistrationNo:'sample data', pRegistrationName:'sample data', pCountryCode:'sample data', pRegionCode:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'};
      service.updateProcInsertVatRegNo(procInsertVatRegNo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procinsertvatregnoes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcInsertVatRegNo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcInsertVatRegNo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procinsertvatregnoes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});