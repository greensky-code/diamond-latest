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

import { ArCashPostWorkService } from './ar-cash-post-work.service';
import { ArCashPostWork } from '../api-models/ar-cash-post-work.model'
import { ArCashPostWorks } from "../api-models/testing/fake-ar-cash-post-work.model"

describe('ArCashPostWorkService', () => {
  let injector: TestBed;
  let service: ArCashPostWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArCashPostWorkService]
    });
    injector = getTestBed();
    service = injector.get(ArCashPostWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getArCashPostWorks', () => {
    it('should return an Promise<ArCashPostWork[]>', () => {
      const arCashPostWork = [
       {seqCashBatchId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234},
       {seqCashBatchId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234},
       {seqCashBatchId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234}

      ];
      service.getArCashPostWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/arcashpostworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(arCashPostWork);
    });
  });


  describe('#createArCashPostWork', () => {
    var id = 1;
    it('should return an Promise<ArCashPostWork>', () => {
      const arCashPostWork: ArCashPostWork = {seqCashBatchId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234};
      service.createArCashPostWork(arCashPostWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcashpostworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateArCashPostWork', () => {
    var id = 1;
    it('should return an Promise<ArCashPostWork>', () => {
      const arCashPostWork: ArCashPostWork = {seqCashBatchId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234};
      service.updateArCashPostWork(arCashPostWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcashpostworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteArCashPostWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteArCashPostWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcashpostworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});