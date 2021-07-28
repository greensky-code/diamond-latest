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

import { CheckClearVoidSetupService } from './check-clear-void-setup.service';
import { CheckClearVoidSetup } from '../api-models/check-clear-void-setup.model'
import { CheckClearVoidSetups } from "../api-models/testing/fake-check-clear-void-setup.model"

describe('CheckClearVoidSetupService', () => {
  let injector: TestBed;
  let service: CheckClearVoidSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckClearVoidSetupService]
    });
    injector = getTestBed();
    service = injector.get(CheckClearVoidSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCheckClearVoidSetups', () => {
    it('should return an Promise<CheckClearVoidSetup[]>', () => {
      const checkClearVoidSetup = [
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', daemonRequest:'sample data', action:'sample data', requestDate:'2018-01-01', requestUser:'sample data', seqCvsupId:1234, jobId:'sample data'},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', daemonRequest:'sample data', action:'sample data', requestDate:'2018-01-01', requestUser:'sample data', seqCvsupId:1234, jobId:'sample data'},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', daemonRequest:'sample data', action:'sample data', requestDate:'2018-01-01', requestUser:'sample data', seqCvsupId:1234, jobId:'sample data'}

      ];
      service.getCheckClearVoidSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/checkclearvoidsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(checkClearVoidSetup);
    });
  });


  describe('#createCheckClearVoidSetup', () => {
    var id = 1;
    it('should return an Promise<CheckClearVoidSetup>', () => {
      const checkClearVoidSetup: CheckClearVoidSetup = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', daemonRequest:'sample data', action:'sample data', requestDate:'2018-01-01', requestUser:'sample data', seqCvsupId:1234, jobId:'sample data'};
      service.createCheckClearVoidSetup(checkClearVoidSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkclearvoidsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCheckClearVoidSetup', () => {
    var id = 1;
    it('should return an Promise<CheckClearVoidSetup>', () => {
      const checkClearVoidSetup: CheckClearVoidSetup = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', daemonRequest:'sample data', action:'sample data', requestDate:'2018-01-01', requestUser:'sample data', seqCvsupId:1234, jobId:'sample data'};
      service.updateCheckClearVoidSetup(checkClearVoidSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkclearvoidsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCheckClearVoidSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCheckClearVoidSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkclearvoidsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});