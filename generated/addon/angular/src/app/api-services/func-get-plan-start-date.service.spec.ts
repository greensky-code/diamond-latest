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

import { FuncGetPlanStartDateService } from './func-get-plan-start-date.service';
import { FuncGetPlanStartDate } from '../api-models/func-get-plan-start-date.model'
import { FuncGetPlanStartDates } from "../api-models/testing/fake-func-get-plan-start-date.model"

describe('FuncGetPlanStartDateService', () => {
  let injector: TestBed;
  let service: FuncGetPlanStartDateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetPlanStartDateService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetPlanStartDateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetPlanStartDates', () => {
    it('should return an Promise<FuncGetPlanStartDate[]>', () => {
      const funcGetPlanStartDate = [
       {pSeqGroupId:1234, pSvcStartDt:'sample data'},
       {pSeqGroupId:1234, pSvcStartDt:'sample data'},
       {pSeqGroupId:1234, pSvcStartDt:'sample data'}

      ];
      service.getFuncGetPlanStartDates().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetplanstartdates/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetPlanStartDate);
    });
  });


  describe('#createFuncGetPlanStartDate', () => {
    var id = 1;
    it('should return an Promise<FuncGetPlanStartDate>', () => {
      const funcGetPlanStartDate: FuncGetPlanStartDate = {pSeqGroupId:1234, pSvcStartDt:'sample data'};
      service.createFuncGetPlanStartDate(funcGetPlanStartDate).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetplanstartdates`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetPlanStartDate', () => {
    var id = 1;
    it('should return an Promise<FuncGetPlanStartDate>', () => {
      const funcGetPlanStartDate: FuncGetPlanStartDate = {pSeqGroupId:1234, pSvcStartDt:'sample data'};
      service.updateFuncGetPlanStartDate(funcGetPlanStartDate, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetplanstartdates/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetPlanStartDate', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetPlanStartDate(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetplanstartdates/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});