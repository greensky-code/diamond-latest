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

import { IpaAffiliateAddressService } from './ipa-affiliate-address.service';
import { IpaAffiliateAddress } from '../api-models/ipa-affiliate-address.model'
import { IpaAffiliateAddresses } from "../api-models/testing/fake-ipa-affiliate-address.model"

describe('IpaAffiliateAddressService', () => {
  let injector: TestBed;
  let service: IpaAffiliateAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpaAffiliateAddressService]
    });
    injector = getTestBed();
    service = injector.get(IpaAffiliateAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIpaAffiliateAddresses', () => {
    it('should return an Promise<IpaAffiliateAddress[]>', () => {
      const ipaAffiliateAddress = [
       {seqIpaAffltAddress:1234, ipaId:'sample data', ipaProvCategory:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaAffltAddress:1234, ipaId:'sample data', ipaProvCategory:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaAffltAddress:1234, ipaId:'sample data', ipaProvCategory:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getIpaAffiliateAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaffiliateaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ipaAffiliateAddress);
    });
  });


  describe('#createIpaAffiliateAddress', () => {
    var id = 1;
    it('should return an Promise<IpaAffiliateAddress>', () => {
      const ipaAffiliateAddress: IpaAffiliateAddress = {seqIpaAffltAddress:1234, ipaId:'sample data', ipaProvCategory:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createIpaAffiliateAddress(ipaAffiliateAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaffiliateaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIpaAffiliateAddress', () => {
    var id = 1;
    it('should return an Promise<IpaAffiliateAddress>', () => {
      const ipaAffiliateAddress: IpaAffiliateAddress = {seqIpaAffltAddress:1234, ipaId:'sample data', ipaProvCategory:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateIpaAffiliateAddress(ipaAffiliateAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaffiliateaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIpaAffiliateAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIpaAffiliateAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaffiliateaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});