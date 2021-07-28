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

import { VendorAdvPayAccDetailService } from './vendor-adv-pay-acc-detail.service';
import { VendorAdvPayAccDetail } from '../api-models/vendor-adv-pay-acc-detail.model'
import { VendorAdvPayAccDetails } from "../api-models/testing/fake-vendor-adv-pay-acc-detail.model"

describe('VendorAdvPayAccDetailService', () => {
  let injector: TestBed;
  let service: VendorAdvPayAccDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorAdvPayAccDetailService]
    });
    injector = getTestBed();
    service = injector.get(VendorAdvPayAccDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getVendorAdvPayAccDetails', () => {
    it('should return an Promise<VendorAdvPayAccDetail[]>', () => {
      const vendorAdvPayAccDetail = [
       {seqVendAdvPayAccDtl:1234, seqVendAdvPayAcc:1234, sequenceNumber:1234, advPayAmount:1234, checkEftType:'sample data', checkEftNumber:'sample data', checkEftDate:'2018-01-01', checkEftMethod:'sample data', apStatus:'sample data', balanceAmount:1234, selectedForPay:1234, seqApTrans:1234, approveStatus:'sample data', approveUserId:'sample data', approveDate:'2018-01-01', denyReason:'sample data', appUserDefined1:'sample data', appUserDefined2:'sample data', appUserDate1:'2018-01-01', appUserDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqVendAdvPayAccDtl:1234, seqVendAdvPayAcc:1234, sequenceNumber:1234, advPayAmount:1234, checkEftType:'sample data', checkEftNumber:'sample data', checkEftDate:'2018-01-01', checkEftMethod:'sample data', apStatus:'sample data', balanceAmount:1234, selectedForPay:1234, seqApTrans:1234, approveStatus:'sample data', approveUserId:'sample data', approveDate:'2018-01-01', denyReason:'sample data', appUserDefined1:'sample data', appUserDefined2:'sample data', appUserDate1:'2018-01-01', appUserDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqVendAdvPayAccDtl:1234, seqVendAdvPayAcc:1234, sequenceNumber:1234, advPayAmount:1234, checkEftType:'sample data', checkEftNumber:'sample data', checkEftDate:'2018-01-01', checkEftMethod:'sample data', apStatus:'sample data', balanceAmount:1234, selectedForPay:1234, seqApTrans:1234, approveStatus:'sample data', approveUserId:'sample data', approveDate:'2018-01-01', denyReason:'sample data', appUserDefined1:'sample data', appUserDefined2:'sample data', appUserDate1:'2018-01-01', appUserDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getVendorAdvPayAccDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayaccdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(vendorAdvPayAccDetail);
    });
  });


  describe('#createVendorAdvPayAccDetail', () => {
    var id = 1;
    it('should return an Promise<VendorAdvPayAccDetail>', () => {
      const vendorAdvPayAccDetail: VendorAdvPayAccDetail = {seqVendAdvPayAccDtl:1234, seqVendAdvPayAcc:1234, sequenceNumber:1234, advPayAmount:1234, checkEftType:'sample data', checkEftNumber:'sample data', checkEftDate:'2018-01-01', checkEftMethod:'sample data', apStatus:'sample data', balanceAmount:1234, selectedForPay:1234, seqApTrans:1234, approveStatus:'sample data', approveUserId:'sample data', approveDate:'2018-01-01', denyReason:'sample data', appUserDefined1:'sample data', appUserDefined2:'sample data', appUserDate1:'2018-01-01', appUserDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createVendorAdvPayAccDetail(vendorAdvPayAccDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayaccdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateVendorAdvPayAccDetail', () => {
    var id = 1;
    it('should return an Promise<VendorAdvPayAccDetail>', () => {
      const vendorAdvPayAccDetail: VendorAdvPayAccDetail = {seqVendAdvPayAccDtl:1234, seqVendAdvPayAcc:1234, sequenceNumber:1234, advPayAmount:1234, checkEftType:'sample data', checkEftNumber:'sample data', checkEftDate:'2018-01-01', checkEftMethod:'sample data', apStatus:'sample data', balanceAmount:1234, selectedForPay:1234, seqApTrans:1234, approveStatus:'sample data', approveUserId:'sample data', approveDate:'2018-01-01', denyReason:'sample data', appUserDefined1:'sample data', appUserDefined2:'sample data', appUserDate1:'2018-01-01', appUserDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateVendorAdvPayAccDetail(vendorAdvPayAccDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayaccdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteVendorAdvPayAccDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteVendorAdvPayAccDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayaccdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});