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

import { CspGetStreetAddressInfoService } from './csp-get-street-address-info.service';
import { CspGetStreetAddressInfo } from '../api-models/csp-get-street-address-info.model'
import { CspGetStreetAddressInfos } from "../api-models/testing/fake-csp-get-street-address-info.model"

describe('CspGetStreetAddressInfoService', () => {
  let injector: TestBed;
  let service: CspGetStreetAddressInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetStreetAddressInfoService]
    });
    injector = getTestBed();
    service = injector.get(CspGetStreetAddressInfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetStreetAddressInfos', () => {
    it('should return an Promise<CspGetStreetAddressInfo[]>', () => {
      const cspGetStreetAddressInfo = [
       {pSeqAddrId:1234, pSeqEntityId:1234, pAddressCode:'sample data', pPaymentCode:'sample data', pSeqAccountId:1234, pCountryCode:'sample data', pAddrline1:'sample data', pAddrline2:'sample data', pAddrline3:'sample data', pCareof:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pDistrict:'sample data', pProvince:'sample data'},
       {pSeqAddrId:1234, pSeqEntityId:1234, pAddressCode:'sample data', pPaymentCode:'sample data', pSeqAccountId:1234, pCountryCode:'sample data', pAddrline1:'sample data', pAddrline2:'sample data', pAddrline3:'sample data', pCareof:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pDistrict:'sample data', pProvince:'sample data'},
       {pSeqAddrId:1234, pSeqEntityId:1234, pAddressCode:'sample data', pPaymentCode:'sample data', pSeqAccountId:1234, pCountryCode:'sample data', pAddrline1:'sample data', pAddrline2:'sample data', pAddrline3:'sample data', pCareof:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pDistrict:'sample data', pProvince:'sample data'}

      ];
      service.getCspGetStreetAddressInfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetstreetaddressinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetStreetAddressInfo);
    });
  });


  describe('#createCspGetStreetAddressInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetStreetAddressInfo>', () => {
      const cspGetStreetAddressInfo: CspGetStreetAddressInfo = {pSeqAddrId:1234, pSeqEntityId:1234, pAddressCode:'sample data', pPaymentCode:'sample data', pSeqAccountId:1234, pCountryCode:'sample data', pAddrline1:'sample data', pAddrline2:'sample data', pAddrline3:'sample data', pCareof:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pDistrict:'sample data', pProvince:'sample data'};
      service.createCspGetStreetAddressInfo(cspGetStreetAddressInfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetstreetaddressinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetStreetAddressInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetStreetAddressInfo>', () => {
      const cspGetStreetAddressInfo: CspGetStreetAddressInfo = {pSeqAddrId:1234, pSeqEntityId:1234, pAddressCode:'sample data', pPaymentCode:'sample data', pSeqAccountId:1234, pCountryCode:'sample data', pAddrline1:'sample data', pAddrline2:'sample data', pAddrline3:'sample data', pCareof:'sample data', pCity:'sample data', pState:'sample data', pPostalCode:'sample data', pDistrict:'sample data', pProvince:'sample data'};
      service.updateCspGetStreetAddressInfo(cspGetStreetAddressInfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetstreetaddressinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetStreetAddressInfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetStreetAddressInfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetstreetaddressinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});