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

import { CspGetMembAddressService } from './csp-get-memb-address.service';
import { CspGetMembAddress } from '../api-models/csp-get-memb-address.model'
import { CspGetMembAddresses } from "../api-models/testing/fake-csp-get-memb-address.model"

describe('CspGetMembAddressService', () => {
  let injector: TestBed;
  let service: CspGetMembAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetMembAddressService]
    });
    injector = getTestBed();
    service = injector.get(CspGetMembAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetMembAddresses', () => {
    it('should return an Promise<CspGetMembAddress[]>', () => {
      const cspGetMembAddress = [
       {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pAddrId:1234, pAddrSource:'sample data', pUser:'sample data'},
       {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pAddrId:1234, pAddrSource:'sample data', pUser:'sample data'},
       {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pAddrId:1234, pAddrSource:'sample data', pUser:'sample data'}

      ];
      service.getCspGetMembAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmembaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetMembAddress);
    });
  });


  describe('#createCspGetMembAddress', () => {
    var id = 1;
    it('should return an Promise<CspGetMembAddress>', () => {
      const cspGetMembAddress: CspGetMembAddress = {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pAddrId:1234, pAddrSource:'sample data', pUser:'sample data'};
      service.createCspGetMembAddress(cspGetMembAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmembaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetMembAddress', () => {
    var id = 1;
    it('should return an Promise<CspGetMembAddress>', () => {
      const cspGetMembAddress: CspGetMembAddress = {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pAddrId:1234, pAddrSource:'sample data', pUser:'sample data'};
      service.updateCspGetMembAddress(cspGetMembAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmembaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetMembAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetMembAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmembaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});