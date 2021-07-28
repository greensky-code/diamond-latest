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

import { FuncGetInclInOopCalcIndService } from './func-get-incl-in-oop-calc-ind.service';
import { FuncGetInclInOopCalcInd } from '../api-models/func-get-incl-in-oop-calc-ind.model'
import { FuncGetInclInOopCalcInds } from "../api-models/testing/fake-func-get-incl-in-oop-calc-ind.model"

describe('FuncGetInclInOopCalcIndService', () => {
  let injector: TestBed;
  let service: FuncGetInclInOopCalcIndService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetInclInOopCalcIndService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetInclInOopCalcIndService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetInclInOopCalcInds', () => {
    it('should return an Promise<FuncGetInclInOopCalcInd[]>', () => {
      const funcGetInclInOopCalcInd = [
       {pPackageId:'sample data', pSvcDate:'sample data'},
       {pPackageId:'sample data', pSvcDate:'sample data'},
       {pPackageId:'sample data', pSvcDate:'sample data'}

      ];
      service.getFuncGetInclInOopCalcInds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetinclinoopcalcinds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetInclInOopCalcInd);
    });
  });


  describe('#createFuncGetInclInOopCalcInd', () => {
    var id = 1;
    it('should return an Promise<FuncGetInclInOopCalcInd>', () => {
      const funcGetInclInOopCalcInd: FuncGetInclInOopCalcInd = {pPackageId:'sample data', pSvcDate:'sample data'};
      service.createFuncGetInclInOopCalcInd(funcGetInclInOopCalcInd).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetinclinoopcalcinds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetInclInOopCalcInd', () => {
    var id = 1;
    it('should return an Promise<FuncGetInclInOopCalcInd>', () => {
      const funcGetInclInOopCalcInd: FuncGetInclInOopCalcInd = {pPackageId:'sample data', pSvcDate:'sample data'};
      service.updateFuncGetInclInOopCalcInd(funcGetInclInOopCalcInd, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetinclinoopcalcinds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetInclInOopCalcInd', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetInclInOopCalcInd(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetinclinoopcalcinds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});