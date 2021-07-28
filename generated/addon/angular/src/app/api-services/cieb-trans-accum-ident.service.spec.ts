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

import { CiebTransAccumIdentService } from './cieb-trans-accum-ident.service';
import { CiebTransAccumIdent } from '../api-models/cieb-trans-accum-ident.model'
import { CiebTransAccumIdents } from "../api-models/testing/fake-cieb-trans-accum-ident.model"

describe('CiebTransAccumIdentService', () => {
  let injector: TestBed;
  let service: CiebTransAccumIdentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebTransAccumIdentService]
    });
    injector = getTestBed();
    service = injector.get(CiebTransAccumIdentService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebTransAccumIdents', () => {
    it('should return an Promise<CiebTransAccumIdent[]>', () => {
      const ciebTransAccumIdent = [
       {seqAccumId:1234, seqTransId:1234, accumIdName:'sample data', accumAdjType:'sample data', systemType:'sample data', trgtAccumAdjType:'sample data', sysName:'sample data', sysInitAdjName:'sample data', sysAdjAmt:1234, sysInitBalName:'sample data', sysCombinedBalAmt:1234, sysPristineBalAmt:1234, sysAccumPeriodDt:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', errorCd:'sample data'},
       {seqAccumId:1234, seqTransId:1234, accumIdName:'sample data', accumAdjType:'sample data', systemType:'sample data', trgtAccumAdjType:'sample data', sysName:'sample data', sysInitAdjName:'sample data', sysAdjAmt:1234, sysInitBalName:'sample data', sysCombinedBalAmt:1234, sysPristineBalAmt:1234, sysAccumPeriodDt:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', errorCd:'sample data'},
       {seqAccumId:1234, seqTransId:1234, accumIdName:'sample data', accumAdjType:'sample data', systemType:'sample data', trgtAccumAdjType:'sample data', sysName:'sample data', sysInitAdjName:'sample data', sysAdjAmt:1234, sysInitBalName:'sample data', sysCombinedBalAmt:1234, sysPristineBalAmt:1234, sysAccumPeriodDt:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', errorCd:'sample data'}

      ];
      service.getCiebTransAccumIdents().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumidents/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebTransAccumIdent);
    });
  });


  describe('#createCiebTransAccumIdent', () => {
    var id = 1;
    it('should return an Promise<CiebTransAccumIdent>', () => {
      const ciebTransAccumIdent: CiebTransAccumIdent = {seqAccumId:1234, seqTransId:1234, accumIdName:'sample data', accumAdjType:'sample data', systemType:'sample data', trgtAccumAdjType:'sample data', sysName:'sample data', sysInitAdjName:'sample data', sysAdjAmt:1234, sysInitBalName:'sample data', sysCombinedBalAmt:1234, sysPristineBalAmt:1234, sysAccumPeriodDt:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', errorCd:'sample data'};
      service.createCiebTransAccumIdent(ciebTransAccumIdent).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumidents`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebTransAccumIdent', () => {
    var id = 1;
    it('should return an Promise<CiebTransAccumIdent>', () => {
      const ciebTransAccumIdent: CiebTransAccumIdent = {seqAccumId:1234, seqTransId:1234, accumIdName:'sample data', accumAdjType:'sample data', systemType:'sample data', trgtAccumAdjType:'sample data', sysName:'sample data', sysInitAdjName:'sample data', sysAdjAmt:1234, sysInitBalName:'sample data', sysCombinedBalAmt:1234, sysPristineBalAmt:1234, sysAccumPeriodDt:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', errorCd:'sample data'};
      service.updateCiebTransAccumIdent(ciebTransAccumIdent, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumidents/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebTransAccumIdent', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebTransAccumIdent(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumidents/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});