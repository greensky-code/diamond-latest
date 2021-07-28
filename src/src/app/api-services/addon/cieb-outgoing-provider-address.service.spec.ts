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

import { CiebOutgoingProviderAddressService } from './cieb-outgoing-provider-address.service';
import { CiebOutgoingProviderAddress } from '../api-models/cieb-outgoing-provider-address.model'
import { CiebOutgoingProviderAddresses } from "../api-models/testing/fake-cieb-outgoing-provider-address.model"

describe('CiebOutgoingProviderAddressService', () => {
  let injector: TestBed;
  let service: CiebOutgoingProviderAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebOutgoingProviderAddressService]
    });
    injector = getTestBed();
    service = injector.get(CiebOutgoingProviderAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebOutgoingProviderAddresses', () => {
    it('should return an Promise<CiebOutgoingProviderAddress[]>', () => {
      const ciebOutgoingProviderAddress = [
       {seqClaimId:1234, payeeName:'sample data', addressLine1:'sample data', addressLine2:'sample data', addressLine3:'sample data', bankAddrFlg:'sample data', routingNum:'sample data', accountNum:'sample data', commentDesc:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', countryCode:'sample data', bankName:'sample data'},
       {seqClaimId:1234, payeeName:'sample data', addressLine1:'sample data', addressLine2:'sample data', addressLine3:'sample data', bankAddrFlg:'sample data', routingNum:'sample data', accountNum:'sample data', commentDesc:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', countryCode:'sample data', bankName:'sample data'},
       {seqClaimId:1234, payeeName:'sample data', addressLine1:'sample data', addressLine2:'sample data', addressLine3:'sample data', bankAddrFlg:'sample data', routingNum:'sample data', accountNum:'sample data', commentDesc:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', countryCode:'sample data', bankName:'sample data'}

      ];
      service.getCiebOutgoingProviderAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cieboutgoingprovideraddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebOutgoingProviderAddress);
    });
  });


  describe('#createCiebOutgoingProviderAddress', () => {
    var id = 1;
    it('should return an Promise<CiebOutgoingProviderAddress>', () => {
      const ciebOutgoingProviderAddress: CiebOutgoingProviderAddress = {seqClaimId:1234, payeeName:'sample data', addressLine1:'sample data', addressLine2:'sample data', addressLine3:'sample data', bankAddrFlg:'sample data', routingNum:'sample data', accountNum:'sample data', commentDesc:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', countryCode:'sample data', bankName:'sample data'};
      service.createCiebOutgoingProviderAddress(ciebOutgoingProviderAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cieboutgoingprovideraddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebOutgoingProviderAddress', () => {
    var id = 1;
    it('should return an Promise<CiebOutgoingProviderAddress>', () => {
      const ciebOutgoingProviderAddress: CiebOutgoingProviderAddress = {seqClaimId:1234, payeeName:'sample data', addressLine1:'sample data', addressLine2:'sample data', addressLine3:'sample data', bankAddrFlg:'sample data', routingNum:'sample data', accountNum:'sample data', commentDesc:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', countryCode:'sample data', bankName:'sample data'};
      service.updateCiebOutgoingProviderAddress(ciebOutgoingProviderAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cieboutgoingprovideraddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebOutgoingProviderAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebOutgoingProviderAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cieboutgoingprovideraddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});