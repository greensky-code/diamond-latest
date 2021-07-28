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

import { ProcUpdateVatRegNoService } from './proc-update-vat-reg-no.service';
import { ProcUpdateVatRegNo } from '../api-models/proc-update-vat-reg-no.model'
import { ProcUpdateVatRegNoes } from "../api-models/testing/fake-proc-update-vat-reg-no.model"

describe('ProcUpdateVatRegNoService', () => {
  let injector: TestBed;
  let service: ProcUpdateVatRegNoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcUpdateVatRegNoService]
    });
    injector = getTestBed();
    service = injector.get(ProcUpdateVatRegNoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcUpdateVatRegNoes', () => {
    it('should return an Promise<ProcUpdateVatRegNo[]>', () => {
      const procUpdateVatRegNo = [
       {pSeqAddlInfoId:1234, pRegistrationNo:'sample data', pRegistrationName:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'},
       {pSeqAddlInfoId:1234, pRegistrationNo:'sample data', pRegistrationName:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'},
       {pSeqAddlInfoId:1234, pRegistrationNo:'sample data', pRegistrationName:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'}

      ];
      service.getProcUpdateVatRegNoes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procupdatevatregnoes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procUpdateVatRegNo);
    });
  });


  describe('#createProcUpdateVatRegNo', () => {
    var id = 1;
    it('should return an Promise<ProcUpdateVatRegNo>', () => {
      const procUpdateVatRegNo: ProcUpdateVatRegNo = {pSeqAddlInfoId:1234, pRegistrationNo:'sample data', pRegistrationName:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'};
      service.createProcUpdateVatRegNo(procUpdateVatRegNo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdatevatregnoes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcUpdateVatRegNo', () => {
    var id = 1;
    it('should return an Promise<ProcUpdateVatRegNo>', () => {
      const procUpdateVatRegNo: ProcUpdateVatRegNo = {pSeqAddlInfoId:1234, pRegistrationNo:'sample data', pRegistrationName:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pRetMsg:'sample data'};
      service.updateProcUpdateVatRegNo(procUpdateVatRegNo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdatevatregnoes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcUpdateVatRegNo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcUpdateVatRegNo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdatevatregnoes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});