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

import { CapIncentiveQualityWorkService } from './cap-incentive-quality-work.service';
import { CapIncentiveQualityWork } from '../api-models/cap-incentive-quality-work.model'
import { CapIncentiveQualityWorks } from "../api-models/testing/fake-cap-incentive-quality-work.model"

describe('CapIncentiveQualityWorkService', () => {
  let injector: TestBed;
  let service: CapIncentiveQualityWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapIncentiveQualityWorkService]
    });
    injector = getTestBed();
    service = injector.get(CapIncentiveQualityWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapIncentiveQualityWorks', () => {
    it('should return an Promise<CapIncentiveQualityWork[]>', () => {
      const capIncentiveQualityWork = [
       {seqCcalcId:1234, seqCapIncentQltyWork:1234, seqCapPoolcalcWork:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data'},
       {seqCcalcId:1234, seqCapIncentQltyWork:1234, seqCapPoolcalcWork:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data'},
       {seqCcalcId:1234, seqCapIncentQltyWork:1234, seqCapPoolcalcWork:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data'}

      ];
      service.getCapIncentiveQualityWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capincentivequalityworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capIncentiveQualityWork);
    });
  });


  describe('#createCapIncentiveQualityWork', () => {
    var id = 1;
    it('should return an Promise<CapIncentiveQualityWork>', () => {
      const capIncentiveQualityWork: CapIncentiveQualityWork = {seqCcalcId:1234, seqCapIncentQltyWork:1234, seqCapPoolcalcWork:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data'};
      service.createCapIncentiveQualityWork(capIncentiveQualityWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capincentivequalityworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapIncentiveQualityWork', () => {
    var id = 1;
    it('should return an Promise<CapIncentiveQualityWork>', () => {
      const capIncentiveQualityWork: CapIncentiveQualityWork = {seqCcalcId:1234, seqCapIncentQltyWork:1234, seqCapPoolcalcWork:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data'};
      service.updateCapIncentiveQualityWork(capIncentiveQualityWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capincentivequalityworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapIncentiveQualityWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapIncentiveQualityWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capincentivequalityworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});