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

import { BatchTransactionTypeService } from './batch-transaction-type.service';
import { BatchTransactionType } from '../api-models/batch-transaction-type.model'
import { BatchTransactionTypes } from "../api-models/testing/fake-batch-transaction-type.model"

describe('BatchTransactionTypeService', () => {
  let injector: TestBed;
  let service: BatchTransactionTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BatchTransactionTypeService]
    });
    injector = getTestBed();
    service = injector.get(BatchTransactionTypeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBatchTransactionTypes', () => {
    it('should return an Promise<BatchTransactionType[]>', () => {
      const batchTransactionType = [
       {transactionType:'sample data', description:'sample data'},
       {transactionType:'sample data', description:'sample data'},
       {transactionType:'sample data', description:'sample data'}

      ];
      service.getBatchTransactionTypes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/batchtransactiontypes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(batchTransactionType);
    });
  });


  describe('#createBatchTransactionType', () => {
    var id = 1;
    it('should return an Promise<BatchTransactionType>', () => {
      const batchTransactionType: BatchTransactionType = {transactionType:'sample data', description:'sample data'};
      service.createBatchTransactionType(batchTransactionType).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchtransactiontypes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBatchTransactionType', () => {
    var id = 1;
    it('should return an Promise<BatchTransactionType>', () => {
      const batchTransactionType: BatchTransactionType = {transactionType:'sample data', description:'sample data'};
      service.updateBatchTransactionType(batchTransactionType, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchtransactiontypes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBatchTransactionType', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBatchTransactionType(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchtransactiontypes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});