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

import { ProcUpdateGroupMasterUd12Service } from './proc-update-group-master-ud12.service';
import { ProcUpdateGroupMasterUd12 } from '../api-models/proc-update-group-master-ud12.model'
import { ProcUpdateGroupMasterUd12S } from "../api-models/testing/fake-proc-update-group-master-ud12.model"

describe('ProcUpdateGroupMasterUd12Service', () => {
  let injector: TestBed;
  let service: ProcUpdateGroupMasterUd12Service;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcUpdateGroupMasterUd12Service]
    });
    injector = getTestBed();
    service = injector.get(ProcUpdateGroupMasterUd12Service);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcUpdateGroupMasterUd12S', () => {
    it('should return an Promise<ProcUpdateGroupMasterUd12[]>', () => {
      const procUpdateGroupMasterUd12 = [
       {pRetcode:1234, pRetmsg:'sample data'},
       {pRetcode:1234, pRetmsg:'sample data'},
       {pRetcode:1234, pRetmsg:'sample data'}

      ];
      service.getProcUpdateGroupMasterUd12S().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procupdategroupmasterud12s/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procUpdateGroupMasterUd12);
    });
  });


  describe('#createProcUpdateGroupMasterUd12', () => {
    var id = 1;
    it('should return an Promise<ProcUpdateGroupMasterUd12>', () => {
      const procUpdateGroupMasterUd12: ProcUpdateGroupMasterUd12 = {pRetcode:1234, pRetmsg:'sample data'};
      service.createProcUpdateGroupMasterUd12(procUpdateGroupMasterUd12).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdategroupmasterud12s`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcUpdateGroupMasterUd12', () => {
    var id = 1;
    it('should return an Promise<ProcUpdateGroupMasterUd12>', () => {
      const procUpdateGroupMasterUd12: ProcUpdateGroupMasterUd12 = {pRetcode:1234, pRetmsg:'sample data'};
      service.updateProcUpdateGroupMasterUd12(procUpdateGroupMasterUd12, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdategroupmasterud12s/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcUpdateGroupMasterUd12', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcUpdateGroupMasterUd12(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdategroupmasterud12s/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});