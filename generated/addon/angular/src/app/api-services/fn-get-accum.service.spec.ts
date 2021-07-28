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

import { FnGetAccumService } from './fn-get-accum.service';
import { FnGetAccum } from '../api-models/fn-get-accum.model'
import { FnGetAccums } from "../api-models/testing/fake-fn-get-accum.model"

describe('FnGetAccumService', () => {
  let injector: TestBed;
  let service: FnGetAccumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FnGetAccumService]
    });
    injector = getTestBed();
    service = injector.get(FnGetAccumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFnGetAccums', () => {
    it('should return an Promise<FnGetAccum[]>', () => {
      const fnGetAccum = [
       {inSeqMembId:1234, inRuleId:'sample data', inBenpkId:'sample data', inStDate:'sample data', inEndDate:'sample data', inLimitType:'sample data', inAgg:'sample data'},
       {inSeqMembId:1234, inRuleId:'sample data', inBenpkId:'sample data', inStDate:'sample data', inEndDate:'sample data', inLimitType:'sample data', inAgg:'sample data'},
       {inSeqMembId:1234, inRuleId:'sample data', inBenpkId:'sample data', inStDate:'sample data', inEndDate:'sample data', inLimitType:'sample data', inAgg:'sample data'}

      ];
      service.getFnGetAccums().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/fngetaccums/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(fnGetAccum);
    });
  });


  describe('#createFnGetAccum', () => {
    var id = 1;
    it('should return an Promise<FnGetAccum>', () => {
      const fnGetAccum: FnGetAccum = {inSeqMembId:1234, inRuleId:'sample data', inBenpkId:'sample data', inStDate:'sample data', inEndDate:'sample data', inLimitType:'sample data', inAgg:'sample data'};
      service.createFnGetAccum(fnGetAccum).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/fngetaccums`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFnGetAccum', () => {
    var id = 1;
    it('should return an Promise<FnGetAccum>', () => {
      const fnGetAccum: FnGetAccum = {inSeqMembId:1234, inRuleId:'sample data', inBenpkId:'sample data', inStDate:'sample data', inEndDate:'sample data', inLimitType:'sample data', inAgg:'sample data'};
      service.updateFnGetAccum(fnGetAccum, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/fngetaccums/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFnGetAccum', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFnGetAccum(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/fngetaccums/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});