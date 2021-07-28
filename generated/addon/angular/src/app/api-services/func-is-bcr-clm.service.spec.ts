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

import { FuncIsBcrClmService } from './func-is-bcr-clm.service';
import { FuncIsBcrClm } from '../api-models/func-is-bcr-clm.model'
import { FuncIsBcrClms } from "../api-models/testing/fake-func-is-bcr-clm.model"

describe('FuncIsBcrClmService', () => {
  let injector: TestBed;
  let service: FuncIsBcrClmService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncIsBcrClmService]
    });
    injector = getTestBed();
    service = injector.get(FuncIsBcrClmService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncIsBcrClms', () => {
    it('should return an Promise<FuncIsBcrClm[]>', () => {
      const funcIsBcrClm = [
       {pSeqClaimId:1234, pOcCarrierCode:'sample data', pSeqGroupId:1234, pPlanCode:'sample data', pDetailSvcDate:'sample data'},
       {pSeqClaimId:1234, pOcCarrierCode:'sample data', pSeqGroupId:1234, pPlanCode:'sample data', pDetailSvcDate:'sample data'},
       {pSeqClaimId:1234, pOcCarrierCode:'sample data', pSeqGroupId:1234, pPlanCode:'sample data', pDetailSvcDate:'sample data'}

      ];
      service.getFuncIsBcrClms().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcisbcrclms/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcIsBcrClm);
    });
  });


  describe('#createFuncIsBcrClm', () => {
    var id = 1;
    it('should return an Promise<FuncIsBcrClm>', () => {
      const funcIsBcrClm: FuncIsBcrClm = {pSeqClaimId:1234, pOcCarrierCode:'sample data', pSeqGroupId:1234, pPlanCode:'sample data', pDetailSvcDate:'sample data'};
      service.createFuncIsBcrClm(funcIsBcrClm).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcisbcrclms`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncIsBcrClm', () => {
    var id = 1;
    it('should return an Promise<FuncIsBcrClm>', () => {
      const funcIsBcrClm: FuncIsBcrClm = {pSeqClaimId:1234, pOcCarrierCode:'sample data', pSeqGroupId:1234, pPlanCode:'sample data', pDetailSvcDate:'sample data'};
      service.updateFuncIsBcrClm(funcIsBcrClm, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcisbcrclms/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncIsBcrClm', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncIsBcrClm(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcisbcrclms/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});