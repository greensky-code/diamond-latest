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

import { GetProvinceDetailsService } from './get-province-details.service';
import { GetProvinceDetails } from '../api-models/get-province-details.model'
import { GetProvinceDetail } from "../api-models/testing/fake-get-province-details.model"

describe('GetProvinceDetailsService', () => {
  let injector: TestBed;
  let service: GetProvinceDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetProvinceDetailsService]
    });
    injector = getTestBed();
    service = injector.get(GetProvinceDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetProvinceDetail', () => {
    it('should return an Promise<GetProvinceDetails[]>', () => {
      const getProvinceDetails = [
       {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data', pTaxPercent:1234, pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pProvinceTax:'sample data'},
       {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data', pTaxPercent:1234, pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pProvinceTax:'sample data'},
       {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data', pTaxPercent:1234, pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pProvinceTax:'sample data'}

      ];
      service.getGetProvinceDetail().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getprovincedetail/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getProvinceDetails);
    });
  });


  describe('#createGetProvinceDetails', () => {
    var id = 1;
    it('should return an Promise<GetProvinceDetails>', () => {
      const getProvinceDetails: GetProvinceDetails = {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data', pTaxPercent:1234, pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pProvinceTax:'sample data'};
      service.createGetProvinceDetails(getProvinceDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getprovincedetail`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetProvinceDetails', () => {
    var id = 1;
    it('should return an Promise<GetProvinceDetails>', () => {
      const getProvinceDetails: GetProvinceDetails = {pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pFundType:'sample data', pTaxPercent:1234, pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pProvinceTax:'sample data'};
      service.updateGetProvinceDetails(getProvinceDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getprovincedetail/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetProvinceDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetProvinceDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getprovincedetail/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});