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

import { FuncGetSharedBenefitService } from './func-get-shared-benefit.service';
import { FuncGetSharedBenefit } from '../api-models/func-get-shared-benefit.model'
import { FuncGetSharedBenefits } from "../api-models/testing/fake-func-get-shared-benefit.model"

describe('FuncGetSharedBenefitService', () => {
  let injector: TestBed;
  let service: FuncGetSharedBenefitService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetSharedBenefitService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetSharedBenefitService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetSharedBenefits', () => {
    it('should return an Promise<FuncGetSharedBenefit[]>', () => {
      const funcGetSharedBenefit = [
       {pBenefitPackageId:'sample data', pStartDate:'sample data', pEndDate:'sample data'},
       {pBenefitPackageId:'sample data', pStartDate:'sample data', pEndDate:'sample data'},
       {pBenefitPackageId:'sample data', pStartDate:'sample data', pEndDate:'sample data'}

      ];
      service.getFuncGetSharedBenefits().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsharedbenefits/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetSharedBenefit);
    });
  });


  describe('#createFuncGetSharedBenefit', () => {
    var id = 1;
    it('should return an Promise<FuncGetSharedBenefit>', () => {
      const funcGetSharedBenefit: FuncGetSharedBenefit = {pBenefitPackageId:'sample data', pStartDate:'sample data', pEndDate:'sample data'};
      service.createFuncGetSharedBenefit(funcGetSharedBenefit).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsharedbenefits`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetSharedBenefit', () => {
    var id = 1;
    it('should return an Promise<FuncGetSharedBenefit>', () => {
      const funcGetSharedBenefit: FuncGetSharedBenefit = {pBenefitPackageId:'sample data', pStartDate:'sample data', pEndDate:'sample data'};
      service.updateFuncGetSharedBenefit(funcGetSharedBenefit, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsharedbenefits/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetSharedBenefit', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetSharedBenefit(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsharedbenefits/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});