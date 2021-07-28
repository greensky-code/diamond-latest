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

import { CptdtQualityRptWrkService } from './cptdt-quality-rpt-wrk.service';
import { CptdtQualityRptWrk } from '../api-models/cptdt-quality-rpt-wrk.model'
import { CptdtQualityRptWrks } from "../api-models/testing/fake-cptdt-quality-rpt-wrk.model"

describe('CptdtQualityRptWrkService', () => {
  let injector: TestBed;
  let service: CptdtQualityRptWrkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CptdtQualityRptWrkService]
    });
    injector = getTestBed();
    service = injector.get(CptdtQualityRptWrkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCptdtQualityRptWrks', () => {
    it('should return an Promise<CptdtQualityRptWrk[]>', () => {
      const cptdtQualityRptWrk = [
       {seqCapCptdtQltyWrk:1234, seqCapCptdtRptWrk:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCapCptdtQltyWrk:1234, seqCapCptdtRptWrk:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCapCptdtQltyWrk:1234, seqCapCptdtRptWrk:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCptdtQualityRptWrks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cptdtqualityrptwrks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cptdtQualityRptWrk);
    });
  });


  describe('#createCptdtQualityRptWrk', () => {
    var id = 1;
    it('should return an Promise<CptdtQualityRptWrk>', () => {
      const cptdtQualityRptWrk: CptdtQualityRptWrk = {seqCapCptdtQltyWrk:1234, seqCapCptdtRptWrk:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCptdtQualityRptWrk(cptdtQualityRptWrk).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cptdtqualityrptwrks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCptdtQualityRptWrk', () => {
    var id = 1;
    it('should return an Promise<CptdtQualityRptWrk>', () => {
      const cptdtQualityRptWrk: CptdtQualityRptWrk = {seqCapCptdtQltyWrk:1234, seqCapCptdtRptWrk:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCptdtQualityRptWrk(cptdtQualityRptWrk, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cptdtqualityrptwrks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCptdtQualityRptWrk', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCptdtQualityRptWrk(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cptdtqualityrptwrks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});