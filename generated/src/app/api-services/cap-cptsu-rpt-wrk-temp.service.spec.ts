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

import { CapCptsuRptWrkTempService } from './cap-cptsu-rpt-wrk-temp.service';
import { CapCptsuRptWrkTemp } from '../api-models/cap-cptsu-rpt-wrk-temp.model'
import { CapCptsuRptWrkTemps } from "../api-models/testing/fake-cap-cptsu-rpt-wrk-temp.model"

describe('CapCptsuRptWrkTempService', () => {
  let injector: TestBed;
  let service: CapCptsuRptWrkTempService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapCptsuRptWrkTempService]
    });
    injector = getTestBed();
    service = injector.get(CapCptsuRptWrkTempService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapCptsuRptWrkTemps', () => {
    it('should return an Promise<CapCptsuRptWrkTemp[]>', () => {
      const capCptsuRptWrkTemp = [
       {seqCapCptsuRptWrkTemp:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', applyTo:'sample data', capStoplossId:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'},
       {seqCapCptsuRptWrkTemp:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', applyTo:'sample data', capStoplossId:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'},
       {seqCapCptsuRptWrkTemp:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', applyTo:'sample data', capStoplossId:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'}

      ];
      service.getCapCptsuRptWrkTemps().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capcptsurptwrktemps/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capCptsuRptWrkTemp);
    });
  });


  describe('#createCapCptsuRptWrkTemp', () => {
    var id = 1;
    it('should return an Promise<CapCptsuRptWrkTemp>', () => {
      const capCptsuRptWrkTemp: CapCptsuRptWrkTemp = {seqCapCptsuRptWrkTemp:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', applyTo:'sample data', capStoplossId:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'};
      service.createCapCptsuRptWrkTemp(capCptsuRptWrkTemp).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcptsurptwrktemps`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapCptsuRptWrkTemp', () => {
    var id = 1;
    it('should return an Promise<CapCptsuRptWrkTemp>', () => {
      const capCptsuRptWrkTemp: CapCptsuRptWrkTemp = {seqCapCptsuRptWrkTemp:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', applyTo:'sample data', capStoplossId:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'};
      service.updateCapCptsuRptWrkTemp(capCptsuRptWrkTemp, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcptsurptwrktemps/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapCptsuRptWrkTemp', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapCptsuRptWrkTemp(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcptsurptwrktemps/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});