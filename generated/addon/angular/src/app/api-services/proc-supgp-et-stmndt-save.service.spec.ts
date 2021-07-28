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

import { ProcSupgpEtStmndtSaveService } from './proc-supgp-et-stmndt-save.service';
import { ProcSupgpEtStmndtSave } from '../api-models/proc-supgp-et-stmndt-save.model'
import { ProcSupgpEtStmndtSaves } from "../api-models/testing/fake-proc-supgp-et-stmndt-save.model"

describe('ProcSupgpEtStmndtSaveService', () => {
  let injector: TestBed;
  let service: ProcSupgpEtStmndtSaveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcSupgpEtStmndtSaveService]
    });
    injector = getTestBed();
    service = injector.get(ProcSupgpEtStmndtSaveService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcSupgpEtStmndtSaves', () => {
    it('should return an Promise<ProcSupgpEtStmndtSave[]>', () => {
      const procSupgpEtStmndtSave = [
       {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234},
       {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234},
       {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234}

      ];
      service.getProcSupgpEtStmndtSaves().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procsupgpetstmndtsaves/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procSupgpEtStmndtSave);
    });
  });


  describe('#createProcSupgpEtStmndtSave', () => {
    var id = 1;
    it('should return an Promise<ProcSupgpEtStmndtSave>', () => {
      const procSupgpEtStmndtSave: ProcSupgpEtStmndtSave = {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234};
      service.createProcSupgpEtStmndtSave(procSupgpEtStmndtSave).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsupgpetstmndtsaves`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcSupgpEtStmndtSave', () => {
    var id = 1;
    it('should return an Promise<ProcSupgpEtStmndtSave>', () => {
      const procSupgpEtStmndtSave: ProcSupgpEtStmndtSave = {pSeqGpstatId:1234, pSeqGroupId:1234, pState:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReason:'sample data', pUserId:'sample data', oMessageId:1234};
      service.updateProcSupgpEtStmndtSave(procSupgpEtStmndtSave, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsupgpetstmndtsaves/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcSupgpEtStmndtSave', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcSupgpEtStmndtSave(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsupgpetstmndtsaves/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});