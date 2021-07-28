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

import { VendorMasterService } from './vendor-master.service';
import { VendorMaster } from '../api-models/vendor-master.model'
import { VendorMasters } from "../api-models/testing/fake-vendor-master.model"

describe('VendorMasterService', () => {
  let injector: TestBed;
  let service: VendorMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorMasterService]
    });
    injector = getTestBed();
    service = injector.get(VendorMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getVendorMasters', () => {
    it('should return an Promise<VendorMaster[]>', () => {
      const vendorMaster = [
       {userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', tradingPartnerId:'sample data', nationalProviderId:'sample data', vendAccountType:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountDescription:'sample data', vendBankAccountNumber:'sample data', eftInd:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqVend1099Addr:1234, paymentDelayDays:1234, vendor1099Flag:'sample data', holdPaymentFlag:'sample data', userDefined:'sample data', irsTaxId:'sample data', vendorType:'sample data', fullName:'sample data', shortName:'sample data', vendorId:'sample data', seqVendId:1234},
       {userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', tradingPartnerId:'sample data', nationalProviderId:'sample data', vendAccountType:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountDescription:'sample data', vendBankAccountNumber:'sample data', eftInd:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqVend1099Addr:1234, paymentDelayDays:1234, vendor1099Flag:'sample data', holdPaymentFlag:'sample data', userDefined:'sample data', irsTaxId:'sample data', vendorType:'sample data', fullName:'sample data', shortName:'sample data', vendorId:'sample data', seqVendId:1234},
       {userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', tradingPartnerId:'sample data', nationalProviderId:'sample data', vendAccountType:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountDescription:'sample data', vendBankAccountNumber:'sample data', eftInd:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqVend1099Addr:1234, paymentDelayDays:1234, vendor1099Flag:'sample data', holdPaymentFlag:'sample data', userDefined:'sample data', irsTaxId:'sample data', vendorType:'sample data', fullName:'sample data', shortName:'sample data', vendorId:'sample data', seqVendId:1234}

      ];
      service.getVendorMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/vendormasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(vendorMaster);
    });
  });


  describe('#createVendorMaster', () => {
    var id = 1;
    it('should return an Promise<VendorMaster>', () => {
      const vendorMaster: VendorMaster = {userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', tradingPartnerId:'sample data', nationalProviderId:'sample data', vendAccountType:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountDescription:'sample data', vendBankAccountNumber:'sample data', eftInd:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqVend1099Addr:1234, paymentDelayDays:1234, vendor1099Flag:'sample data', holdPaymentFlag:'sample data', userDefined:'sample data', irsTaxId:'sample data', vendorType:'sample data', fullName:'sample data', shortName:'sample data', vendorId:'sample data', seqVendId:1234};
      service.createVendorMaster(vendorMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendormasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateVendorMaster', () => {
    var id = 1;
    it('should return an Promise<VendorMaster>', () => {
      const vendorMaster: VendorMaster = {userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', tradingPartnerId:'sample data', nationalProviderId:'sample data', vendAccountType:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountDescription:'sample data', vendBankAccountNumber:'sample data', eftInd:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqVend1099Addr:1234, paymentDelayDays:1234, vendor1099Flag:'sample data', holdPaymentFlag:'sample data', userDefined:'sample data', irsTaxId:'sample data', vendorType:'sample data', fullName:'sample data', shortName:'sample data', vendorId:'sample data', seqVendId:1234};
      service.updateVendorMaster(vendorMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendormasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteVendorMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteVendorMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendormasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});