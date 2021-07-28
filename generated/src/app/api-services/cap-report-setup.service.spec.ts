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

import { CapReportSetupService } from './cap-report-setup.service';
import { CapReportSetup } from '../api-models/cap-report-setup.model'
import { CapReportSetups } from "../api-models/testing/fake-cap-report-setup.model"

describe('CapReportSetupService', () => {
  let injector: TestBed;
  let service: CapReportSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapReportSetupService]
    });
    injector = getTestBed();
    service = injector.get(CapReportSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapReportSetups', () => {
    it('should return an Promise<CapReportSetup[]>', () => {
      const capReportSetup = [
       {seqCprptId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', capReportTemplate:'sample data', seqCcalcId:1234, capEntityCode:'sample data', seqCapPool1:1234, seqCapPool2:1234, template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'},
       {seqCprptId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', capReportTemplate:'sample data', seqCcalcId:1234, capEntityCode:'sample data', seqCapPool1:1234, seqCapPool2:1234, template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'},
       {seqCprptId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', capReportTemplate:'sample data', seqCcalcId:1234, capEntityCode:'sample data', seqCapPool1:1234, seqCapPool2:1234, template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'}

      ];
      service.getCapReportSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capreportsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capReportSetup);
    });
  });


  describe('#createCapReportSetup', () => {
    var id = 1;
    it('should return an Promise<CapReportSetup>', () => {
      const capReportSetup: CapReportSetup = {seqCprptId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', capReportTemplate:'sample data', seqCcalcId:1234, capEntityCode:'sample data', seqCapPool1:1234, seqCapPool2:1234, template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'};
      service.createCapReportSetup(capReportSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capreportsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapReportSetup', () => {
    var id = 1;
    it('should return an Promise<CapReportSetup>', () => {
      const capReportSetup: CapReportSetup = {seqCprptId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', capReportTemplate:'sample data', seqCcalcId:1234, capEntityCode:'sample data', seqCapPool1:1234, seqCapPool2:1234, template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inProcess:'sample data'};
      service.updateCapReportSetup(capReportSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capreportsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapReportSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapReportSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capreportsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});