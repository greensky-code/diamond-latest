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

import { SubscIdChangeJobSetupService } from './subsc-id-change-job-setup.service';
import { SubscIdChangeJobSetup } from '../api-models/subsc-id-change-job-setup.model'
import { SubscIdChangeJobSetups } from "../api-models/testing/fake-subsc-id-change-job-setup.model"

describe('SubscIdChangeJobSetupService', () => {
  let injector: TestBed;
  let service: SubscIdChangeJobSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscIdChangeJobSetupService]
    });
    injector = getTestBed();
    service = injector.get(SubscIdChangeJobSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSubscIdChangeJobSetups', () => {
    it('should return an Promise<SubscIdChangeJobSetup[]>', () => {
      const subscIdChangeJobSetup = [
       {seqSubidId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', subsChangeJobComments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqSubidId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', subsChangeJobComments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqSubidId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', subsChangeJobComments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSubscIdChangeJobSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/subscidchangejobsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(subscIdChangeJobSetup);
    });
  });


  describe('#createSubscIdChangeJobSetup', () => {
    var id = 1;
    it('should return an Promise<SubscIdChangeJobSetup>', () => {
      const subscIdChangeJobSetup: SubscIdChangeJobSetup = {seqSubidId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', subsChangeJobComments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSubscIdChangeJobSetup(subscIdChangeJobSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscidchangejobsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSubscIdChangeJobSetup', () => {
    var id = 1;
    it('should return an Promise<SubscIdChangeJobSetup>', () => {
      const subscIdChangeJobSetup: SubscIdChangeJobSetup = {seqSubidId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', subsChangeJobComments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSubscIdChangeJobSetup(subscIdChangeJobSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscidchangejobsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSubscIdChangeJobSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSubscIdChangeJobSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscidchangejobsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});