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

import { VendorAddressContactService } from './vendor-address-contact.service';
import { VendorAddressContact } from '../api-models/vendor-address-contact.model'
import { VendorAddressContacts } from "../api-models/testing/fake-vendor-address-contact.model"

describe('VendorAddressContactService', () => {
  let injector: TestBed;
  let service: VendorAddressContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorAddressContactService]
    });
    injector = getTestBed();
    service = injector.get(VendorAddressContactService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getVendorAddressContacts', () => {
    it('should return an Promise<VendorAddressContact[]>', () => {
      const vendorAddressContact = [
       {seqVendContact:1234, seqVendId:1234, seqVendAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'},
       {seqVendContact:1234, seqVendId:1234, seqVendAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'},
       {seqVendContact:1234, seqVendId:1234, seqVendAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'}

      ];
      service.getVendorAddressContacts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/vendoraddresscontacts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(vendorAddressContact);
    });
  });


  describe('#createVendorAddressContact', () => {
    var id = 1;
    it('should return an Promise<VendorAddressContact>', () => {
      const vendorAddressContact: VendorAddressContact = {seqVendContact:1234, seqVendId:1234, seqVendAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'};
      service.createVendorAddressContact(vendorAddressContact).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoraddresscontacts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateVendorAddressContact', () => {
    var id = 1;
    it('should return an Promise<VendorAddressContact>', () => {
      const vendorAddressContact: VendorAddressContact = {seqVendContact:1234, seqVendId:1234, seqVendAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'};
      service.updateVendorAddressContact(vendorAddressContact, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoraddresscontacts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteVendorAddressContact', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteVendorAddressContact(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoraddresscontacts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});