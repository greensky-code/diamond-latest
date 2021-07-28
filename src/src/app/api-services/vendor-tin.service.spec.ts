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

import { VendorTinService } from './vendor-tin.service';
import { VendorTin } from '../api-models/vendor-tin.model'

describe('VendorTinService', () => {
  let injector: TestBed;
  let service: VendorTinService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorTinService]
    });
    injector = getTestBed();
    service = injector.get(VendorTinService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getVendorTins', () => {
    it('should return an Promise<VendorTin[]>', () => {
      const vendorTin = [
       {irsTaxId:'sample data', taxEntityName:'sample data', address1:'sample data', address2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', county:'sample data', country:'sample data', contact:'sample data', title:'sample data', phone:'sample data', ext:'sample data', fax:'sample data', vendor1099Flag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {irsTaxId:'sample data', taxEntityName:'sample data', address1:'sample data', address2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', county:'sample data', country:'sample data', contact:'sample data', title:'sample data', phone:'sample data', ext:'sample data', fax:'sample data', vendor1099Flag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {irsTaxId:'sample data', taxEntityName:'sample data', address1:'sample data', address2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', county:'sample data', country:'sample data', contact:'sample data', title:'sample data', phone:'sample data', ext:'sample data', fax:'sample data', vendor1099Flag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getVendorTins().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/vendortins/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(vendorTin);
    });
  });


  describe('#createVendorTin', () => {
    var id = 1;
    it('should return an Promise<VendorTin>', () => {
      const vendorTin: VendorTin = {irsTaxId:'sample data', taxEntityName:'sample data', address1:'sample data', address2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', county:'sample data', country:'sample data', contact:'sample data', title:'sample data', phone:'sample data', ext:'sample data', fax:'sample data', vendor1099Flag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createVendorTin(vendorTin).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendortins`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateVendorTin', () => {
    var id = 1;
    it('should return an Promise<VendorTin>', () => {
      const vendorTin: VendorTin = {irsTaxId:'sample data', taxEntityName:'sample data', address1:'sample data', address2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', county:'sample data', country:'sample data', contact:'sample data', title:'sample data', phone:'sample data', ext:'sample data', fax:'sample data', vendor1099Flag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateVendorTin(vendorTin, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendortins/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteVendorTin', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteVendorTin(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendortins/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});