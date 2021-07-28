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

import { UpdateProvinceDetailsService } from './update-province-details.service';
import { UpdateProvinceDetails } from '../api-models/update-province-details.model'
import { UpdateProvinceDetail } from "../api-models/testing/fake-update-province-details.model"

describe('UpdateProvinceDetailsService', () => {
  let injector: TestBed;
  let service: UpdateProvinceDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UpdateProvinceDetailsService]
    });
    injector = getTestBed();
    service = injector.get(UpdateProvinceDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getUpdateProvinceDetail', () => {
    it('should return an Promise<UpdateProvinceDetails[]>', () => {
      const updateProvinceDetails = [
       {pSeqTaxScheduleId:1234, pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pTaxPercent:1234, pFundType:'sample data', pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pUser:'sample data', pReturnMsg:'sample data'},
       {pSeqTaxScheduleId:1234, pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pTaxPercent:1234, pFundType:'sample data', pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pUser:'sample data', pReturnMsg:'sample data'},
       {pSeqTaxScheduleId:1234, pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pTaxPercent:1234, pFundType:'sample data', pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pUser:'sample data', pReturnMsg:'sample data'}

      ];
      service.getUpdateProvinceDetail().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/updateprovincedetail/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(updateProvinceDetails);
    });
  });


  describe('#createUpdateProvinceDetails', () => {
    var id = 1;
    it('should return an Promise<UpdateProvinceDetails>', () => {
      const updateProvinceDetails: UpdateProvinceDetails = {pSeqTaxScheduleId:1234, pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pTaxPercent:1234, pFundType:'sample data', pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pUser:'sample data', pReturnMsg:'sample data'};
      service.createUpdateProvinceDetails(updateProvinceDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/updateprovincedetail`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateUpdateProvinceDetails', () => {
    var id = 1;
    it('should return an Promise<UpdateProvinceDetails>', () => {
      const updateProvinceDetails: UpdateProvinceDetails = {pSeqTaxScheduleId:1234, pTaxRegion:'sample data', pTaxType:'sample data', pTaxProduct:'sample data', pTaxPercent:1234, pFundType:'sample data', pEffDate:'sample data', pTermDate:'sample data', pProvinceEffDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pUser:'sample data', pReturnMsg:'sample data'};
      service.updateUpdateProvinceDetails(updateProvinceDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/updateprovincedetail/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteUpdateProvinceDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteUpdateProvinceDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/updateprovincedetail/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});