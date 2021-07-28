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

import { CspGetGunAddressService } from './csp-get-gun-address.service';
import { CspGetGunAddress } from '../api-models/csp-get-gun-address.model'
import { CspGetGunAddresses } from "../api-models/testing/fake-csp-get-gun-address.model"

describe('CspGetGunAddressService', () => {
  let injector: TestBed;
  let service: CspGetGunAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetGunAddressService]
    });
    injector = getTestBed();
    service = injector.get(CspGetGunAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetGunAddresses', () => {
    it('should return an Promise<CspGetGunAddress[]>', () => {
      const cspGetGunAddress = [
       {pSeqEntityId:1234, pAddrline1:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data'},
       {pSeqEntityId:1234, pAddrline1:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data'},
       {pSeqEntityId:1234, pAddrline1:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data'}

      ];
      service.getCspGetGunAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetgunaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetGunAddress);
    });
  });


  describe('#createCspGetGunAddress', () => {
    var id = 1;
    it('should return an Promise<CspGetGunAddress>', () => {
      const cspGetGunAddress: CspGetGunAddress = {pSeqEntityId:1234, pAddrline1:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data'};
      service.createCspGetGunAddress(cspGetGunAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetgunaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetGunAddress', () => {
    var id = 1;
    it('should return an Promise<CspGetGunAddress>', () => {
      const cspGetGunAddress: CspGetGunAddress = {pSeqEntityId:1234, pAddrline1:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pCountryCode:'sample data'};
      service.updateCspGetGunAddress(cspGetGunAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetgunaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetGunAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetGunAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetgunaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});