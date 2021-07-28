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

import { CiebStreetAddressService } from './cieb-street-address.service';
import { CiebStreetAddress } from '../api-models/cieb-street-address.model'
import { CiebStreetAddresses } from "../api-models/testing/fake-cieb-street-address.model"

describe('CiebStreetAddressService', () => {
  let injector: TestBed;
  let service: CiebStreetAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebStreetAddressService]
    });
    injector = getTestBed();
    service = injector.get(CiebStreetAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebStreetAddresses', () => {
    it('should return an Promise<CiebStreetAddress[]>', () => {
      const ciebStreetAddress = [
       {seqAddrId:1234, seqEntityId:1234, addressCode:'sample data', paymentCode:'sample data', seqAccountId:1234, countryCode:'sample data', changeReasonCode:'sample data', restrictedCode:'sample data', addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', careof:'sample data', city:'sample data', state:'sample data', postalCode:'sample data', district:'sample data', province:'sample data', restrictedInd:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', visitingProvince:'sample data'},
       {seqAddrId:1234, seqEntityId:1234, addressCode:'sample data', paymentCode:'sample data', seqAccountId:1234, countryCode:'sample data', changeReasonCode:'sample data', restrictedCode:'sample data', addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', careof:'sample data', city:'sample data', state:'sample data', postalCode:'sample data', district:'sample data', province:'sample data', restrictedInd:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', visitingProvince:'sample data'},
       {seqAddrId:1234, seqEntityId:1234, addressCode:'sample data', paymentCode:'sample data', seqAccountId:1234, countryCode:'sample data', changeReasonCode:'sample data', restrictedCode:'sample data', addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', careof:'sample data', city:'sample data', state:'sample data', postalCode:'sample data', district:'sample data', province:'sample data', restrictedInd:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', visitingProvince:'sample data'}

      ];
      service.getCiebStreetAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstreetaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebStreetAddress);
    });
  });


  describe('#createCiebStreetAddress', () => {
    var id = 1;
    it('should return an Promise<CiebStreetAddress>', () => {
      const ciebStreetAddress: CiebStreetAddress = {seqAddrId:1234, seqEntityId:1234, addressCode:'sample data', paymentCode:'sample data', seqAccountId:1234, countryCode:'sample data', changeReasonCode:'sample data', restrictedCode:'sample data', addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', careof:'sample data', city:'sample data', state:'sample data', postalCode:'sample data', district:'sample data', province:'sample data', restrictedInd:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', visitingProvince:'sample data'};
      service.createCiebStreetAddress(ciebStreetAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstreetaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebStreetAddress', () => {
    var id = 1;
    it('should return an Promise<CiebStreetAddress>', () => {
      const ciebStreetAddress: CiebStreetAddress = {seqAddrId:1234, seqEntityId:1234, addressCode:'sample data', paymentCode:'sample data', seqAccountId:1234, countryCode:'sample data', changeReasonCode:'sample data', restrictedCode:'sample data', addrline1:'sample data', addrline2:'sample data', addrline3:'sample data', careof:'sample data', city:'sample data', state:'sample data', postalCode:'sample data', district:'sample data', province:'sample data', restrictedInd:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', visitingProvince:'sample data'};
      service.updateCiebStreetAddress(ciebStreetAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstreetaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebStreetAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebStreetAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstreetaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});