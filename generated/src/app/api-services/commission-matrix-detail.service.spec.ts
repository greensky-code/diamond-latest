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

import { CommissionMatrixDetailService } from './commission-matrix-detail.service';
import { CommissionMatrixDetail } from '../api-models/commission-matrix-detail.model'
import { CommissionMatrixDetails } from "../api-models/testing/fake-commission-matrix-detail.model"

describe('CommissionMatrixDetailService', () => {
  let injector: TestBed;
  let service: CommissionMatrixDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommissionMatrixDetailService]
    });
    injector = getTestBed();
    service = injector.get(CommissionMatrixDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCommissionMatrixDetails', () => {
    it('should return an Promise<CommissionMatrixDetail[]>', () => {
      const commissionMatrixDetail = [
       {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCommissionMatrixDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/commissionmatrixdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(commissionMatrixDetail);
    });
  });


  describe('#createCommissionMatrixDetail', () => {
    var id = 1;
    it('should return an Promise<CommissionMatrixDetail>', () => {
      const commissionMatrixDetail: CommissionMatrixDetail = {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCommissionMatrixDetail(commissionMatrixDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissionmatrixdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCommissionMatrixDetail', () => {
    var id = 1;
    it('should return an Promise<CommissionMatrixDetail>', () => {
      const commissionMatrixDetail: CommissionMatrixDetail = {matrixDef:'sample data', matrixXSeq:1234, matrixYSeq:1234, matrixRate:1234, matrixPct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCommissionMatrixDetail(commissionMatrixDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissionmatrixdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCommissionMatrixDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCommissionMatrixDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissionmatrixdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});