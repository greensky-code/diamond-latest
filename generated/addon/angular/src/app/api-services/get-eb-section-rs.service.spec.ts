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

import { GetEbSectionRsService } from './get-eb-section-rs.service';
import { GetEbSectionRs } from '../api-models/get-eb-section-rs.model'
import { GetEbSectionR } from "../api-models/testing/fake-get-eb-section-rs.model"

describe('GetEbSectionRsService', () => {
  let injector: TestBed;
  let service: GetEbSectionRsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetEbSectionRsService]
    });
    injector = getTestBed();
    service = injector.get(GetEbSectionRsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetEbSectionR', () => {
    it('should return an Promise<GetEbSectionRs[]>', () => {
      const getEbSectionRs = [
       {pPackageId:'sample data', pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pDob:'sample data', pReqStcInforList:'sample data', pMedCovgStatus:'sample data', pDenCovgStatus:'sample data', pVisCovgStatus:'sample data', pSvcStartDt:'sample data', pContrPlanStartDt:'sample data', pContrPlanEndDt:'sample data', pPlanName:'sample data'},
       {pPackageId:'sample data', pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pDob:'sample data', pReqStcInforList:'sample data', pMedCovgStatus:'sample data', pDenCovgStatus:'sample data', pVisCovgStatus:'sample data', pSvcStartDt:'sample data', pContrPlanStartDt:'sample data', pContrPlanEndDt:'sample data', pPlanName:'sample data'},
       {pPackageId:'sample data', pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pDob:'sample data', pReqStcInforList:'sample data', pMedCovgStatus:'sample data', pDenCovgStatus:'sample data', pVisCovgStatus:'sample data', pSvcStartDt:'sample data', pContrPlanStartDt:'sample data', pContrPlanEndDt:'sample data', pPlanName:'sample data'}

      ];
      service.getGetEbSectionR().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getebsectionr/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getEbSectionRs);
    });
  });


  describe('#createGetEbSectionRs', () => {
    var id = 1;
    it('should return an Promise<GetEbSectionRs>', () => {
      const getEbSectionRs: GetEbSectionRs = {pPackageId:'sample data', pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pDob:'sample data', pReqStcInforList:'sample data', pMedCovgStatus:'sample data', pDenCovgStatus:'sample data', pVisCovgStatus:'sample data', pSvcStartDt:'sample data', pContrPlanStartDt:'sample data', pContrPlanEndDt:'sample data', pPlanName:'sample data'};
      service.createGetEbSectionRs(getEbSectionRs).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getebsectionr`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetEbSectionRs', () => {
    var id = 1;
    it('should return an Promise<GetEbSectionRs>', () => {
      const getEbSectionRs: GetEbSectionRs = {pPackageId:'sample data', pSeqMembId:1234, pSeqSubsId:1234, pSeqGroupId:1234, pDob:'sample data', pReqStcInforList:'sample data', pMedCovgStatus:'sample data', pDenCovgStatus:'sample data', pVisCovgStatus:'sample data', pSvcStartDt:'sample data', pContrPlanStartDt:'sample data', pContrPlanEndDt:'sample data', pPlanName:'sample data'};
      service.updateGetEbSectionRs(getEbSectionRs, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getebsectionr/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetEbSectionRs', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetEbSectionRs(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getebsectionr/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});