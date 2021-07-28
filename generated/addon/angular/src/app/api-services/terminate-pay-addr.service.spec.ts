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

import { TerminatePayAddrService } from './terminate-pay-addr.service';
import { TerminatePayAddr } from '../api-models/terminate-pay-addr.model'
import { TerminatePayAddrs } from "../api-models/testing/fake-terminate-pay-addr.model"

describe('TerminatePayAddrService', () => {
  let injector: TestBed;
  let service: TerminatePayAddrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TerminatePayAddrService]
    });
    injector = getTestBed();
    service = injector.get(TerminatePayAddrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getTerminatePayAddrs', () => {
    it('should return an Promise<TerminatePayAddr[]>', () => {
      const terminatePayAddr = [
       {pSeqEntityId:1234, pEntityCode:'sample data', pTermDate:'sample data'},
       {pSeqEntityId:1234, pEntityCode:'sample data', pTermDate:'sample data'},
       {pSeqEntityId:1234, pEntityCode:'sample data', pTermDate:'sample data'}

      ];
      service.getTerminatePayAddrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/terminatepayaddrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(terminatePayAddr);
    });
  });


  describe('#createTerminatePayAddr', () => {
    var id = 1;
    it('should return an Promise<TerminatePayAddr>', () => {
      const terminatePayAddr: TerminatePayAddr = {pSeqEntityId:1234, pEntityCode:'sample data', pTermDate:'sample data'};
      service.createTerminatePayAddr(terminatePayAddr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/terminatepayaddrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateTerminatePayAddr', () => {
    var id = 1;
    it('should return an Promise<TerminatePayAddr>', () => {
      const terminatePayAddr: TerminatePayAddr = {pSeqEntityId:1234, pEntityCode:'sample data', pTermDate:'sample data'};
      service.updateTerminatePayAddr(terminatePayAddr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/terminatepayaddrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteTerminatePayAddr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteTerminatePayAddr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/terminatepayaddrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});