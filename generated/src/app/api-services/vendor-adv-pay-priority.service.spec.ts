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

import { VendorAdvPayPriorityService } from './vendor-adv-pay-priority.service';
import { VendorAdvPayPriority } from '../api-models/vendor-adv-pay-priority.model'
import { VendorAdvPayPrioritys } from "../api-models/testing/fake-vendor-adv-pay-priority.model"

describe('VendorAdvPayPriorityService', () => {
  let injector: TestBed;
  let service: VendorAdvPayPriorityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorAdvPayPriorityService]
    });
    injector = getTestBed();
    service = injector.get(VendorAdvPayPriorityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getVendorAdvPayPrioritys', () => {
    it('should return an Promise<VendorAdvPayPriority[]>', () => {
      const vendorAdvPayPriority = [
       {seqVendAdvPayPriority:1234, seqVendId:1234, priorityOrder:1234, advPayType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqVendAdvPayPriority:1234, seqVendId:1234, priorityOrder:1234, advPayType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqVendAdvPayPriority:1234, seqVendId:1234, priorityOrder:1234, advPayType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getVendorAdvPayPrioritys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayprioritys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(vendorAdvPayPriority);
    });
  });


  describe('#createVendorAdvPayPriority', () => {
    var id = 1;
    it('should return an Promise<VendorAdvPayPriority>', () => {
      const vendorAdvPayPriority: VendorAdvPayPriority = {seqVendAdvPayPriority:1234, seqVendId:1234, priorityOrder:1234, advPayType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createVendorAdvPayPriority(vendorAdvPayPriority).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayprioritys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateVendorAdvPayPriority', () => {
    var id = 1;
    it('should return an Promise<VendorAdvPayPriority>', () => {
      const vendorAdvPayPriority: VendorAdvPayPriority = {seqVendAdvPayPriority:1234, seqVendId:1234, priorityOrder:1234, advPayType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateVendorAdvPayPriority(vendorAdvPayPriority, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayprioritys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteVendorAdvPayPriority', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteVendorAdvPayPriority(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayprioritys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});