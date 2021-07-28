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

import { AptaxReportSetupService } from './aptax-report-setup.service';
import { AptaxReportSetup } from '../api-models/aptax-report-setup.model'
import { AptaxReportSetups } from "../api-models/testing/fake-aptax-report-setup.model"

describe('AptaxReportSetupService', () => {
  let injector: TestBed;
  let service: AptaxReportSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AptaxReportSetupService]
    });
    injector = getTestBed();
    service = injector.get(AptaxReportSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAptaxReportSetups', () => {
    it('should return an Promise<AptaxReportSetup[]>', () => {
      const aptaxReportSetup = [
       {includeOffsets:'sample data', includeNochecks:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', sortOptions:'sample data', comments:'sample data', dollarLimit:1234, taxYear:'2018-01-01', taxRepEntity:'sample data', status:'sample data', action:'sample data', reportType:'sample data', requestType:'sample data', requestDatetime:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqAptaxId:1234},
       {includeOffsets:'sample data', includeNochecks:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', sortOptions:'sample data', comments:'sample data', dollarLimit:1234, taxYear:'2018-01-01', taxRepEntity:'sample data', status:'sample data', action:'sample data', reportType:'sample data', requestType:'sample data', requestDatetime:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqAptaxId:1234},
       {includeOffsets:'sample data', includeNochecks:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', sortOptions:'sample data', comments:'sample data', dollarLimit:1234, taxYear:'2018-01-01', taxRepEntity:'sample data', status:'sample data', action:'sample data', reportType:'sample data', requestType:'sample data', requestDatetime:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqAptaxId:1234}

      ];
      service.getAptaxReportSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/aptaxreportsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(aptaxReportSetup);
    });
  });


  describe('#createAptaxReportSetup', () => {
    var id = 1;
    it('should return an Promise<AptaxReportSetup>', () => {
      const aptaxReportSetup: AptaxReportSetup = {includeOffsets:'sample data', includeNochecks:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', sortOptions:'sample data', comments:'sample data', dollarLimit:1234, taxYear:'2018-01-01', taxRepEntity:'sample data', status:'sample data', action:'sample data', reportType:'sample data', requestType:'sample data', requestDatetime:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqAptaxId:1234};
      service.createAptaxReportSetup(aptaxReportSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aptaxreportsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAptaxReportSetup', () => {
    var id = 1;
    it('should return an Promise<AptaxReportSetup>', () => {
      const aptaxReportSetup: AptaxReportSetup = {includeOffsets:'sample data', includeNochecks:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', sortOptions:'sample data', comments:'sample data', dollarLimit:1234, taxYear:'2018-01-01', taxRepEntity:'sample data', status:'sample data', action:'sample data', reportType:'sample data', requestType:'sample data', requestDatetime:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqAptaxId:1234};
      service.updateAptaxReportSetup(aptaxReportSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aptaxreportsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAptaxReportSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAptaxReportSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aptaxreportsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});