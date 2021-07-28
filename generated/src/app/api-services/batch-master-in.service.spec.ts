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

import { BatchMasterInService } from './batch-master-in.service';
import { BatchMasterIn } from '../api-models/batch-master-in.model'
import { BatchMasterIns } from "../api-models/testing/fake-batch-master-in.model"

describe('BatchMasterInService', () => {
  let injector: TestBed;
  let service: BatchMasterInService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BatchMasterInService]
    });
    injector = getTestBed();
    service = injector.get(BatchMasterInService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBatchMasterIns', () => {
    it('should return an Promise<BatchMasterIn[]>', () => {
      const batchMasterIn = [
       {batchId:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', positiveFile:'sample data', fileEffectiveDate:'2018-01-01', totalTransactions:1234, posted:1234, deleted:1234, detailsAdded:1234, lensAdded:1234, ndcAdded:1234, otherCarriersAdded:1234, totalBilledAmt:1234, membersAdded:1234, membersChanged:1234, membersReinstated:1234, membersTerminated:1234, validateDatetime:'2018-01-01', validateUser:'sample data', postDatetime:'2018-01-01', postUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {batchId:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', positiveFile:'sample data', fileEffectiveDate:'2018-01-01', totalTransactions:1234, posted:1234, deleted:1234, detailsAdded:1234, lensAdded:1234, ndcAdded:1234, otherCarriersAdded:1234, totalBilledAmt:1234, membersAdded:1234, membersChanged:1234, membersReinstated:1234, membersTerminated:1234, validateDatetime:'2018-01-01', validateUser:'sample data', postDatetime:'2018-01-01', postUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {batchId:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', positiveFile:'sample data', fileEffectiveDate:'2018-01-01', totalTransactions:1234, posted:1234, deleted:1234, detailsAdded:1234, lensAdded:1234, ndcAdded:1234, otherCarriersAdded:1234, totalBilledAmt:1234, membersAdded:1234, membersChanged:1234, membersReinstated:1234, membersTerminated:1234, validateDatetime:'2018-01-01', validateUser:'sample data', postDatetime:'2018-01-01', postUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getBatchMasterIns().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasterins/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(batchMasterIn);
    });
  });


  describe('#createBatchMasterIn', () => {
    var id = 1;
    it('should return an Promise<BatchMasterIn>', () => {
      const batchMasterIn: BatchMasterIn = {batchId:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', positiveFile:'sample data', fileEffectiveDate:'2018-01-01', totalTransactions:1234, posted:1234, deleted:1234, detailsAdded:1234, lensAdded:1234, ndcAdded:1234, otherCarriersAdded:1234, totalBilledAmt:1234, membersAdded:1234, membersChanged:1234, membersReinstated:1234, membersTerminated:1234, validateDatetime:'2018-01-01', validateUser:'sample data', postDatetime:'2018-01-01', postUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createBatchMasterIn(batchMasterIn).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasterins`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBatchMasterIn', () => {
    var id = 1;
    it('should return an Promise<BatchMasterIn>', () => {
      const batchMasterIn: BatchMasterIn = {batchId:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', positiveFile:'sample data', fileEffectiveDate:'2018-01-01', totalTransactions:1234, posted:1234, deleted:1234, detailsAdded:1234, lensAdded:1234, ndcAdded:1234, otherCarriersAdded:1234, totalBilledAmt:1234, membersAdded:1234, membersChanged:1234, membersReinstated:1234, membersTerminated:1234, validateDatetime:'2018-01-01', validateUser:'sample data', postDatetime:'2018-01-01', postUser:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateBatchMasterIn(batchMasterIn, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasterins/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBatchMasterIn', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBatchMasterIn(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasterins/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});