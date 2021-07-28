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

import { ProcGetSubdivAddressService } from './proc-get-subdiv-address.service';
import { ProcGetSubdivAddress } from '../api-models/proc-get-subdiv-address.model'
import { ProcGetSubdivAddresses } from "../api-models/testing/fake-proc-get-subdiv-address.model"

describe('ProcGetSubdivAddressService', () => {
  let injector: TestBed;
  let service: ProcGetSubdivAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetSubdivAddressService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetSubdivAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetSubdivAddresses', () => {
    it('should return an Promise<ProcGetSubdivAddress[]>', () => {
      const procGetSubdivAddress = [
       {pSubscriberId:'sample data', poAddrline1:'sample data', poAddrline2:'sample data', poCity:'sample data', poState:'sample data', poDistrict:'sample data', poProvince:'sample data', poCountryCode:'sample data', poSubDivCode:'sample data', poPostalCode:'sample data'},
       {pSubscriberId:'sample data', poAddrline1:'sample data', poAddrline2:'sample data', poCity:'sample data', poState:'sample data', poDistrict:'sample data', poProvince:'sample data', poCountryCode:'sample data', poSubDivCode:'sample data', poPostalCode:'sample data'},
       {pSubscriberId:'sample data', poAddrline1:'sample data', poAddrline2:'sample data', poCity:'sample data', poState:'sample data', poDistrict:'sample data', poProvince:'sample data', poCountryCode:'sample data', poSubDivCode:'sample data', poPostalCode:'sample data'}

      ];
      service.getProcGetSubdivAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubdivaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetSubdivAddress);
    });
  });


  describe('#createProcGetSubdivAddress', () => {
    var id = 1;
    it('should return an Promise<ProcGetSubdivAddress>', () => {
      const procGetSubdivAddress: ProcGetSubdivAddress = {pSubscriberId:'sample data', poAddrline1:'sample data', poAddrline2:'sample data', poCity:'sample data', poState:'sample data', poDistrict:'sample data', poProvince:'sample data', poCountryCode:'sample data', poSubDivCode:'sample data', poPostalCode:'sample data'};
      service.createProcGetSubdivAddress(procGetSubdivAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubdivaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetSubdivAddress', () => {
    var id = 1;
    it('should return an Promise<ProcGetSubdivAddress>', () => {
      const procGetSubdivAddress: ProcGetSubdivAddress = {pSubscriberId:'sample data', poAddrline1:'sample data', poAddrline2:'sample data', poCity:'sample data', poState:'sample data', poDistrict:'sample data', poProvince:'sample data', poCountryCode:'sample data', poSubDivCode:'sample data', poPostalCode:'sample data'};
      service.updateProcGetSubdivAddress(procGetSubdivAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubdivaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetSubdivAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetSubdivAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubdivaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});