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

import { FuncIndFamConvertService } from './func-ind-fam-convert.service';
import { FuncIndFamConvert } from '../api-models/func-ind-fam-convert.model'
import { FuncIndFamConverts } from "../api-models/testing/fake-func-ind-fam-convert.model"

describe('FuncIndFamConvertService', () => {
  let injector: TestBed;
  let service: FuncIndFamConvertService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncIndFamConvertService]
    });
    injector = getTestBed();
    service = injector.get(FuncIndFamConvertService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncIndFamConverts', () => {
    it('should return an Promise<FuncIndFamConvert[]>', () => {
      const funcIndFamConvert = [
       {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pRuleType:'sample data', pFamCovgType:'sample data'},
       {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pRuleType:'sample data', pFamCovgType:'sample data'},
       {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pRuleType:'sample data', pFamCovgType:'sample data'}

      ];
      service.getFuncIndFamConverts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcindfamconverts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcIndFamConvert);
    });
  });


  describe('#createFuncIndFamConvert', () => {
    var id = 1;
    it('should return an Promise<FuncIndFamConvert>', () => {
      const funcIndFamConvert: FuncIndFamConvert = {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pRuleType:'sample data', pFamCovgType:'sample data'};
      service.createFuncIndFamConvert(funcIndFamConvert).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcindfamconverts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncIndFamConvert', () => {
    var id = 1;
    it('should return an Promise<FuncIndFamConvert>', () => {
      const funcIndFamConvert: FuncIndFamConvert = {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pRuleType:'sample data', pFamCovgType:'sample data'};
      service.updateFuncIndFamConvert(funcIndFamConvert, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcindfamconverts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncIndFamConvert', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncIndFamConvert(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcindfamconverts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});