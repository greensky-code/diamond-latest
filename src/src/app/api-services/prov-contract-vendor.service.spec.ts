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

import { ProvContractVendorService } from './prov-contract-vendor.service';
import { ProvContractVendor } from '../api-models/prov-contract-vendor.model'
import { ProvContractVendors } from "../api-models/testing/fake-prov-contract-vendor.model"

describe('ProvContractVendorService', () => {
  let injector: TestBed;
  let service: ProvContractVendorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvContractVendorService]
    });
    injector = getTestBed();
    service = injector.get(ProvContractVendorService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvContractVendors', () => {
    it('should return an Promise<ProvContractVendor[]>', () => {
      const provContractVendor = [
       {seqProvVendId:1234, seqProvId:1234, seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', directoryInclude:'sample data', defaultVendorAddr:'sample data'},
       {seqProvVendId:1234, seqProvId:1234, seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', directoryInclude:'sample data', defaultVendorAddr:'sample data'},
       {seqProvVendId:1234, seqProvId:1234, seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', directoryInclude:'sample data', defaultVendorAddr:'sample data'}

      ];
      service.getProvContractVendors().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractvendors/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provContractVendor);
    });
  });


  describe('#createProvContractVendor', () => {
    var id = 1;
    it('should return an Promise<ProvContractVendor>', () => {
      const provContractVendor: ProvContractVendor = {seqProvVendId:1234, seqProvId:1234, seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', directoryInclude:'sample data', defaultVendorAddr:'sample data'};
      service.createProvContractVendor(provContractVendor).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractvendors`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvContractVendor', () => {
    var id = 1;
    it('should return an Promise<ProvContractVendor>', () => {
      const provContractVendor: ProvContractVendor = {seqProvVendId:1234, seqProvId:1234, seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', directoryInclude:'sample data', defaultVendorAddr:'sample data'};
      service.updateProvContractVendor(provContractVendor, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractvendors/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvContractVendor', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvContractVendor(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractvendors/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});