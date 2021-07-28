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

import { CspGetMembAddressListService } from './csp-get-memb-address-list.service';
import { CspGetMembAddressList } from '../api-models/csp-get-memb-address-list.model'
import { CspGetMembAddressLists } from "../api-models/testing/fake-csp-get-memb-address-list.model"

describe('CspGetMembAddressListService', () => {
  let injector: TestBed;
  let service: CspGetMembAddressListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetMembAddressListService]
    });
    injector = getTestBed();
    service = injector.get(CspGetMembAddressListService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetMembAddressLists', () => {
    it('should return an Promise<CspGetMembAddressList[]>', () => {
      const cspGetMembAddressList = [
       {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'},
       {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'},
       {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'}

      ];
      service.getCspGetMembAddressLists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmembaddresslists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetMembAddressList);
    });
  });


  describe('#createCspGetMembAddressList', () => {
    var id = 1;
    it('should return an Promise<CspGetMembAddressList>', () => {
      const cspGetMembAddressList: CspGetMembAddressList = {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'};
      service.createCspGetMembAddressList(cspGetMembAddressList).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmembaddresslists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetMembAddressList', () => {
    var id = 1;
    it('should return an Promise<CspGetMembAddressList>', () => {
      const cspGetMembAddressList: CspGetMembAddressList = {pSeqEntityId:1234, pSeqClaimId:1234, pDocCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'};
      service.updateCspGetMembAddressList(cspGetMembAddressList, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmembaddresslists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetMembAddressList', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetMembAddressList(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmembaddresslists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});