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

import { GetPlanDataService } from './get-plan-data.service';
import { GetPlanData } from '../api-models/get-plan-data.model'
import { GetPlanDatas } from "../api-models/testing/fake-get-plan-data.model"

describe('GetPlanDataService', () => {
  let injector: TestBed;
  let service: GetPlanDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetPlanDataService]
    });
    injector = getTestBed();
    service = injector.get(GetPlanDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetPlanDatas', () => {
    it('should return an Promise<GetPlanData[]>', () => {
      const getPlanData = [
       {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'},
       {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'},
       {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'}

      ];
      service.getGetPlanDatas().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getplandatas/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getPlanData);
    });
  });


  describe('#createGetPlanData', () => {
    var id = 1;
    it('should return an Promise<GetPlanData>', () => {
      const getPlanData: GetPlanData = {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'};
      service.createGetPlanData(getPlanData).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getplandatas`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetPlanData', () => {
    var id = 1;
    it('should return an Promise<GetPlanData>', () => {
      const getPlanData: GetPlanData = {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'};
      service.updateGetPlanData(getPlanData, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getplandatas/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetPlanData', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetPlanData(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getplandatas/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});