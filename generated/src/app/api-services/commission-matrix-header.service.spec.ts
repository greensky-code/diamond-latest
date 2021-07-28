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

import { CommissionMatrixHeaderService } from './commission-matrix-header.service';
import { CommissionMatrixHeader } from '../api-models/commission-matrix-header.model'
import { CommissionMatrixHeaders } from "../api-models/testing/fake-commission-matrix-header.model"

describe('CommissionMatrixHeaderService', () => {
  let injector: TestBed;
  let service: CommissionMatrixHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommissionMatrixHeaderService]
    });
    injector = getTestBed();
    service = injector.get(CommissionMatrixHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCommissionMatrixHeaders', () => {
    it('should return an Promise<CommissionMatrixHeader[]>', () => {
      const commissionMatrixHeader = [
       {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCommissionMatrixHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/commissionmatrixheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(commissionMatrixHeader);
    });
  });


  describe('#createCommissionMatrixHeader', () => {
    var id = 1;
    it('should return an Promise<CommissionMatrixHeader>', () => {
      const commissionMatrixHeader: CommissionMatrixHeader = {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCommissionMatrixHeader(commissionMatrixHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissionmatrixheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCommissionMatrixHeader', () => {
    var id = 1;
    it('should return an Promise<CommissionMatrixHeader>', () => {
      const commissionMatrixHeader: CommissionMatrixHeader = {matrixDef:'sample data', matrixDescription:'sample data', matrixCalcMethod:'sample data', matrixDeterminant:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCommissionMatrixHeader(commissionMatrixHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissionmatrixheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCommissionMatrixHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCommissionMatrixHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissionmatrixheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});