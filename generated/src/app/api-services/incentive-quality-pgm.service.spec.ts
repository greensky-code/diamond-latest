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

import { IncentiveQualityPgmService } from './incentive-quality-pgm.service';
import { IncentiveQualityPgm } from '../api-models/incentive-quality-pgm.model'
import { IncentiveQualityPgms } from "../api-models/testing/fake-incentive-quality-pgm.model"

describe('IncentiveQualityPgmService', () => {
  let injector: TestBed;
  let service: IncentiveQualityPgmService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IncentiveQualityPgmService]
    });
    injector = getTestBed();
    service = injector.get(IncentiveQualityPgmService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIncentiveQualityPgms', () => {
    it('should return an Promise<IncentiveQualityPgm[]>', () => {
      const incentiveQualityPgm = [
       {seqQualityPgm:1234, seqIncentiveRule:1234, qualityProgram:'sample data', qualityIncentiveAmount:1234, qualityCapApply:'sample data', qualityIncentivePercent:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqQualityPgm:1234, seqIncentiveRule:1234, qualityProgram:'sample data', qualityIncentiveAmount:1234, qualityCapApply:'sample data', qualityIncentivePercent:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqQualityPgm:1234, seqIncentiveRule:1234, qualityProgram:'sample data', qualityIncentiveAmount:1234, qualityCapApply:'sample data', qualityIncentivePercent:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getIncentiveQualityPgms().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/incentivequalitypgms/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(incentiveQualityPgm);
    });
  });


  describe('#createIncentiveQualityPgm', () => {
    var id = 1;
    it('should return an Promise<IncentiveQualityPgm>', () => {
      const incentiveQualityPgm: IncentiveQualityPgm = {seqQualityPgm:1234, seqIncentiveRule:1234, qualityProgram:'sample data', qualityIncentiveAmount:1234, qualityCapApply:'sample data', qualityIncentivePercent:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createIncentiveQualityPgm(incentiveQualityPgm).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/incentivequalitypgms`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIncentiveQualityPgm', () => {
    var id = 1;
    it('should return an Promise<IncentiveQualityPgm>', () => {
      const incentiveQualityPgm: IncentiveQualityPgm = {seqQualityPgm:1234, seqIncentiveRule:1234, qualityProgram:'sample data', qualityIncentiveAmount:1234, qualityCapApply:'sample data', qualityIncentivePercent:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateIncentiveQualityPgm(incentiveQualityPgm, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/incentivequalitypgms/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIncentiveQualityPgm', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIncentiveQualityPgm(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/incentivequalitypgms/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});