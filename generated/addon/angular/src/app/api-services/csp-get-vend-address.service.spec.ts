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

import { CspGetVendAddressService } from './csp-get-vend-address.service';
import { CspGetVendAddress } from '../api-models/csp-get-vend-address.model'
import { CspGetVendAddresses } from "../api-models/testing/fake-csp-get-vend-address.model"

describe('CspGetVendAddressService', () => {
  let injector: TestBed;
  let service: CspGetVendAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetVendAddressService]
    });
    injector = getTestBed();
    service = injector.get(CspGetVendAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetVendAddresses', () => {
    it('should return an Promise<CspGetVendAddress[]>', () => {
      const cspGetVendAddress = [
       {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data'},
       {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data'},
       {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data'}

      ];
      service.getCspGetVendAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetvendaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetVendAddress);
    });
  });


  describe('#createCspGetVendAddress', () => {
    var id = 1;
    it('should return an Promise<CspGetVendAddress>', () => {
      const cspGetVendAddress: CspGetVendAddress = {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data'};
      service.createCspGetVendAddress(cspGetVendAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetvendaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetVendAddress', () => {
    var id = 1;
    it('should return an Promise<CspGetVendAddress>', () => {
      const cspGetVendAddress: CspGetVendAddress = {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data'};
      service.updateCspGetVendAddress(cspGetVendAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetvendaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetVendAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetVendAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetvendaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});