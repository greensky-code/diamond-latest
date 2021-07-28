/* Copyright (c) 2020 . All Rights Reserved. */

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

import { ApiJobSetupService } from './api-job-setup.service';
import { ApiJobSetup } from '../api-models/api-job-setup.model'
import { ApiJobSetups } from "../api-models/testing/fake-api-job-setup.model"

describe('ApiJobSetupService', () => {
  let injector: TestBed;
  let service: ApiJobSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiJobSetupService]
    });
    injector = getTestBed();
    service = injector.get(ApiJobSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getApiJobSetups', () => {
    it('should return an Promise<ApiJobSetup[]>', () => {
      const apiJobSetup = [
       {seqJobId:1234, dbmsJobId:1234, interfaceCode:1234, requestUser:'sample data', requestDate:'2018-01-01', importDirectory:'sample data', exportDirectory:'sample data', importFile:'sample data', exportFile:'sample data', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromRcvdDate:'2018-01-01', thruRcvdDate:'2018-01-01', status:1234, action:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqJobId:1234, dbmsJobId:1234, interfaceCode:1234, requestUser:'sample data', requestDate:'2018-01-01', importDirectory:'sample data', exportDirectory:'sample data', importFile:'sample data', exportFile:'sample data', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromRcvdDate:'2018-01-01', thruRcvdDate:'2018-01-01', status:1234, action:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqJobId:1234, dbmsJobId:1234, interfaceCode:1234, requestUser:'sample data', requestDate:'2018-01-01', importDirectory:'sample data', exportDirectory:'sample data', importFile:'sample data', exportFile:'sample data', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromRcvdDate:'2018-01-01', thruRcvdDate:'2018-01-01', status:1234, action:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getApiJobSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/apijobsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(apiJobSetup);
    });
  });


  describe('#createApiJobSetup', () => {
    var id = 1;
    it('should return an Promise<ApiJobSetup>', () => {
      const apiJobSetup: ApiJobSetup = {seqJobId:1234, dbmsJobId:1234, interfaceCode:1234, requestUser:'sample data', requestDate:'2018-01-01', importDirectory:'sample data', exportDirectory:'sample data', importFile:'sample data', exportFile:'sample data', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromRcvdDate:'2018-01-01', thruRcvdDate:'2018-01-01', status:1234, action:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createApiJobSetup(apiJobSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apijobsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateApiJobSetup', () => {
    var id = 1;
    it('should return an Promise<ApiJobSetup>', () => {
      const apiJobSetup: ApiJobSetup = {seqJobId:1234, dbmsJobId:1234, interfaceCode:1234, requestUser:'sample data', requestDate:'2018-01-01', importDirectory:'sample data', exportDirectory:'sample data', importFile:'sample data', exportFile:'sample data', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromRcvdDate:'2018-01-01', thruRcvdDate:'2018-01-01', status:1234, action:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateApiJobSetup(apiJobSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apijobsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteApiJobSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteApiJobSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apijobsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});