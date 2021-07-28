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

import { CapCptdtRptWrkService } from './cap-cptdt-rpt-wrk.service';
import { CapCptdtRptWrk } from '../api-models/cap-cptdt-rpt-wrk.model'
import { CapCptdtRptWrks } from "../api-models/testing/fake-cap-cptdt-rpt-wrk.model"

describe('CapCptdtRptWrkService', () => {
  let injector: TestBed;
  let service: CapCptdtRptWrkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapCptdtRptWrkService]
    });
    injector = getTestBed();
    service = injector.get(CapCptdtRptWrkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapCptdtRptWrks', () => {
    it('should return an Promise<CapCptdtRptWrk[]>', () => {
      const capCptdtRptWrk = [
       {seqCapCptdtRptWrk:1234, seqJobId:1234, capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', capPoolId:'sample data', seqCapPoolId:1234, provLastName:'sample data', provFirstName:'sample data', vendFullName:'sample data', applyTo:'sample data', capStoplossId:'sample data', capMonth:'2018-01-01', capMonthRun:'2018-01-01', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'},
       {seqCapCptdtRptWrk:1234, seqJobId:1234, capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', capPoolId:'sample data', seqCapPoolId:1234, provLastName:'sample data', provFirstName:'sample data', vendFullName:'sample data', applyTo:'sample data', capStoplossId:'sample data', capMonth:'2018-01-01', capMonthRun:'2018-01-01', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'},
       {seqCapCptdtRptWrk:1234, seqJobId:1234, capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', capPoolId:'sample data', seqCapPoolId:1234, provLastName:'sample data', provFirstName:'sample data', vendFullName:'sample data', applyTo:'sample data', capStoplossId:'sample data', capMonth:'2018-01-01', capMonthRun:'2018-01-01', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'}

      ];
      service.getCapCptdtRptWrks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capcptdtrptwrks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capCptdtRptWrk);
    });
  });


  describe('#createCapCptdtRptWrk', () => {
    var id = 1;
    it('should return an Promise<CapCptdtRptWrk>', () => {
      const capCptdtRptWrk: CapCptdtRptWrk = {seqCapCptdtRptWrk:1234, seqJobId:1234, capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', capPoolId:'sample data', seqCapPoolId:1234, provLastName:'sample data', provFirstName:'sample data', vendFullName:'sample data', applyTo:'sample data', capStoplossId:'sample data', capMonth:'2018-01-01', capMonthRun:'2018-01-01', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'};
      service.createCapCptdtRptWrk(capCptdtRptWrk).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcptdtrptwrks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapCptdtRptWrk', () => {
    var id = 1;
    it('should return an Promise<CapCptdtRptWrk>', () => {
      const capCptdtRptWrk: CapCptdtRptWrk = {seqCapCptdtRptWrk:1234, seqJobId:1234, capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', capPoolId:'sample data', seqCapPoolId:1234, provLastName:'sample data', provFirstName:'sample data', vendFullName:'sample data', applyTo:'sample data', capStoplossId:'sample data', capMonth:'2018-01-01', capMonthRun:'2018-01-01', capTransAmt:1234, pmpmWitholdAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'};
      service.updateCapCptdtRptWrk(capCptdtRptWrk, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcptdtrptwrks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapCptdtRptWrk', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapCptdtRptWrk(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcptdtrptwrks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});