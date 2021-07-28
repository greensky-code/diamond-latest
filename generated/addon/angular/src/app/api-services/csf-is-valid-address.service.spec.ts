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

import { CsfIsValidAddressService } from './csf-is-valid-address.service';
import { CsfIsValidAddress } from '../api-models/csf-is-valid-address.model'
import { CsfIsValidAddresses } from "../api-models/testing/fake-csf-is-valid-address.model"

describe('CsfIsValidAddressService', () => {
  let injector: TestBed;
  let service: CsfIsValidAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfIsValidAddressService]
    });
    injector = getTestBed();
    service = injector.get(CsfIsValidAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfIsValidAddresses', () => {
    it('should return an Promise<CsfIsValidAddress[]>', () => {
      const csfIsValidAddress = [
       {pSeqAddrId:1234, pDocCode:'sample data', pCwwClaimInd:1234},
       {pSeqAddrId:1234, pDocCode:'sample data', pCwwClaimInd:1234},
       {pSeqAddrId:1234, pDocCode:'sample data', pCwwClaimInd:1234}

      ];
      service.getCsfIsValidAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfisvalidaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfIsValidAddress);
    });
  });


  describe('#createCsfIsValidAddress', () => {
    var id = 1;
    it('should return an Promise<CsfIsValidAddress>', () => {
      const csfIsValidAddress: CsfIsValidAddress = {pSeqAddrId:1234, pDocCode:'sample data', pCwwClaimInd:1234};
      service.createCsfIsValidAddress(csfIsValidAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfisvalidaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfIsValidAddress', () => {
    var id = 1;
    it('should return an Promise<CsfIsValidAddress>', () => {
      const csfIsValidAddress: CsfIsValidAddress = {pSeqAddrId:1234, pDocCode:'sample data', pCwwClaimInd:1234};
      service.updateCsfIsValidAddress(csfIsValidAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfisvalidaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfIsValidAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfIsValidAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfisvalidaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});