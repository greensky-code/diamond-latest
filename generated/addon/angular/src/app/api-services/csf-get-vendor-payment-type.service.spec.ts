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

import { CsfGetVendorPaymentTypeService } from './csf-get-vendor-payment-type.service';
import { CsfGetVendorPaymentType } from '../api-models/csf-get-vendor-payment-type.model'
import { CsfGetVendorPaymentTypes } from "../api-models/testing/fake-csf-get-vendor-payment-type.model"

describe('CsfGetVendorPaymentTypeService', () => {
  let injector: TestBed;
  let service: CsfGetVendorPaymentTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfGetVendorPaymentTypeService]
    });
    injector = getTestBed();
    service = injector.get(CsfGetVendorPaymentTypeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfGetVendorPaymentTypes', () => {
    it('should return an Promise<CsfGetVendorPaymentType[]>', () => {
      const csfGetVendorPaymentType = [
       {pSeqVendId:1234, pSeqVendAddress:1234, pSeqProvId:1234},
       {pSeqVendId:1234, pSeqVendAddress:1234, pSeqProvId:1234},
       {pSeqVendId:1234, pSeqVendAddress:1234, pSeqProvId:1234}

      ];
      service.getCsfGetVendorPaymentTypes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetvendorpaymenttypes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfGetVendorPaymentType);
    });
  });


  describe('#createCsfGetVendorPaymentType', () => {
    var id = 1;
    it('should return an Promise<CsfGetVendorPaymentType>', () => {
      const csfGetVendorPaymentType: CsfGetVendorPaymentType = {pSeqVendId:1234, pSeqVendAddress:1234, pSeqProvId:1234};
      service.createCsfGetVendorPaymentType(csfGetVendorPaymentType).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetvendorpaymenttypes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfGetVendorPaymentType', () => {
    var id = 1;
    it('should return an Promise<CsfGetVendorPaymentType>', () => {
      const csfGetVendorPaymentType: CsfGetVendorPaymentType = {pSeqVendId:1234, pSeqVendAddress:1234, pSeqProvId:1234};
      service.updateCsfGetVendorPaymentType(csfGetVendorPaymentType, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetvendorpaymenttypes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfGetVendorPaymentType', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfGetVendorPaymentType(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetvendorpaymenttypes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});