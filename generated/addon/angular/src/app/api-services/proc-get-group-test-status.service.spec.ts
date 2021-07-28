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

import { ProcGetGroupTestStatusService } from './proc-get-group-test-status.service';
import { ProcGetGroupTestStatus } from '../api-models/proc-get-group-test-status.model'
import { ProcGetGroupTestStatu } from "../api-models/testing/fake-proc-get-group-test-status.model"

describe('ProcGetGroupTestStatusService', () => {
  let injector: TestBed;
  let service: ProcGetGroupTestStatusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetGroupTestStatusService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetGroupTestStatusService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetGroupTestStatu', () => {
    it('should return an Promise<ProcGetGroupTestStatus[]>', () => {
      const procGetGroupTestStatus = [
       {pSeqGroupId:1234, pShowField:'sample data', pShowValue:'sample data'},
       {pSeqGroupId:1234, pShowField:'sample data', pShowValue:'sample data'},
       {pSeqGroupId:1234, pShowField:'sample data', pShowValue:'sample data'}

      ];
      service.getProcGetGroupTestStatu().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupteststatu/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetGroupTestStatus);
    });
  });


  describe('#createProcGetGroupTestStatus', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupTestStatus>', () => {
      const procGetGroupTestStatus: ProcGetGroupTestStatus = {pSeqGroupId:1234, pShowField:'sample data', pShowValue:'sample data'};
      service.createProcGetGroupTestStatus(procGetGroupTestStatus).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupteststatu`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetGroupTestStatus', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupTestStatus>', () => {
      const procGetGroupTestStatus: ProcGetGroupTestStatus = {pSeqGroupId:1234, pShowField:'sample data', pShowValue:'sample data'};
      service.updateProcGetGroupTestStatus(procGetGroupTestStatus, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupteststatu/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetGroupTestStatus', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetGroupTestStatus(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupteststatu/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});