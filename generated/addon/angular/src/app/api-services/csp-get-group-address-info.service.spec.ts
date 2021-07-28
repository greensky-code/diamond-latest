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

import { CspGetGroupAddressInfoService } from './csp-get-group-address-info.service';
import { CspGetGroupAddressInfo } from '../api-models/csp-get-group-address-info.model'
import { CspGetGroupAddressInfos } from "../api-models/testing/fake-csp-get-group-address-info.model"

describe('CspGetGroupAddressInfoService', () => {
  let injector: TestBed;
  let service: CspGetGroupAddressInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetGroupAddressInfoService]
    });
    injector = getTestBed();
    service = injector.get(CspGetGroupAddressInfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetGroupAddressInfos', () => {
    it('should return an Promise<CspGetGroupAddressInfo[]>', () => {
      const cspGetGroupAddressInfo = [
       {pSeqGroupId:1234, pAddressLine1:'sample data', pAddressLine2:'sample data', pCity:'sample data', pState:'sample data', pZipCode:'sample data', pCountry:'sample data'},
       {pSeqGroupId:1234, pAddressLine1:'sample data', pAddressLine2:'sample data', pCity:'sample data', pState:'sample data', pZipCode:'sample data', pCountry:'sample data'},
       {pSeqGroupId:1234, pAddressLine1:'sample data', pAddressLine2:'sample data', pCity:'sample data', pState:'sample data', pZipCode:'sample data', pCountry:'sample data'}

      ];
      service.getCspGetGroupAddressInfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetgroupaddressinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetGroupAddressInfo);
    });
  });


  describe('#createCspGetGroupAddressInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetGroupAddressInfo>', () => {
      const cspGetGroupAddressInfo: CspGetGroupAddressInfo = {pSeqGroupId:1234, pAddressLine1:'sample data', pAddressLine2:'sample data', pCity:'sample data', pState:'sample data', pZipCode:'sample data', pCountry:'sample data'};
      service.createCspGetGroupAddressInfo(cspGetGroupAddressInfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetgroupaddressinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetGroupAddressInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetGroupAddressInfo>', () => {
      const cspGetGroupAddressInfo: CspGetGroupAddressInfo = {pSeqGroupId:1234, pAddressLine1:'sample data', pAddressLine2:'sample data', pCity:'sample data', pState:'sample data', pZipCode:'sample data', pCountry:'sample data'};
      service.updateCspGetGroupAddressInfo(cspGetGroupAddressInfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetgroupaddressinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetGroupAddressInfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetGroupAddressInfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetgroupaddressinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});