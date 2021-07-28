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

import { ProcUpdGrpTestStatusService } from './proc-upd-grp-test-status.service';
import { ProcUpdGrpTestStatus } from '../api-models/proc-upd-grp-test-status.model'
import { ProcUpdGrpTestStatu } from "../api-models/testing/fake-proc-upd-grp-test-status.model"

describe('ProcUpdGrpTestStatusService', () => {
  let injector: TestBed;
  let service: ProcUpdGrpTestStatusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcUpdGrpTestStatusService]
    });
    injector = getTestBed();
    service = injector.get(ProcUpdGrpTestStatusService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcUpdGrpTestStatu', () => {
    it('should return an Promise<ProcUpdGrpTestStatus[]>', () => {
      const procUpdGrpTestStatus = [
       {pPayerGroupId:'sample data', pTestStatus:'sample data', pErrMsg:'sample data'},
       {pPayerGroupId:'sample data', pTestStatus:'sample data', pErrMsg:'sample data'},
       {pPayerGroupId:'sample data', pTestStatus:'sample data', pErrMsg:'sample data'}

      ];
      service.getProcUpdGrpTestStatu().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procupdgrpteststatu/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procUpdGrpTestStatus);
    });
  });


  describe('#createProcUpdGrpTestStatus', () => {
    var id = 1;
    it('should return an Promise<ProcUpdGrpTestStatus>', () => {
      const procUpdGrpTestStatus: ProcUpdGrpTestStatus = {pPayerGroupId:'sample data', pTestStatus:'sample data', pErrMsg:'sample data'};
      service.createProcUpdGrpTestStatus(procUpdGrpTestStatus).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdgrpteststatu`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcUpdGrpTestStatus', () => {
    var id = 1;
    it('should return an Promise<ProcUpdGrpTestStatus>', () => {
      const procUpdGrpTestStatus: ProcUpdGrpTestStatus = {pPayerGroupId:'sample data', pTestStatus:'sample data', pErrMsg:'sample data'};
      service.updateProcUpdGrpTestStatus(procUpdGrpTestStatus, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdgrpteststatu/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcUpdGrpTestStatus', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcUpdGrpTestStatus(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdgrpteststatu/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});