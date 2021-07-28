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

import { ProcArchivePayerNcpdpService } from './proc-archive-payer-ncpdp.service';
import { ProcArchivePayerNcpdp } from '../api-models/proc-archive-payer-ncpdp.model'
import { ProcArchivePayerNcpdps } from "../api-models/testing/fake-proc-archive-payer-ncpdp.model"

describe('ProcArchivePayerNcpdpService', () => {
  let injector: TestBed;
  let service: ProcArchivePayerNcpdpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcArchivePayerNcpdpService]
    });
    injector = getTestBed();
    service = injector.get(ProcArchivePayerNcpdpService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcArchivePayerNcpdps', () => {
    it('should return an Promise<ProcArchivePayerNcpdp[]>', () => {
      const procArchivePayerNcpdp = [
       {poRetcode:1234, poRetmsg:'sample data'},
       {poRetcode:1234, poRetmsg:'sample data'},
       {poRetcode:1234, poRetmsg:'sample data'}

      ];
      service.getProcArchivePayerNcpdps().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procarchivepayerncpdps/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procArchivePayerNcpdp);
    });
  });


  describe('#createProcArchivePayerNcpdp', () => {
    var id = 1;
    it('should return an Promise<ProcArchivePayerNcpdp>', () => {
      const procArchivePayerNcpdp: ProcArchivePayerNcpdp = {poRetcode:1234, poRetmsg:'sample data'};
      service.createProcArchivePayerNcpdp(procArchivePayerNcpdp).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procarchivepayerncpdps`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcArchivePayerNcpdp', () => {
    var id = 1;
    it('should return an Promise<ProcArchivePayerNcpdp>', () => {
      const procArchivePayerNcpdp: ProcArchivePayerNcpdp = {poRetcode:1234, poRetmsg:'sample data'};
      service.updateProcArchivePayerNcpdp(procArchivePayerNcpdp, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procarchivepayerncpdps/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcArchivePayerNcpdp', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcArchivePayerNcpdp(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procarchivepayerncpdps/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});