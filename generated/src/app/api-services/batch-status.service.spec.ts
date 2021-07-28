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

import { BatchStatusService } from './batch-status.service';
import { BatchStatus } from '../api-models/batch-status.model'
import { BatchStatus } from "../api-models/testing/fake-batch-status.model"

describe('BatchStatusService', () => {
  let injector: TestBed;
  let service: BatchStatusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BatchStatusService]
    });
    injector = getTestBed();
    service = injector.get(BatchStatusService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBatchStatus', () => {
    it('should return an Promise<BatchStatus[]>', () => {
      const batchStatus = [
       {status:'sample data', description:'sample data'},
       {status:'sample data', description:'sample data'},
       {status:'sample data', description:'sample data'}

      ];
      service.getBatchStatus().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/batchstatus/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(batchStatus);
    });
  });


  describe('#createBatchStatus', () => {
    var id = 1;
    it('should return an Promise<BatchStatus>', () => {
      const batchStatus: BatchStatus = {status:'sample data', description:'sample data'};
      service.createBatchStatus(batchStatus).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchstatus`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBatchStatus', () => {
    var id = 1;
    it('should return an Promise<BatchStatus>', () => {
      const batchStatus: BatchStatus = {status:'sample data', description:'sample data'};
      service.updateBatchStatus(batchStatus, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchstatus/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBatchStatus', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBatchStatus(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchstatus/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});