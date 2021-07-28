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

import { CapCalcSetupService } from './cap-calc-setup.service';
import { CapCalcSetup } from '../api-models/cap-calc-setup.model'
import { CapCalcSetups } from "../api-models/testing/fake-cap-calc-setup.model"

describe('CapCalcSetupService', () => {
  let injector: TestBed;
  let service: CapCalcSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapCalcSetupService]
    });
    injector = getTestBed();
    service = injector.get(CapCalcSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapCalcSetups', () => {
    it('should return an Promise<CapCalcSetup[]>', () => {
      const capCalcSetup = [
       {seqCcalcId:1234, jobId:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', action:'sample data', status:'sample data', capModelId:'sample data', capMonth:'2018-01-01', glPostMonth:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'},
       {seqCcalcId:1234, jobId:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', action:'sample data', status:'sample data', capModelId:'sample data', capMonth:'2018-01-01', glPostMonth:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'},
       {seqCcalcId:1234, jobId:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', action:'sample data', status:'sample data', capModelId:'sample data', capMonth:'2018-01-01', glPostMonth:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'}

      ];
      service.getCapCalcSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capcalcsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capCalcSetup);
    });
  });


  describe('#createCapCalcSetup', () => {
    var id = 1;
    it('should return an Promise<CapCalcSetup>', () => {
      const capCalcSetup: CapCalcSetup = {seqCcalcId:1234, jobId:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', action:'sample data', status:'sample data', capModelId:'sample data', capMonth:'2018-01-01', glPostMonth:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'};
      service.createCapCalcSetup(capCalcSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcalcsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapCalcSetup', () => {
    var id = 1;
    it('should return an Promise<CapCalcSetup>', () => {
      const capCalcSetup: CapCalcSetup = {seqCcalcId:1234, jobId:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', action:'sample data', status:'sample data', capModelId:'sample data', capMonth:'2018-01-01', glPostMonth:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'};
      service.updateCapCalcSetup(capCalcSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcalcsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapCalcSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapCalcSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcalcsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});