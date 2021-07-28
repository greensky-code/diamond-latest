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

import { FuncGetBalanceAmtService } from './func-get-balance-amt.service';
import { FuncGetBalanceAmt } from '../api-models/func-get-balance-amt.model'
import { FuncGetBalanceAmts } from "../api-models/testing/fake-func-get-balance-amt.model"

describe('FuncGetBalanceAmtService', () => {
  let injector: TestBed;
  let service: FuncGetBalanceAmtService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetBalanceAmtService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetBalanceAmtService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetBalanceAmts', () => {
    it('should return an Promise<FuncGetBalanceAmt[]>', () => {
      const funcGetBalanceAmt = [
       {pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pBenPackId:'sample data', pDos:'sample data', pRuleId:'sample data', pRuleType:'sample data', pLimitType:'sample data', pAgg:'sample data', pRuleAmtM:1234, pRuleAmtF:1234},
       {pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pBenPackId:'sample data', pDos:'sample data', pRuleId:'sample data', pRuleType:'sample data', pLimitType:'sample data', pAgg:'sample data', pRuleAmtM:1234, pRuleAmtF:1234},
       {pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pBenPackId:'sample data', pDos:'sample data', pRuleId:'sample data', pRuleType:'sample data', pLimitType:'sample data', pAgg:'sample data', pRuleAmtM:1234, pRuleAmtF:1234}

      ];
      service.getFuncGetBalanceAmts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetbalanceamts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetBalanceAmt);
    });
  });


  describe('#createFuncGetBalanceAmt', () => {
    var id = 1;
    it('should return an Promise<FuncGetBalanceAmt>', () => {
      const funcGetBalanceAmt: FuncGetBalanceAmt = {pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pBenPackId:'sample data', pDos:'sample data', pRuleId:'sample data', pRuleType:'sample data', pLimitType:'sample data', pAgg:'sample data', pRuleAmtM:1234, pRuleAmtF:1234};
      service.createFuncGetBalanceAmt(funcGetBalanceAmt).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetbalanceamts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetBalanceAmt', () => {
    var id = 1;
    it('should return an Promise<FuncGetBalanceAmt>', () => {
      const funcGetBalanceAmt: FuncGetBalanceAmt = {pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pBenPackId:'sample data', pDos:'sample data', pRuleId:'sample data', pRuleType:'sample data', pLimitType:'sample data', pAgg:'sample data', pRuleAmtM:1234, pRuleAmtF:1234};
      service.updateFuncGetBalanceAmt(funcGetBalanceAmt, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetbalanceamts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetBalanceAmt', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetBalanceAmt(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetbalanceamts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});