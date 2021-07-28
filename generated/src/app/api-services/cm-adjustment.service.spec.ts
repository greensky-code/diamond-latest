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

import { CmAdjustmentService } from './cm-adjustment.service';
import { CmAdjustment } from '../api-models/cm-adjustment.model'
import { CmAdjustments } from "../api-models/testing/fake-cm-adjustment.model"

describe('CmAdjustmentService', () => {
  let injector: TestBed;
  let service: CmAdjustmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CmAdjustmentService]
    });
    injector = getTestBed();
    service = injector.get(CmAdjustmentService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCmAdjustments', () => {
    it('should return an Promise<CmAdjustment[]>', () => {
      const cmAdjustment = [
       {seqCmadjId:1234, seqAgentId:1234, agentId:'sample data', customerType:'sample data', customerId:'sample data', transactionDate:'2018-01-01', transactionReason:'sample data', transactionAmt:1234, billingMonth:'2018-01-01', adjustmentStatus:'sample data', invoiceNumber:1234, postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transactionDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCmadjId:1234, seqAgentId:1234, agentId:'sample data', customerType:'sample data', customerId:'sample data', transactionDate:'2018-01-01', transactionReason:'sample data', transactionAmt:1234, billingMonth:'2018-01-01', adjustmentStatus:'sample data', invoiceNumber:1234, postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transactionDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCmadjId:1234, seqAgentId:1234, agentId:'sample data', customerType:'sample data', customerId:'sample data', transactionDate:'2018-01-01', transactionReason:'sample data', transactionAmt:1234, billingMonth:'2018-01-01', adjustmentStatus:'sample data', invoiceNumber:1234, postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transactionDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCmAdjustments().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cmadjustments/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cmAdjustment);
    });
  });


  describe('#createCmAdjustment', () => {
    var id = 1;
    it('should return an Promise<CmAdjustment>', () => {
      const cmAdjustment: CmAdjustment = {seqCmadjId:1234, seqAgentId:1234, agentId:'sample data', customerType:'sample data', customerId:'sample data', transactionDate:'2018-01-01', transactionReason:'sample data', transactionAmt:1234, billingMonth:'2018-01-01', adjustmentStatus:'sample data', invoiceNumber:1234, postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transactionDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCmAdjustment(cmAdjustment).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cmadjustments`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCmAdjustment', () => {
    var id = 1;
    it('should return an Promise<CmAdjustment>', () => {
      const cmAdjustment: CmAdjustment = {seqCmadjId:1234, seqAgentId:1234, agentId:'sample data', customerType:'sample data', customerId:'sample data', transactionDate:'2018-01-01', transactionReason:'sample data', transactionAmt:1234, billingMonth:'2018-01-01', adjustmentStatus:'sample data', invoiceNumber:1234, postDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transactionDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCmAdjustment(cmAdjustment, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cmadjustments/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCmAdjustment', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCmAdjustment(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cmadjustments/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});