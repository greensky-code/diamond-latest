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

import { CspGetBankInfoService } from './csp-get-bank-info.service';
import { CspGetBankInfo } from '../api-models/csp-get-bank-info.model'
import { CspGetBankInfos } from "../api-models/testing/fake-csp-get-bank-info.model"

describe('CspGetBankInfoService', () => {
  let injector: TestBed;
  let service: CspGetBankInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetBankInfoService]
    });
    injector = getTestBed();
    service = injector.get(CspGetBankInfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetBankInfos', () => {
    it('should return an Promise<CspGetBankInfo[]>', () => {
      const cspGetBankInfo = [
       {pSeqBankId:1234, pRoutingNum:'sample data', pActiveInd:'sample data', pDirectDepositInd:'sample data', pAchInd:'sample data', pBankName:'sample data'},
       {pSeqBankId:1234, pRoutingNum:'sample data', pActiveInd:'sample data', pDirectDepositInd:'sample data', pAchInd:'sample data', pBankName:'sample data'},
       {pSeqBankId:1234, pRoutingNum:'sample data', pActiveInd:'sample data', pDirectDepositInd:'sample data', pAchInd:'sample data', pBankName:'sample data'}

      ];
      service.getCspGetBankInfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetbankinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetBankInfo);
    });
  });


  describe('#createCspGetBankInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetBankInfo>', () => {
      const cspGetBankInfo: CspGetBankInfo = {pSeqBankId:1234, pRoutingNum:'sample data', pActiveInd:'sample data', pDirectDepositInd:'sample data', pAchInd:'sample data', pBankName:'sample data'};
      service.createCspGetBankInfo(cspGetBankInfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetbankinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetBankInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetBankInfo>', () => {
      const cspGetBankInfo: CspGetBankInfo = {pSeqBankId:1234, pRoutingNum:'sample data', pActiveInd:'sample data', pDirectDepositInd:'sample data', pAchInd:'sample data', pBankName:'sample data'};
      service.updateCspGetBankInfo(cspGetBankInfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetbankinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetBankInfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetBankInfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetbankinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});