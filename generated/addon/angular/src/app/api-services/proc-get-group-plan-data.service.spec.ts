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

import { ProcGetGroupPlanDataService } from './proc-get-group-plan-data.service';
import { ProcGetGroupPlanData } from '../api-models/proc-get-group-plan-data.model'
import { ProcGetGroupPlanDatas } from "../api-models/testing/fake-proc-get-group-plan-data.model"

describe('ProcGetGroupPlanDataService', () => {
  let injector: TestBed;
  let service: ProcGetGroupPlanDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetGroupPlanDataService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetGroupPlanDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetGroupPlanDatas', () => {
    it('should return an Promise<ProcGetGroupPlanData[]>', () => {
      const procGetGroupPlanData = [
       {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'},
       {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'},
       {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'}

      ];
      service.getProcGetGroupPlanDatas().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupplandatas/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetGroupPlanData);
    });
  });


  describe('#createProcGetGroupPlanData', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupPlanData>', () => {
      const procGetGroupPlanData: ProcGetGroupPlanData = {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'};
      service.createProcGetGroupPlanData(procGetGroupPlanData).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupplandatas`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetGroupPlanData', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupPlanData>', () => {
      const procGetGroupPlanData: ProcGetGroupPlanData = {pSeqGroupId:1234, pSvcStartDt:'sample data', oPlanEffDt:'sample data', oPlanTermDt:'sample data', oTermReason:'sample data', oPlanName:'sample data'};
      service.updateProcGetGroupPlanData(procGetGroupPlanData, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupplandatas/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetGroupPlanData', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetGroupPlanData(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupplandatas/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});