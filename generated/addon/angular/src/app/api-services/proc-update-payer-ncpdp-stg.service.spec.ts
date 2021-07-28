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

import { ProcUpdatePayerNcpdpStgService } from './proc-update-payer-ncpdp-stg.service';
import { ProcUpdatePayerNcpdpStg } from '../api-models/proc-update-payer-ncpdp-stg.model'
import { ProcUpdatePayerNcpdpStgs } from "../api-models/testing/fake-proc-update-payer-ncpdp-stg.model"

describe('ProcUpdatePayerNcpdpStgService', () => {
  let injector: TestBed;
  let service: ProcUpdatePayerNcpdpStgService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcUpdatePayerNcpdpStgService]
    });
    injector = getTestBed();
    service = injector.get(ProcUpdatePayerNcpdpStgService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcUpdatePayerNcpdpStgs', () => {
    it('should return an Promise<ProcUpdatePayerNcpdpStg[]>', () => {
      const procUpdatePayerNcpdpStg = [
       {poRetcode:1234, poRetmsg:'sample data'},
       {poRetcode:1234, poRetmsg:'sample data'},
       {poRetcode:1234, poRetmsg:'sample data'}

      ];
      service.getProcUpdatePayerNcpdpStgs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procupdatepayerncpdpstgs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procUpdatePayerNcpdpStg);
    });
  });


  describe('#createProcUpdatePayerNcpdpStg', () => {
    var id = 1;
    it('should return an Promise<ProcUpdatePayerNcpdpStg>', () => {
      const procUpdatePayerNcpdpStg: ProcUpdatePayerNcpdpStg = {poRetcode:1234, poRetmsg:'sample data'};
      service.createProcUpdatePayerNcpdpStg(procUpdatePayerNcpdpStg).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdatepayerncpdpstgs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcUpdatePayerNcpdpStg', () => {
    var id = 1;
    it('should return an Promise<ProcUpdatePayerNcpdpStg>', () => {
      const procUpdatePayerNcpdpStg: ProcUpdatePayerNcpdpStg = {poRetcode:1234, poRetmsg:'sample data'};
      service.updateProcUpdatePayerNcpdpStg(procUpdatePayerNcpdpStg, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdatepayerncpdpstgs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcUpdatePayerNcpdpStg', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcUpdatePayerNcpdpStg(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdatepayerncpdpstgs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});