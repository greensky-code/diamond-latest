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

import { ProcSubgpEtStmndtSaveService } from './proc-subgp-et-stmndt-save.service';
import { ProcSubgpEtStmndtSave } from '../api-models/proc-subgp-et-stmndt-save.model'
import { ProcSubgpEtStmndtSaves } from "../api-models/testing/fake-proc-subgp-et-stmndt-save.model"

describe('ProcSubgpEtStmndtSaveService', () => {
  let injector: TestBed;
  let service: ProcSubgpEtStmndtSaveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcSubgpEtStmndtSaveService]
    });
    injector = getTestBed();
    service = injector.get(ProcSubgpEtStmndtSaveService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcSubgpEtStmndtSaves', () => {
    it('should return an Promise<ProcSubgpEtStmndtSave[]>', () => {
      const procSubgpEtStmndtSave = [
       {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234},
       {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234},
       {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234}

      ];
      service.getProcSubgpEtStmndtSaves().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procsubgpetstmndtsaves/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procSubgpEtStmndtSave);
    });
  });


  describe('#createProcSubgpEtStmndtSave', () => {
    var id = 1;
    it('should return an Promise<ProcSubgpEtStmndtSave>', () => {
      const procSubgpEtStmndtSave: ProcSubgpEtStmndtSave = {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234};
      service.createProcSubgpEtStmndtSave(procSubgpEtStmndtSave).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsubgpetstmndtsaves`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcSubgpEtStmndtSave', () => {
    var id = 1;
    it('should return an Promise<ProcSubgpEtStmndtSave>', () => {
      const procSubgpEtStmndtSave: ProcSubgpEtStmndtSave = {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234};
      service.updateProcSubgpEtStmndtSave(procSubgpEtStmndtSave, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsubgpetstmndtsaves/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcSubgpEtStmndtSave', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcSubgpEtStmndtSave(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsubgpetstmndtsaves/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});