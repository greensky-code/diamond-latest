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

import { ProcGetBankInfoService } from './proc-get-bank-info.service';
import { ProcGetBankInfo } from '../api-models/proc-get-bank-info.model'
import { ProcGetBankInfos } from "../api-models/testing/fake-proc-get-bank-info.model"

describe('ProcGetBankInfoService', () => {
  let injector: TestBed;
  let service: ProcGetBankInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetBankInfoService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetBankInfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetBankInfos', () => {
    it('should return an Promise<ProcGetBankInfo[]>', () => {
      const procGetBankInfo = [
       {pRoutingNum:'sample data', pBankName:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data', pEntityCode:'sample data', pPaymentType:'sample data'},
       {pRoutingNum:'sample data', pBankName:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data', pEntityCode:'sample data', pPaymentType:'sample data'},
       {pRoutingNum:'sample data', pBankName:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data', pEntityCode:'sample data', pPaymentType:'sample data'}

      ];
      service.getProcGetBankInfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetbankinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetBankInfo);
    });
  });


  describe('#createProcGetBankInfo', () => {
    var id = 1;
    it('should return an Promise<ProcGetBankInfo>', () => {
      const procGetBankInfo: ProcGetBankInfo = {pRoutingNum:'sample data', pBankName:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data', pEntityCode:'sample data', pPaymentType:'sample data'};
      service.createProcGetBankInfo(procGetBankInfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetbankinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetBankInfo', () => {
    var id = 1;
    it('should return an Promise<ProcGetBankInfo>', () => {
      const procGetBankInfo: ProcGetBankInfo = {pRoutingNum:'sample data', pBankName:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data', pEntityCode:'sample data', pPaymentType:'sample data'};
      service.updateProcGetBankInfo(procGetBankInfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetbankinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetBankInfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetBankInfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetbankinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});