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

import { CspGetVendAddressCountService } from './csp-get-vend-address-count.service';
import { CspGetVendAddressCount } from '../api-models/csp-get-vend-address-count.model'
import { CspGetVendAddressCounts } from "../api-models/testing/fake-csp-get-vend-address-count.model"

describe('CspGetVendAddressCountService', () => {
  let injector: TestBed;
  let service: CspGetVendAddressCountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetVendAddressCountService]
    });
    injector = getTestBed();
    service = injector.get(CspGetVendAddressCountService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetVendAddressCounts', () => {
    it('should return an Promise<CspGetVendAddressCount[]>', () => {
      const cspGetVendAddressCount = [
       {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data', pRecordCount:1234},
       {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data', pRecordCount:1234},
       {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data', pRecordCount:1234}

      ];
      service.getCspGetVendAddressCounts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetvendaddresscounts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetVendAddressCount);
    });
  });


  describe('#createCspGetVendAddressCount', () => {
    var id = 1;
    it('should return an Promise<CspGetVendAddressCount>', () => {
      const cspGetVendAddressCount: CspGetVendAddressCount = {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data', pRecordCount:1234};
      service.createCspGetVendAddressCount(cspGetVendAddressCount).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetvendaddresscounts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetVendAddressCount', () => {
    var id = 1;
    it('should return an Promise<CspGetVendAddressCount>', () => {
      const cspGetVendAddressCount: CspGetVendAddressCount = {pVendorId:'sample data', pLastName:'sample data', pFirstName:'sample data', pDisplayTerm:'sample data', pRecordCount:1234};
      service.updateCspGetVendAddressCount(cspGetVendAddressCount, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetvendaddresscounts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetVendAddressCount', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetVendAddressCount(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetvendaddresscounts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});