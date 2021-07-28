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

import { VendorAddressService } from './vendor-address.service';
import { VendorAddress } from '../api-models/vendor-address.model'
import { VendorAddresses } from "../api-models/testing/fake-vendor-address.model"

describe('VendorAddressService', () => {
  let injector: TestBed;
  let service: VendorAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorAddressService]
    });
    injector = getTestBed();
    service = injector.get(VendorAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getVendorAddresses', () => {
    it('should return an Promise<VendorAddress[]>', () => {
      const vendorAddress = [
       {seqVendAddress:1234, seqVendId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', seqVendAddrBillOvrd:1234, country:'sample data', primaryAddress:'sample data', userDate2:'2018-01-01'},
       {seqVendAddress:1234, seqVendId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', seqVendAddrBillOvrd:1234, country:'sample data', primaryAddress:'sample data', userDate2:'2018-01-01'},
       {seqVendAddress:1234, seqVendId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', seqVendAddrBillOvrd:1234, country:'sample data', primaryAddress:'sample data', userDate2:'2018-01-01'}

      ];
      service.getVendorAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/vendoraddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(vendorAddress);
    });
  });


  describe('#createVendorAddress', () => {
    var id = 1;
    it('should return an Promise<VendorAddress>', () => {
      const vendorAddress: VendorAddress = {seqVendAddress:1234, seqVendId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', seqVendAddrBillOvrd:1234, country:'sample data', primaryAddress:'sample data', userDate2:'2018-01-01'};
      service.createVendorAddress(vendorAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoraddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateVendorAddress', () => {
    var id = 1;
    it('should return an Promise<VendorAddress>', () => {
      const vendorAddress: VendorAddress = {seqVendAddress:1234, seqVendId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', seqVendAddrBillOvrd:1234, country:'sample data', primaryAddress:'sample data', userDate2:'2018-01-01'};
      service.updateVendorAddress(vendorAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoraddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteVendorAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteVendorAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoraddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});