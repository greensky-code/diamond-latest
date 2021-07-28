/* Copyright (c) 2021 . All Rights Reserved. */

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

import { AcctPayUpdateSetupService } from './acct-pay-update-setup.service';
import { AcctPayUpdateSetup } from '../api-models/acct-pay-update-setup.model'
import { AcctPayUpdateSetups } from "../api-models/testing/fake-acct-pay-update-setup.model"

describe('AcctPayUpdateSetupService', () => {
  let injector: TestBed;
  let service: AcctPayUpdateSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AcctPayUpdateSetupService]
    });
    injector = getTestBed();
    service = injector.get(AcctPayUpdateSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAcctPayUpdateSetups', () => {
    it('should return an Promise<AcctPayUpdateSetup[]>', () => {
      const acctPayUpdateSetup = [
       {seqApupdId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', printChoice:'sample data', postMonth:'2018-01-01', payableType:'sample data', companyCode:'sample data', seqVendId:1234, upToAmt:1234, fromReceivedDate:'2018-01-01', thruReceivedDate:'2018-01-01', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data', actionType:'sample data', apupdFlg:'sample data', includeFinal:'sample data', adminFeeInd:'sample data'},
       {seqApupdId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', printChoice:'sample data', postMonth:'2018-01-01', payableType:'sample data', companyCode:'sample data', seqVendId:1234, upToAmt:1234, fromReceivedDate:'2018-01-01', thruReceivedDate:'2018-01-01', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data', actionType:'sample data', apupdFlg:'sample data', includeFinal:'sample data', adminFeeInd:'sample data'},
       {seqApupdId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', printChoice:'sample data', postMonth:'2018-01-01', payableType:'sample data', companyCode:'sample data', seqVendId:1234, upToAmt:1234, fromReceivedDate:'2018-01-01', thruReceivedDate:'2018-01-01', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data', actionType:'sample data', apupdFlg:'sample data', includeFinal:'sample data', adminFeeInd:'sample data'}

      ];
      service.getAcctPayUpdateSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/acctpayupdatesetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(acctPayUpdateSetup);
    });
  });


  describe('#createAcctPayUpdateSetup', () => {
    var id = 1;
    it('should return an Promise<AcctPayUpdateSetup>', () => {
      const acctPayUpdateSetup: AcctPayUpdateSetup = {seqApupdId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', printChoice:'sample data', postMonth:'2018-01-01', payableType:'sample data', companyCode:'sample data', seqVendId:1234, upToAmt:1234, fromReceivedDate:'2018-01-01', thruReceivedDate:'2018-01-01', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data', actionType:'sample data', apupdFlg:'sample data', includeFinal:'sample data', adminFeeInd:'sample data'};
      service.createAcctPayUpdateSetup(acctPayUpdateSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/acctpayupdatesetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAcctPayUpdateSetup', () => {
    var id = 1;
    it('should return an Promise<AcctPayUpdateSetup>', () => {
      const acctPayUpdateSetup: AcctPayUpdateSetup = {seqApupdId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', printChoice:'sample data', postMonth:'2018-01-01', payableType:'sample data', companyCode:'sample data', seqVendId:1234, upToAmt:1234, fromReceivedDate:'2018-01-01', thruReceivedDate:'2018-01-01', fromEnteredDate:'2018-01-01', thruEnteredDate:'2018-01-01', fromDueDate:'2018-01-01', thruDueDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data', actionType:'sample data', apupdFlg:'sample data', includeFinal:'sample data', adminFeeInd:'sample data'};
      service.updateAcctPayUpdateSetup(acctPayUpdateSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/acctpayupdatesetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAcctPayUpdateSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAcctPayUpdateSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/acctpayupdatesetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});