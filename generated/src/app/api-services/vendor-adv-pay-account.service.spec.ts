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

import { VendorAdvPayAccountService } from './vendor-adv-pay-account.service';
import { VendorAdvPayAccount } from '../api-models/vendor-adv-pay-account.model'
import { VendorAdvPayAccounts } from "../api-models/testing/fake-vendor-adv-pay-account.model"

describe('VendorAdvPayAccountService', () => {
  let injector: TestBed;
  let service: VendorAdvPayAccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorAdvPayAccountService]
    });
    injector = getTestBed();
    service = injector.get(VendorAdvPayAccountService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getVendorAdvPayAccounts', () => {
    it('should return an Promise<VendorAdvPayAccount[]>', () => {
      const vendorAdvPayAccount = [
       {seqVendAdvPayAcc:1234, seqVendId:1234, seqVendAddress:1234, accountNumber:'sample data', advPayType:'sample data', replenish:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', accPayType:'sample data', zeroPayOption:'sample data', offsetBy:'sample data', offsetFlag:'sample data', seqProvId:1234, seqMembId:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqVendAdvPayAcc:1234, seqVendId:1234, seqVendAddress:1234, accountNumber:'sample data', advPayType:'sample data', replenish:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', accPayType:'sample data', zeroPayOption:'sample data', offsetBy:'sample data', offsetFlag:'sample data', seqProvId:1234, seqMembId:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqVendAdvPayAcc:1234, seqVendId:1234, seqVendAddress:1234, accountNumber:'sample data', advPayType:'sample data', replenish:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', accPayType:'sample data', zeroPayOption:'sample data', offsetBy:'sample data', offsetFlag:'sample data', seqProvId:1234, seqMembId:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getVendorAdvPayAccounts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayaccounts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(vendorAdvPayAccount);
    });
  });


  describe('#createVendorAdvPayAccount', () => {
    var id = 1;
    it('should return an Promise<VendorAdvPayAccount>', () => {
      const vendorAdvPayAccount: VendorAdvPayAccount = {seqVendAdvPayAcc:1234, seqVendId:1234, seqVendAddress:1234, accountNumber:'sample data', advPayType:'sample data', replenish:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', accPayType:'sample data', zeroPayOption:'sample data', offsetBy:'sample data', offsetFlag:'sample data', seqProvId:1234, seqMembId:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createVendorAdvPayAccount(vendorAdvPayAccount).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayaccounts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateVendorAdvPayAccount', () => {
    var id = 1;
    it('should return an Promise<VendorAdvPayAccount>', () => {
      const vendorAdvPayAccount: VendorAdvPayAccount = {seqVendAdvPayAcc:1234, seqVendId:1234, seqVendAddress:1234, accountNumber:'sample data', advPayType:'sample data', replenish:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', accPayType:'sample data', zeroPayOption:'sample data', offsetBy:'sample data', offsetFlag:'sample data', seqProvId:1234, seqMembId:1234, primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateVendorAdvPayAccount(vendorAdvPayAccount, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayaccounts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteVendorAdvPayAccount', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteVendorAdvPayAccount(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayaccounts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});