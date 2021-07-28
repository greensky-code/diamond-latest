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

import { CspGetProvAddressService } from './csp-get-prov-address.service';
import { CspGetProvAddress } from '../api-models/csp-get-prov-address.model'
import { CspGetProvAddresses } from "../api-models/testing/fake-csp-get-prov-address.model"

describe('CspGetProvAddressService', () => {
  let injector: TestBed;
  let service: CspGetProvAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetProvAddressService]
    });
    injector = getTestBed();
    service = injector.get(CspGetProvAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetProvAddresses', () => {
    it('should return an Promise<CspGetProvAddress[]>', () => {
      const cspGetProvAddress = [
       {pSeqClaimId:1234, pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'},
       {pSeqClaimId:1234, pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'},
       {pSeqClaimId:1234, pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'}

      ];
      service.getCspGetProvAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetprovaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetProvAddress);
    });
  });


  describe('#createCspGetProvAddress', () => {
    var id = 1;
    it('should return an Promise<CspGetProvAddress>', () => {
      const cspGetProvAddress: CspGetProvAddress = {pSeqClaimId:1234, pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'};
      service.createCspGetProvAddress(cspGetProvAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetprovaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetProvAddress', () => {
    var id = 1;
    it('should return an Promise<CspGetProvAddress>', () => {
      const cspGetProvAddress: CspGetProvAddress = {pSeqClaimId:1234, pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'};
      service.updateCspGetProvAddress(cspGetProvAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetprovaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetProvAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetProvAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetprovaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});