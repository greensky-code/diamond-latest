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

import { LoadPayAddressService } from './load-pay-address.service';
import { LoadPayAddress } from '../api-models/load-pay-address.model'
import { LoadPayAddresses } from "../api-models/testing/fake-load-pay-address.model"

describe('LoadPayAddressService', () => {
  let injector: TestBed;
  let service: LoadPayAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadPayAddressService]
    });
    injector = getTestBed();
    service = injector.get(LoadPayAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLoadPayAddresses', () => {
    it('should return an Promise<LoadPayAddress[]>', () => {
      const loadPayAddress = [
       {pSeqVenprvId:1234, pSeqVenprvAddrId:1234, pSeqNpiId:1234, pEntityCode:'sample data'},
       {pSeqVenprvId:1234, pSeqVenprvAddrId:1234, pSeqNpiId:1234, pEntityCode:'sample data'},
       {pSeqVenprvId:1234, pSeqVenprvAddrId:1234, pSeqNpiId:1234, pEntityCode:'sample data'}

      ];
      service.getLoadPayAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/loadpayaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(loadPayAddress);
    });
  });


  describe('#createLoadPayAddress', () => {
    var id = 1;
    it('should return an Promise<LoadPayAddress>', () => {
      const loadPayAddress: LoadPayAddress = {pSeqVenprvId:1234, pSeqVenprvAddrId:1234, pSeqNpiId:1234, pEntityCode:'sample data'};
      service.createLoadPayAddress(loadPayAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loadpayaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLoadPayAddress', () => {
    var id = 1;
    it('should return an Promise<LoadPayAddress>', () => {
      const loadPayAddress: LoadPayAddress = {pSeqVenprvId:1234, pSeqVenprvAddrId:1234, pSeqNpiId:1234, pEntityCode:'sample data'};
      service.updateLoadPayAddress(loadPayAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loadpayaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLoadPayAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLoadPayAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loadpayaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});