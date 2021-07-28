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

import { ProcProcessstatusService } from './proc-processstatus.service';
import { ProcProcessstatus } from '../api-models/proc-processstatus.model'
import { ProcProcessstatu } from "../api-models/testing/fake-proc-processstatus.model"

describe('ProcProcessstatusService', () => {
  let injector: TestBed;
  let service: ProcProcessstatusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcProcessstatusService]
    });
    injector = getTestBed();
    service = injector.get(ProcProcessstatusService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcProcessstatu', () => {
    it('should return an Promise<ProcProcessstatus[]>', () => {
      const procProcessstatus = [
       {pProcessName:'sample data', pProcessCode:1234, pStatusDesc:'sample data'},
       {pProcessName:'sample data', pProcessCode:1234, pStatusDesc:'sample data'},
       {pProcessName:'sample data', pProcessCode:1234, pStatusDesc:'sample data'}

      ];
      service.getProcProcessstatu().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procprocessstatu/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procProcessstatus);
    });
  });


  describe('#createProcProcessstatus', () => {
    var id = 1;
    it('should return an Promise<ProcProcessstatus>', () => {
      const procProcessstatus: ProcProcessstatus = {pProcessName:'sample data', pProcessCode:1234, pStatusDesc:'sample data'};
      service.createProcProcessstatus(procProcessstatus).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procprocessstatu`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcProcessstatus', () => {
    var id = 1;
    it('should return an Promise<ProcProcessstatus>', () => {
      const procProcessstatus: ProcProcessstatus = {pProcessName:'sample data', pProcessCode:1234, pStatusDesc:'sample data'};
      service.updateProcProcessstatus(procProcessstatus, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procprocessstatu/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcProcessstatus', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcProcessstatus(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procprocessstatu/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});