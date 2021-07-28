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

import { PremiumMatrixDetailService } from './premium-matrix-detail.service';
import { PremiumMatrixDetail } from '../api-models/premium-matrix-detail.model'
import { PremiumMatrixDetails } from "../api-models/testing/fake-premium-matrix-detail.model"

describe('PremiumMatrixDetailService', () => {
  let injector: TestBed;
  let service: PremiumMatrixDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremiumMatrixDetailService]
    });
    injector = getTestBed();
    service = injector.get(PremiumMatrixDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremiumMatrixDetails', () => {
    it('should return an Promise<PremiumMatrixDetail[]>', () => {
      const premiumMatrixDetail = [
       {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPremiumMatrixDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/premiummatrixdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premiumMatrixDetail);
    });
  });


  describe('#createPremiumMatrixDetail', () => {
    var id = 1;
    it('should return an Promise<PremiumMatrixDetail>', () => {
      const premiumMatrixDetail: PremiumMatrixDetail = {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPremiumMatrixDetail(premiumMatrixDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummatrixdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremiumMatrixDetail', () => {
    var id = 1;
    it('should return an Promise<PremiumMatrixDetail>', () => {
      const premiumMatrixDetail: PremiumMatrixDetail = {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePremiumMatrixDetail(premiumMatrixDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummatrixdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremiumMatrixDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremiumMatrixDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummatrixdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});