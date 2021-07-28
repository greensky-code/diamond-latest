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

import { ProvContractQualityPgmService } from './prov-contract-quality-pgm.service';
import { ProvContractQualityPgm } from '../api-models/prov-contract-quality-pgm.model'
import { ProvContractQualityPgms } from "../api-models/testing/fake-prov-contract-quality-pgm.model"

describe('ProvContractQualityPgmService', () => {
  let injector: TestBed;
  let service: ProvContractQualityPgmService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvContractQualityPgmService]
    });
    injector = getTestBed();
    service = injector.get(ProvContractQualityPgmService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvContractQualityPgms', () => {
    it('should return an Promise<ProvContractQualityPgm[]>', () => {
      const provContractQualityPgm = [
       {seqProvContract:1234, qualityProgram:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvContract:1234, qualityProgram:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvContract:1234, qualityProgram:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProvContractQualityPgms().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractqualitypgms/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provContractQualityPgm);
    });
  });


  describe('#createProvContractQualityPgm', () => {
    var id = 1;
    it('should return an Promise<ProvContractQualityPgm>', () => {
      const provContractQualityPgm: ProvContractQualityPgm = {seqProvContract:1234, qualityProgram:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProvContractQualityPgm(provContractQualityPgm).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractqualitypgms`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvContractQualityPgm', () => {
    var id = 1;
    it('should return an Promise<ProvContractQualityPgm>', () => {
      const provContractQualityPgm: ProvContractQualityPgm = {seqProvContract:1234, qualityProgram:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProvContractQualityPgm(provContractQualityPgm, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractqualitypgms/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvContractQualityPgm', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvContractQualityPgm(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractqualitypgms/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});