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

import { IpaAddressService } from './ipa-address.service';
import { IpaAddress } from '../api-models/ipa-address.model'
import { IpaAddresses } from "../api-models/testing/fake-ipa-address.model"

describe('IpaAddressService', () => {
  let injector: TestBed;
  let service: IpaAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpaAddressService]
    });
    injector = getTestBed();
    service = injector.get(IpaAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIpaAddresses', () => {
    it('should return an Promise<IpaAddress[]>', () => {
      const ipaAddress = [
       {seqIpaAddress:1234, ipaId:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', primaryAddress:'sample data', addrCategoryCode:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaAddress:1234, ipaId:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', primaryAddress:'sample data', addrCategoryCode:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaAddress:1234, ipaId:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', primaryAddress:'sample data', addrCategoryCode:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getIpaAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ipaAddress);
    });
  });


  describe('#createIpaAddress', () => {
    var id = 1;
    it('should return an Promise<IpaAddress>', () => {
      const ipaAddress: IpaAddress = {seqIpaAddress:1234, ipaId:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', primaryAddress:'sample data', addrCategoryCode:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createIpaAddress(ipaAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIpaAddress', () => {
    var id = 1;
    it('should return an Promise<IpaAddress>', () => {
      const ipaAddress: IpaAddress = {seqIpaAddress:1234, ipaId:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', primaryAddress:'sample data', addrCategoryCode:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateIpaAddress(ipaAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIpaAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIpaAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});