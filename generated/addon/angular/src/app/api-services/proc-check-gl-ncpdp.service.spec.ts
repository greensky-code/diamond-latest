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

import { ProcCheckGlNcpdpService } from './proc-check-gl-ncpdp.service';
import { ProcCheckGlNcpdp } from '../api-models/proc-check-gl-ncpdp.model'
import { ProcCheckGlNcpdps } from "../api-models/testing/fake-proc-check-gl-ncpdp.model"

describe('ProcCheckGlNcpdpService', () => {
  let injector: TestBed;
  let service: ProcCheckGlNcpdpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcCheckGlNcpdpService]
    });
    injector = getTestBed();
    service = injector.get(ProcCheckGlNcpdpService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcCheckGlNcpdps', () => {
    it('should return an Promise<ProcCheckGlNcpdp[]>', () => {
      const procCheckGlNcpdp = [
       {poRetcode:1234, poRetmsg:'sample data'},
       {poRetcode:1234, poRetmsg:'sample data'},
       {poRetcode:1234, poRetmsg:'sample data'}

      ];
      service.getProcCheckGlNcpdps().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/proccheckglncpdps/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procCheckGlNcpdp);
    });
  });


  describe('#createProcCheckGlNcpdp', () => {
    var id = 1;
    it('should return an Promise<ProcCheckGlNcpdp>', () => {
      const procCheckGlNcpdp: ProcCheckGlNcpdp = {poRetcode:1234, poRetmsg:'sample data'};
      service.createProcCheckGlNcpdp(procCheckGlNcpdp).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccheckglncpdps`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcCheckGlNcpdp', () => {
    var id = 1;
    it('should return an Promise<ProcCheckGlNcpdp>', () => {
      const procCheckGlNcpdp: ProcCheckGlNcpdp = {poRetcode:1234, poRetmsg:'sample data'};
      service.updateProcCheckGlNcpdp(procCheckGlNcpdp, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccheckglncpdps/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcCheckGlNcpdp', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcCheckGlNcpdp(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccheckglncpdps/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});