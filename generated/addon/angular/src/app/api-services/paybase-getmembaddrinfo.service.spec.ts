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

import { PaybaseGetmembaddrinfoService } from './paybase-getmembaddrinfo.service';
import { PaybaseGetmembaddrinfo } from '../api-models/paybase-getmembaddrinfo.model'
import { PaybaseGetmembaddrinfos } from "../api-models/testing/fake-paybase-getmembaddrinfo.model"

describe('PaybaseGetmembaddrinfoService', () => {
  let injector: TestBed;
  let service: PaybaseGetmembaddrinfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaybaseGetmembaddrinfoService]
    });
    injector = getTestBed();
    service = injector.get(PaybaseGetmembaddrinfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPaybaseGetmembaddrinfos', () => {
    it('should return an Promise<PaybaseGetmembaddrinfo[]>', () => {
      const paybaseGetmembaddrinfo = [
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data'},
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data'},
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data'}

      ];
      service.getPaybaseGetmembaddrinfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/paybasegetmembaddrinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(paybaseGetmembaddrinfo);
    });
  });


  describe('#createPaybaseGetmembaddrinfo', () => {
    var id = 1;
    it('should return an Promise<PaybaseGetmembaddrinfo>', () => {
      const paybaseGetmembaddrinfo: PaybaseGetmembaddrinfo = {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data'};
      service.createPaybaseGetmembaddrinfo(paybaseGetmembaddrinfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/paybasegetmembaddrinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePaybaseGetmembaddrinfo', () => {
    var id = 1;
    it('should return an Promise<PaybaseGetmembaddrinfo>', () => {
      const paybaseGetmembaddrinfo: PaybaseGetmembaddrinfo = {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data'};
      service.updatePaybaseGetmembaddrinfo(paybaseGetmembaddrinfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/paybasegetmembaddrinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePaybaseGetmembaddrinfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePaybaseGetmembaddrinfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/paybasegetmembaddrinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});