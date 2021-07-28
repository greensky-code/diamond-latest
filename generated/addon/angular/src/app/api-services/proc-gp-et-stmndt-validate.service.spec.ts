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

import { ProcGpEtStmndtValidateService } from './proc-gp-et-stmndt-validate.service';
import { ProcGpEtStmndtValidate } from '../api-models/proc-gp-et-stmndt-validate.model'
import { ProcGpEtStmndtValidates } from "../api-models/testing/fake-proc-gp-et-stmndt-validate.model"

describe('ProcGpEtStmndtValidateService', () => {
  let injector: TestBed;
  let service: ProcGpEtStmndtValidateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGpEtStmndtValidateService]
    });
    injector = getTestBed();
    service = injector.get(ProcGpEtStmndtValidateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGpEtStmndtValidates', () => {
    it('should return an Promise<ProcGpEtStmndtValidate[]>', () => {
      const procGpEtStmndtValidate = [
       {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', oValidResult:'sample data'},
       {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', oValidResult:'sample data'},
       {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', oValidResult:'sample data'}

      ];
      service.getProcGpEtStmndtValidates().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgpetstmndtvalidates/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGpEtStmndtValidate);
    });
  });


  describe('#createProcGpEtStmndtValidate', () => {
    var id = 1;
    it('should return an Promise<ProcGpEtStmndtValidate>', () => {
      const procGpEtStmndtValidate: ProcGpEtStmndtValidate = {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', oValidResult:'sample data'};
      service.createProcGpEtStmndtValidate(procGpEtStmndtValidate).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgpetstmndtvalidates`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGpEtStmndtValidate', () => {
    var id = 1;
    it('should return an Promise<ProcGpEtStmndtValidate>', () => {
      const procGpEtStmndtValidate: ProcGpEtStmndtValidate = {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', oValidResult:'sample data'};
      service.updateProcGpEtStmndtValidate(procGpEtStmndtValidate, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgpetstmndtvalidates/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGpEtStmndtValidate', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGpEtStmndtValidate(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgpetstmndtvalidates/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});