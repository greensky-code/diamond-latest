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

import { GetProvinceHistoryService } from './get-province-history.service';
import { GetProvinceHistory } from '../api-models/get-province-history.model'
import { GetProvinceHistorys } from "../api-models/testing/fake-get-province-history.model"

describe('GetProvinceHistoryService', () => {
  let injector: TestBed;
  let service: GetProvinceHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetProvinceHistoryService]
    });
    injector = getTestBed();
    service = injector.get(GetProvinceHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetProvinceHistorys', () => {
    it('should return an Promise<GetProvinceHistory[]>', () => {
      const getProvinceHistory = [
       {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data'},
       {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data'},
       {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data'}

      ];
      service.getGetProvinceHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getprovincehistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getProvinceHistory);
    });
  });


  describe('#createGetProvinceHistory', () => {
    var id = 1;
    it('should return an Promise<GetProvinceHistory>', () => {
      const getProvinceHistory: GetProvinceHistory = {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data'};
      service.createGetProvinceHistory(getProvinceHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getprovincehistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetProvinceHistory', () => {
    var id = 1;
    it('should return an Promise<GetProvinceHistory>', () => {
      const getProvinceHistory: GetProvinceHistory = {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data'};
      service.updateGetProvinceHistory(getProvinceHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getprovincehistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetProvinceHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetProvinceHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getprovincehistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});