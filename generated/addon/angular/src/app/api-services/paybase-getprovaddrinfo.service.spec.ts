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

import { PaybaseGetprovaddrinfoService } from './paybase-getprovaddrinfo.service';
import { PaybaseGetprovaddrinfo } from '../api-models/paybase-getprovaddrinfo.model'
import { PaybaseGetprovaddrinfos } from "../api-models/testing/fake-paybase-getprovaddrinfo.model"

describe('PaybaseGetprovaddrinfoService', () => {
  let injector: TestBed;
  let service: PaybaseGetprovaddrinfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaybaseGetprovaddrinfoService]
    });
    injector = getTestBed();
    service = injector.get(PaybaseGetprovaddrinfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPaybaseGetprovaddrinfos', () => {
    it('should return an Promise<PaybaseGetprovaddrinfo[]>', () => {
      const paybaseGetprovaddrinfo = [
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'},
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'},
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'}

      ];
      service.getPaybaseGetprovaddrinfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/paybasegetprovaddrinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(paybaseGetprovaddrinfo);
    });
  });


  describe('#createPaybaseGetprovaddrinfo', () => {
    var id = 1;
    it('should return an Promise<PaybaseGetprovaddrinfo>', () => {
      const paybaseGetprovaddrinfo: PaybaseGetprovaddrinfo = {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'};
      service.createPaybaseGetprovaddrinfo(paybaseGetprovaddrinfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/paybasegetprovaddrinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePaybaseGetprovaddrinfo', () => {
    var id = 1;
    it('should return an Promise<PaybaseGetprovaddrinfo>', () => {
      const paybaseGetprovaddrinfo: PaybaseGetprovaddrinfo = {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'};
      service.updatePaybaseGetprovaddrinfo(paybaseGetprovaddrinfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/paybasegetprovaddrinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePaybaseGetprovaddrinfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePaybaseGetprovaddrinfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/paybasegetprovaddrinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});