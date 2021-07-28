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

import { ProcGetAddressService } from './proc-get-address.service';
import { ProcGetAddress } from '../api-models/proc-get-address.model'
import { ProcGetAddresses } from "../api-models/testing/fake-proc-get-address.model"

describe('ProcGetAddressService', () => {
  let injector: TestBed;
  let service: ProcGetAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetAddressService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetAddresses', () => {
    it('should return an Promise<ProcGetAddress[]>', () => {
      const procGetAddress = [
       {pSeqMembId:1234, pSeqSubsId:1234, pSubInd:'sample data', pRestrictInd:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', pAddressError:'sample data', pFalloutReason:'sample data'},
       {pSeqMembId:1234, pSeqSubsId:1234, pSubInd:'sample data', pRestrictInd:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', pAddressError:'sample data', pFalloutReason:'sample data'},
       {pSeqMembId:1234, pSeqSubsId:1234, pSubInd:'sample data', pRestrictInd:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', pAddressError:'sample data', pFalloutReason:'sample data'}

      ];
      service.getProcGetAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetAddress);
    });
  });


  describe('#createProcGetAddress', () => {
    var id = 1;
    it('should return an Promise<ProcGetAddress>', () => {
      const procGetAddress: ProcGetAddress = {pSeqMembId:1234, pSeqSubsId:1234, pSubInd:'sample data', pRestrictInd:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', pAddressError:'sample data', pFalloutReason:'sample data'};
      service.createProcGetAddress(procGetAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetAddress', () => {
    var id = 1;
    it('should return an Promise<ProcGetAddress>', () => {
      const procGetAddress: ProcGetAddress = {pSeqMembId:1234, pSeqSubsId:1234, pSubInd:'sample data', pRestrictInd:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipcode:'sample data', pAddressError:'sample data', pFalloutReason:'sample data'};
      service.updateProcGetAddress(procGetAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});