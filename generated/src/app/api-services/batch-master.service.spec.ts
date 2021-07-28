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

import { BatchMasterService } from './batch-master.service';
import { BatchMaster } from '../api-models/batch-master.model'
import { BatchMasters } from "../api-models/testing/fake-batch-master.model"

describe('BatchMasterService', () => {
  let injector: TestBed;
  let service: BatchMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BatchMasterService]
    });
    injector = getTestBed();
    service = injector.get(BatchMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBatchMasters', () => {
    it('should return an Promise<BatchMaster[]>', () => {
      const batchMaster = [
       {batchId:'sample data', transactionType:'sample data', tradingPartnerId:'sample data', x12ControlNumber:'sample data', status:'sample data', comments:'sample data', receivedDatetime:'2018-01-01', receivedUser:'sample data', finalizeDatetime:'2018-01-01', finalizeUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {batchId:'sample data', transactionType:'sample data', tradingPartnerId:'sample data', x12ControlNumber:'sample data', status:'sample data', comments:'sample data', receivedDatetime:'2018-01-01', receivedUser:'sample data', finalizeDatetime:'2018-01-01', finalizeUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {batchId:'sample data', transactionType:'sample data', tradingPartnerId:'sample data', x12ControlNumber:'sample data', status:'sample data', comments:'sample data', receivedDatetime:'2018-01-01', receivedUser:'sample data', finalizeDatetime:'2018-01-01', finalizeUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getBatchMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(batchMaster);
    });
  });


  describe('#createBatchMaster', () => {
    var id = 1;
    it('should return an Promise<BatchMaster>', () => {
      const batchMaster: BatchMaster = {batchId:'sample data', transactionType:'sample data', tradingPartnerId:'sample data', x12ControlNumber:'sample data', status:'sample data', comments:'sample data', receivedDatetime:'2018-01-01', receivedUser:'sample data', finalizeDatetime:'2018-01-01', finalizeUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createBatchMaster(batchMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBatchMaster', () => {
    var id = 1;
    it('should return an Promise<BatchMaster>', () => {
      const batchMaster: BatchMaster = {batchId:'sample data', transactionType:'sample data', tradingPartnerId:'sample data', x12ControlNumber:'sample data', status:'sample data', comments:'sample data', receivedDatetime:'2018-01-01', receivedUser:'sample data', finalizeDatetime:'2018-01-01', finalizeUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateBatchMaster(batchMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBatchMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBatchMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});