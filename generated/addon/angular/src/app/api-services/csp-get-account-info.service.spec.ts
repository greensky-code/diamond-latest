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

import { CspGetAccountInfoService } from './csp-get-account-info.service';
import { CspGetAccountInfo } from '../api-models/csp-get-account-info.model'
import { CspGetAccountInfos } from "../api-models/testing/fake-csp-get-account-info.model"

describe('CspGetAccountInfoService', () => {
  let injector: TestBed;
  let service: CspGetAccountInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetAccountInfoService]
    });
    injector = getTestBed();
    service = injector.get(CspGetAccountInfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetAccountInfos', () => {
    it('should return an Promise<CspGetAccountInfo[]>', () => {
      const cspGetAccountInfo = [
       {pSeqAccountId:1234, pBankAcctCode:'sample data', pEftStatusCode:'sample data', pSeqBankId:1234, pSeqEntityId:1234, pAccountNum:'sample data', pCareOf:'sample data'},
       {pSeqAccountId:1234, pBankAcctCode:'sample data', pEftStatusCode:'sample data', pSeqBankId:1234, pSeqEntityId:1234, pAccountNum:'sample data', pCareOf:'sample data'},
       {pSeqAccountId:1234, pBankAcctCode:'sample data', pEftStatusCode:'sample data', pSeqBankId:1234, pSeqEntityId:1234, pAccountNum:'sample data', pCareOf:'sample data'}

      ];
      service.getCspGetAccountInfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetaccountinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetAccountInfo);
    });
  });


  describe('#createCspGetAccountInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetAccountInfo>', () => {
      const cspGetAccountInfo: CspGetAccountInfo = {pSeqAccountId:1234, pBankAcctCode:'sample data', pEftStatusCode:'sample data', pSeqBankId:1234, pSeqEntityId:1234, pAccountNum:'sample data', pCareOf:'sample data'};
      service.createCspGetAccountInfo(cspGetAccountInfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetaccountinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetAccountInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetAccountInfo>', () => {
      const cspGetAccountInfo: CspGetAccountInfo = {pSeqAccountId:1234, pBankAcctCode:'sample data', pEftStatusCode:'sample data', pSeqBankId:1234, pSeqEntityId:1234, pAccountNum:'sample data', pCareOf:'sample data'};
      service.updateCspGetAccountInfo(cspGetAccountInfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetaccountinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetAccountInfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetAccountInfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetaccountinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});