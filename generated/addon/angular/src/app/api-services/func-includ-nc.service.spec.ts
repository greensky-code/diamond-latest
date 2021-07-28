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

import { FuncIncludNcService } from './func-includ-nc.service';
import { FuncIncludNc } from '../api-models/func-includ-nc.model'
import { FuncIncludNcs } from "../api-models/testing/fake-func-includ-nc.model"

describe('FuncIncludNcService', () => {
  let injector: TestBed;
  let service: FuncIncludNcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncIncludNcService]
    });
    injector = getTestBed();
    service = injector.get(FuncIncludNcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncIncludNcs', () => {
    it('should return an Promise<FuncIncludNc[]>', () => {
      const funcIncludNc = [
       {pOcAllowedAmt:1234, pOtherCarrierAmt:1234, pNotCoveredAmt:1234, pNotCoveredReason:'sample data'},
       {pOcAllowedAmt:1234, pOtherCarrierAmt:1234, pNotCoveredAmt:1234, pNotCoveredReason:'sample data'},
       {pOcAllowedAmt:1234, pOtherCarrierAmt:1234, pNotCoveredAmt:1234, pNotCoveredReason:'sample data'}

      ];
      service.getFuncIncludNcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcincludncs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcIncludNc);
    });
  });


  describe('#createFuncIncludNc', () => {
    var id = 1;
    it('should return an Promise<FuncIncludNc>', () => {
      const funcIncludNc: FuncIncludNc = {pOcAllowedAmt:1234, pOtherCarrierAmt:1234, pNotCoveredAmt:1234, pNotCoveredReason:'sample data'};
      service.createFuncIncludNc(funcIncludNc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcincludncs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncIncludNc', () => {
    var id = 1;
    it('should return an Promise<FuncIncludNc>', () => {
      const funcIncludNc: FuncIncludNc = {pOcAllowedAmt:1234, pOtherCarrierAmt:1234, pNotCoveredAmt:1234, pNotCoveredReason:'sample data'};
      service.updateFuncIncludNc(funcIncludNc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcincludncs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncIncludNc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncIncludNc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcincludncs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});