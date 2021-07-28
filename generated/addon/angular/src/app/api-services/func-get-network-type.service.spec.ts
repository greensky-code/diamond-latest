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

import { FuncGetNetworkTypeService } from './func-get-network-type.service';
import { FuncGetNetworkType } from '../api-models/func-get-network-type.model'
import { FuncGetNetworkTypes } from "../api-models/testing/fake-func-get-network-type.model"

describe('FuncGetNetworkTypeService', () => {
  let injector: TestBed;
  let service: FuncGetNetworkTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetNetworkTypeService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetNetworkTypeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetNetworkTypes', () => {
    it('should return an Promise<FuncGetNetworkType[]>', () => {
      const funcGetNetworkType = [
       {pBenefitPackageId:'sample data', pRuleId:'sample data'},
       {pBenefitPackageId:'sample data', pRuleId:'sample data'},
       {pBenefitPackageId:'sample data', pRuleId:'sample data'}

      ];
      service.getFuncGetNetworkTypes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetnetworktypes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetNetworkType);
    });
  });


  describe('#createFuncGetNetworkType', () => {
    var id = 1;
    it('should return an Promise<FuncGetNetworkType>', () => {
      const funcGetNetworkType: FuncGetNetworkType = {pBenefitPackageId:'sample data', pRuleId:'sample data'};
      service.createFuncGetNetworkType(funcGetNetworkType).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetnetworktypes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetNetworkType', () => {
    var id = 1;
    it('should return an Promise<FuncGetNetworkType>', () => {
      const funcGetNetworkType: FuncGetNetworkType = {pBenefitPackageId:'sample data', pRuleId:'sample data'};
      service.updateFuncGetNetworkType(funcGetNetworkType, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetnetworktypes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetNetworkType', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetNetworkType(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetnetworktypes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});