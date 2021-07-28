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

import { FuncGetBcrPaidAmtService } from './func-get-bcr-paid-amt.service';
import { FuncGetBcrPaidAmt } from '../api-models/func-get-bcr-paid-amt.model'
import { FuncGetBcrPaidAmts } from "../api-models/testing/fake-func-get-bcr-paid-amt.model"

describe('FuncGetBcrPaidAmtService', () => {
  let injector: TestBed;
  let service: FuncGetBcrPaidAmtService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetBcrPaidAmtService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetBcrPaidAmtService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetBcrPaidAmts', () => {
    it('should return an Promise<FuncGetBcrPaidAmt[]>', () => {
      const funcGetBcrPaidAmt = [
       {pSeqClaimId:1234, pLineNumber:1234, pSubLineCode:'sample data'},
       {pSeqClaimId:1234, pLineNumber:1234, pSubLineCode:'sample data'},
       {pSeqClaimId:1234, pLineNumber:1234, pSubLineCode:'sample data'}

      ];
      service.getFuncGetBcrPaidAmts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetbcrpaidamts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetBcrPaidAmt);
    });
  });


  describe('#createFuncGetBcrPaidAmt', () => {
    var id = 1;
    it('should return an Promise<FuncGetBcrPaidAmt>', () => {
      const funcGetBcrPaidAmt: FuncGetBcrPaidAmt = {pSeqClaimId:1234, pLineNumber:1234, pSubLineCode:'sample data'};
      service.createFuncGetBcrPaidAmt(funcGetBcrPaidAmt).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetbcrpaidamts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetBcrPaidAmt', () => {
    var id = 1;
    it('should return an Promise<FuncGetBcrPaidAmt>', () => {
      const funcGetBcrPaidAmt: FuncGetBcrPaidAmt = {pSeqClaimId:1234, pLineNumber:1234, pSubLineCode:'sample data'};
      service.updateFuncGetBcrPaidAmt(funcGetBcrPaidAmt, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetbcrpaidamts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetBcrPaidAmt', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetBcrPaidAmt(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetbcrpaidamts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});