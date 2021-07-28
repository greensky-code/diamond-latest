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

import { WorldlinkGetmembaddrinfoService } from './worldlink-getmembaddrinfo.service';
import { WorldlinkGetmembaddrinfo } from '../api-models/worldlink-getmembaddrinfo.model'
import { WorldlinkGetmembaddrinfos } from "../api-models/testing/fake-worldlink-getmembaddrinfo.model"

describe('WorldlinkGetmembaddrinfoService', () => {
  let injector: TestBed;
  let service: WorldlinkGetmembaddrinfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorldlinkGetmembaddrinfoService]
    });
    injector = getTestBed();
    service = injector.get(WorldlinkGetmembaddrinfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getWorldlinkGetmembaddrinfos', () => {
    it('should return an Promise<WorldlinkGetmembaddrinfo[]>', () => {
      const worldlinkGetmembaddrinfo = [
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data', pAddrId:1234, pAddrSource:'sample data'},
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data', pAddrId:1234, pAddrSource:'sample data'},
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data', pAddrId:1234, pAddrSource:'sample data'}

      ];
      service.getWorldlinkGetmembaddrinfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/worldlinkgetmembaddrinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(worldlinkGetmembaddrinfo);
    });
  });


  describe('#createWorldlinkGetmembaddrinfo', () => {
    var id = 1;
    it('should return an Promise<WorldlinkGetmembaddrinfo>', () => {
      const worldlinkGetmembaddrinfo: WorldlinkGetmembaddrinfo = {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data', pAddrId:1234, pAddrSource:'sample data'};
      service.createWorldlinkGetmembaddrinfo(worldlinkGetmembaddrinfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/worldlinkgetmembaddrinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateWorldlinkGetmembaddrinfo', () => {
    var id = 1;
    it('should return an Promise<WorldlinkGetmembaddrinfo>', () => {
      const worldlinkGetmembaddrinfo: WorldlinkGetmembaddrinfo = {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pAddressLine4:'sample data', pAddressLine5:'sample data', pAddressLine6:'sample data', pAddressLine7:'sample data', pAddressLine8:'sample data', pBankName:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankAccountCode:'sample data', pEftStatusCode:'sample data', pPaymentAdviceCode:'sample data', pEmailAddress:'sample data', pFaxNum:'sample data', pPaymentCode:'sample data', pCountryCode:'sample data', pPayeeName:'sample data', pAddrId:1234, pAddrSource:'sample data'};
      service.updateWorldlinkGetmembaddrinfo(worldlinkGetmembaddrinfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/worldlinkgetmembaddrinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteWorldlinkGetmembaddrinfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteWorldlinkGetmembaddrinfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/worldlinkgetmembaddrinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});