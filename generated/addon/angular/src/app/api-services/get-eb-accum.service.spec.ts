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

import { GetEbAccumService } from './get-eb-accum.service';
import { GetEbAccum } from '../api-models/get-eb-accum.model'
import { GetEbAccums } from "../api-models/testing/fake-get-eb-accum.model"

describe('GetEbAccumService', () => {
  let injector: TestBed;
  let service: GetEbAccumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetEbAccumService]
    });
    injector = getTestBed();
    service = injector.get(GetEbAccumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetEbAccums', () => {
    it('should return an Promise<GetEbAccum[]>', () => {
      const getEbAccum = [
       {pSeqMembId:1234, pSeqSubsId:1234, pCoverage:'sample data', pBenpkId:'sample data', pRuleType:'sample data', pRuleId:'sample data', pLimitType:'sample data', pPlanStartDt:'sample data', pPlanEndDt:'sample data', pAgg:'sample data'},
       {pSeqMembId:1234, pSeqSubsId:1234, pCoverage:'sample data', pBenpkId:'sample data', pRuleType:'sample data', pRuleId:'sample data', pLimitType:'sample data', pPlanStartDt:'sample data', pPlanEndDt:'sample data', pAgg:'sample data'},
       {pSeqMembId:1234, pSeqSubsId:1234, pCoverage:'sample data', pBenpkId:'sample data', pRuleType:'sample data', pRuleId:'sample data', pLimitType:'sample data', pPlanStartDt:'sample data', pPlanEndDt:'sample data', pAgg:'sample data'}

      ];
      service.getGetEbAccums().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getebaccums/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getEbAccum);
    });
  });


  describe('#createGetEbAccum', () => {
    var id = 1;
    it('should return an Promise<GetEbAccum>', () => {
      const getEbAccum: GetEbAccum = {pSeqMembId:1234, pSeqSubsId:1234, pCoverage:'sample data', pBenpkId:'sample data', pRuleType:'sample data', pRuleId:'sample data', pLimitType:'sample data', pPlanStartDt:'sample data', pPlanEndDt:'sample data', pAgg:'sample data'};
      service.createGetEbAccum(getEbAccum).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getebaccums`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetEbAccum', () => {
    var id = 1;
    it('should return an Promise<GetEbAccum>', () => {
      const getEbAccum: GetEbAccum = {pSeqMembId:1234, pSeqSubsId:1234, pCoverage:'sample data', pBenpkId:'sample data', pRuleType:'sample data', pRuleId:'sample data', pLimitType:'sample data', pPlanStartDt:'sample data', pPlanEndDt:'sample data', pAgg:'sample data'};
      service.updateGetEbAccum(getEbAccum, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getebaccums/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetEbAccum', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetEbAccum(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getebaccums/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});