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

import { FuncFamCovgListService } from './func-fam-covg-list.service';
import { FuncFamCovgList } from '../api-models/func-fam-covg-list.model'
import { FuncFamCovgLists } from "../api-models/testing/fake-func-fam-covg-list.model"

describe('FuncFamCovgListService', () => {
  let injector: TestBed;
  let service: FuncFamCovgListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncFamCovgListService]
    });
    injector = getTestBed();
    service = injector.get(FuncFamCovgListService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncFamCovgLists', () => {
    it('should return an Promise<FuncFamCovgList[]>', () => {
      const funcFamCovgList = [
       {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pBenefitType:'sample data'},
       {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pBenefitType:'sample data'},
       {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pBenefitType:'sample data'}

      ];
      service.getFuncFamCovgLists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcfamcovglists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcFamCovgList);
    });
  });


  describe('#createFuncFamCovgList', () => {
    var id = 1;
    it('should return an Promise<FuncFamCovgList>', () => {
      const funcFamCovgList: FuncFamCovgList = {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pBenefitType:'sample data'};
      service.createFuncFamCovgList(funcFamCovgList).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcfamcovglists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncFamCovgList', () => {
    var id = 1;
    it('should return an Promise<FuncFamCovgList>', () => {
      const funcFamCovgList: FuncFamCovgList = {pBenefitPackageId:'sample data', pAsOfDate:'sample data', pBenefitType:'sample data'};
      service.updateFuncFamCovgList(funcFamCovgList, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcfamcovglists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncFamCovgList', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncFamCovgList(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcfamcovglists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});