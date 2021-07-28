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

import { CommissionDetailService } from './commission-detail.service';
import { CommissionDetail } from '../api-models/commission-detail.model'
import { CommissionDetails } from "../api-models/testing/fake-commission-detail.model"

describe('CommissionDetailService', () => {
  let injector: TestBed;
  let service: CommissionDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommissionDetailService]
    });
    injector = getTestBed();
    service = injector.get(CommissionDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCommissionDetails', () => {
    it('should return an Promise<CommissionDetail[]>', () => {
      const commissionDetail = [
       {seqCommissionId:1234, seqGpbilId:1234, seqGroupId:1234, seqApTrans:1234, billingMonth:'2018-01-01', recordType:'sample data', planOrRiderCode:'sample data', premiumAmt:1234, adminFeeAmt:1234, agentSalesType:'sample data', seqAgentId:1234, commissionStep:'sample data', commissionAmount:1234, backupWitholding:1234, seqVendId:1234, seqVendAddress:1234, processingStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCommissionId:1234, seqGpbilId:1234, seqGroupId:1234, seqApTrans:1234, billingMonth:'2018-01-01', recordType:'sample data', planOrRiderCode:'sample data', premiumAmt:1234, adminFeeAmt:1234, agentSalesType:'sample data', seqAgentId:1234, commissionStep:'sample data', commissionAmount:1234, backupWitholding:1234, seqVendId:1234, seqVendAddress:1234, processingStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCommissionId:1234, seqGpbilId:1234, seqGroupId:1234, seqApTrans:1234, billingMonth:'2018-01-01', recordType:'sample data', planOrRiderCode:'sample data', premiumAmt:1234, adminFeeAmt:1234, agentSalesType:'sample data', seqAgentId:1234, commissionStep:'sample data', commissionAmount:1234, backupWitholding:1234, seqVendId:1234, seqVendAddress:1234, processingStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCommissionDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(commissionDetail);
    });
  });


  describe('#createCommissionDetail', () => {
    var id = 1;
    it('should return an Promise<CommissionDetail>', () => {
      const commissionDetail: CommissionDetail = {seqCommissionId:1234, seqGpbilId:1234, seqGroupId:1234, seqApTrans:1234, billingMonth:'2018-01-01', recordType:'sample data', planOrRiderCode:'sample data', premiumAmt:1234, adminFeeAmt:1234, agentSalesType:'sample data', seqAgentId:1234, commissionStep:'sample data', commissionAmount:1234, backupWitholding:1234, seqVendId:1234, seqVendAddress:1234, processingStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCommissionDetail(commissionDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCommissionDetail', () => {
    var id = 1;
    it('should return an Promise<CommissionDetail>', () => {
      const commissionDetail: CommissionDetail = {seqCommissionId:1234, seqGpbilId:1234, seqGroupId:1234, seqApTrans:1234, billingMonth:'2018-01-01', recordType:'sample data', planOrRiderCode:'sample data', premiumAmt:1234, adminFeeAmt:1234, agentSalesType:'sample data', seqAgentId:1234, commissionStep:'sample data', commissionAmount:1234, backupWitholding:1234, seqVendId:1234, seqVendAddress:1234, processingStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCommissionDetail(commissionDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCommissionDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCommissionDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});