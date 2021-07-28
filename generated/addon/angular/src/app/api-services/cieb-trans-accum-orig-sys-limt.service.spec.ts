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

import { CiebTransAccumOrigSysLimtService } from './cieb-trans-accum-orig-sys-limt.service';
import { CiebTransAccumOrigSysLimt } from '../api-models/cieb-trans-accum-orig-sys-limt.model'
import { CiebTransAccumOrigSysLimts } from "../api-models/testing/fake-cieb-trans-accum-orig-sys-limt.model"

describe('CiebTransAccumOrigSysLimtService', () => {
  let injector: TestBed;
  let service: CiebTransAccumOrigSysLimtService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebTransAccumOrigSysLimtService]
    });
    injector = getTestBed();
    service = injector.get(CiebTransAccumOrigSysLimtService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebTransAccumOrigSysLimts', () => {
    it('should return an Promise<CiebTransAccumOrigSysLimt[]>', () => {
      const ciebTransAccumOrigSysLimt = [
       {seqSysId:1234, seqTransId:1234, sysLimitName:'sample data', sysXLimVal:'sample data', sysAccumPeriodTy:'sample data', sysCarryoverType:'sample data', sysCarryoverValue:1234, cntrDollarInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqSysId:1234, seqTransId:1234, sysLimitName:'sample data', sysXLimVal:'sample data', sysAccumPeriodTy:'sample data', sysCarryoverType:'sample data', sysCarryoverValue:1234, cntrDollarInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqSysId:1234, seqTransId:1234, sysLimitName:'sample data', sysXLimVal:'sample data', sysAccumPeriodTy:'sample data', sysCarryoverType:'sample data', sysCarryoverValue:1234, cntrDollarInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebTransAccumOrigSysLimts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumorigsyslimts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebTransAccumOrigSysLimt);
    });
  });


  describe('#createCiebTransAccumOrigSysLimt', () => {
    var id = 1;
    it('should return an Promise<CiebTransAccumOrigSysLimt>', () => {
      const ciebTransAccumOrigSysLimt: CiebTransAccumOrigSysLimt = {seqSysId:1234, seqTransId:1234, sysLimitName:'sample data', sysXLimVal:'sample data', sysAccumPeriodTy:'sample data', sysCarryoverType:'sample data', sysCarryoverValue:1234, cntrDollarInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebTransAccumOrigSysLimt(ciebTransAccumOrigSysLimt).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumorigsyslimts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebTransAccumOrigSysLimt', () => {
    var id = 1;
    it('should return an Promise<CiebTransAccumOrigSysLimt>', () => {
      const ciebTransAccumOrigSysLimt: CiebTransAccumOrigSysLimt = {seqSysId:1234, seqTransId:1234, sysLimitName:'sample data', sysXLimVal:'sample data', sysAccumPeriodTy:'sample data', sysCarryoverType:'sample data', sysCarryoverValue:1234, cntrDollarInd:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebTransAccumOrigSysLimt(ciebTransAccumOrigSysLimt, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumorigsyslimts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebTransAccumOrigSysLimt', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebTransAccumOrigSysLimt(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumorigsyslimts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});