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

import { CapTransDtlQltyIncentService } from './cap-trans-dtl-qlty-incent.service';
import { CapTransDtlQltyIncent } from '../api-models/cap-trans-dtl-qlty-incent.model'
import { CapTransDtlQltyIncents } from "../api-models/testing/fake-cap-trans-dtl-qlty-incent.model"

describe('CapTransDtlQltyIncentService', () => {
  let injector: TestBed;
  let service: CapTransDtlQltyIncentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapTransDtlQltyIncentService]
    });
    injector = getTestBed();
    service = injector.get(CapTransDtlQltyIncentService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapTransDtlQltyIncents', () => {
    it('should return an Promise<CapTransDtlQltyIncent[]>', () => {
      const capTransDtlQltyIncent = [
       {seqCapTransDtlQltyIncent:1234, seqCapTransDtl:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCapTransDtlQltyIncent:1234, seqCapTransDtl:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCapTransDtlQltyIncent:1234, seqCapTransDtl:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCapTransDtlQltyIncents().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/captransdtlqltyincents/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capTransDtlQltyIncent);
    });
  });


  describe('#createCapTransDtlQltyIncent', () => {
    var id = 1;
    it('should return an Promise<CapTransDtlQltyIncent>', () => {
      const capTransDtlQltyIncent: CapTransDtlQltyIncent = {seqCapTransDtlQltyIncent:1234, seqCapTransDtl:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCapTransDtlQltyIncent(capTransDtlQltyIncent).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captransdtlqltyincents`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapTransDtlQltyIncent', () => {
    var id = 1;
    it('should return an Promise<CapTransDtlQltyIncent>', () => {
      const capTransDtlQltyIncent: CapTransDtlQltyIncent = {seqCapTransDtlQltyIncent:1234, seqCapTransDtl:1234, seqIncentiveRule:1234, seqQualityPgm:1234, seqProvContract:1234, qualityIncentiveAmount:1234, qualityIncentivePercent:1234, qualityCapApply:'sample data', incentiveRetro:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCapTransDtlQltyIncent(capTransDtlQltyIncent, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captransdtlqltyincents/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapTransDtlQltyIncent', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapTransDtlQltyIncent(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captransdtlqltyincents/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});