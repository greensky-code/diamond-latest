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

import { PremiumMatrixHeaderService } from './premium-matrix-header.service';
import { PremiumMatrixHeader } from '../api-models/premium-matrix-header.model'
import { PremiumMatrixHeaders } from "../api-models/testing/fake-premium-matrix-header.model"

describe('PremiumMatrixHeaderService', () => {
  let injector: TestBed;
  let service: PremiumMatrixHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremiumMatrixHeaderService]
    });
    injector = getTestBed();
    service = injector.get(PremiumMatrixHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremiumMatrixHeaders', () => {
    it('should return an Promise<PremiumMatrixHeader[]>', () => {
      const premiumMatrixHeader = [
       {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPremiumMatrixHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/premiummatrixheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premiumMatrixHeader);
    });
  });


  describe('#createPremiumMatrixHeader', () => {
    var id = 1;
    it('should return an Promise<PremiumMatrixHeader>', () => {
      const premiumMatrixHeader: PremiumMatrixHeader = {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPremiumMatrixHeader(premiumMatrixHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummatrixheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremiumMatrixHeader', () => {
    var id = 1;
    it('should return an Promise<PremiumMatrixHeader>', () => {
      const premiumMatrixHeader: PremiumMatrixHeader = {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePremiumMatrixHeader(premiumMatrixHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummatrixheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremiumMatrixHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremiumMatrixHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummatrixheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});