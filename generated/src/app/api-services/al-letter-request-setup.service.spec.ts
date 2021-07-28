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

import { AlLetterRequestSetupService } from './al-letter-request-setup.service';
import { AlLetterRequestSetup } from '../api-models/al-letter-request-setup.model'
import { AlLetterRequestSetups } from "../api-models/testing/fake-al-letter-request-setup.model"

describe('AlLetterRequestSetupService', () => {
  let injector: TestBed;
  let service: AlLetterRequestSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlLetterRequestSetupService]
    });
    injector = getTestBed();
    service = injector.get(AlLetterRequestSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAlLetterRequestSetups', () => {
    it('should return an Promise<AlLetterRequestSetup[]>', () => {
      const alLetterRequestSetup = [
       {seqLetterRequestId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', exportDirectory:'sample data', exportFilePrefix:'sample data', letterType:'sample data', letterEventId:'sample data', ruleOrder:1234, memberSelection:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterRequestId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', exportDirectory:'sample data', exportFilePrefix:'sample data', letterType:'sample data', letterEventId:'sample data', ruleOrder:1234, memberSelection:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterRequestId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', exportDirectory:'sample data', exportFilePrefix:'sample data', letterType:'sample data', letterEventId:'sample data', ruleOrder:1234, memberSelection:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAlLetterRequestSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/alletterrequestsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(alLetterRequestSetup);
    });
  });


  describe('#createAlLetterRequestSetup', () => {
    var id = 1;
    it('should return an Promise<AlLetterRequestSetup>', () => {
      const alLetterRequestSetup: AlLetterRequestSetup = {seqLetterRequestId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', exportDirectory:'sample data', exportFilePrefix:'sample data', letterType:'sample data', letterEventId:'sample data', ruleOrder:1234, memberSelection:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAlLetterRequestSetup(alLetterRequestSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alletterrequestsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAlLetterRequestSetup', () => {
    var id = 1;
    it('should return an Promise<AlLetterRequestSetup>', () => {
      const alLetterRequestSetup: AlLetterRequestSetup = {seqLetterRequestId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', exportDirectory:'sample data', exportFilePrefix:'sample data', letterType:'sample data', letterEventId:'sample data', ruleOrder:1234, memberSelection:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', action:1234, status:1234, requestType:'sample data', requestStartTime:'2018-01-01', requestTranInterval:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAlLetterRequestSetup(alLetterRequestSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alletterrequestsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAlLetterRequestSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAlLetterRequestSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alletterrequestsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});