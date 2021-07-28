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

import { WorldlinkGetprovaddrinfoService } from './worldlink-getprovaddrinfo.service';
import { WorldlinkGetprovaddrinfo } from '../api-models/worldlink-getprovaddrinfo.model'
import { WorldlinkGetprovaddrinfos } from "../api-models/testing/fake-worldlink-getprovaddrinfo.model"

describe('WorldlinkGetprovaddrinfoService', () => {
  let injector: TestBed;
  let service: WorldlinkGetprovaddrinfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorldlinkGetprovaddrinfoService]
    });
    injector = getTestBed();
    service = injector.get(WorldlinkGetprovaddrinfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getWorldlinkGetprovaddrinfos', () => {
    it('should return an Promise<WorldlinkGetprovaddrinfo[]>', () => {
      const worldlinkGetprovaddrinfo = [
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'},
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'},
       {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'}

      ];
      service.getWorldlinkGetprovaddrinfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/worldlinkgetprovaddrinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(worldlinkGetprovaddrinfo);
    });
  });


  describe('#createWorldlinkGetprovaddrinfo', () => {
    var id = 1;
    it('should return an Promise<WorldlinkGetprovaddrinfo>', () => {
      const worldlinkGetprovaddrinfo: WorldlinkGetprovaddrinfo = {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'};
      service.createWorldlinkGetprovaddrinfo(worldlinkGetprovaddrinfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/worldlinkgetprovaddrinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateWorldlinkGetprovaddrinfo', () => {
    var id = 1;
    it('should return an Promise<WorldlinkGetprovaddrinfo>', () => {
      const worldlinkGetprovaddrinfo: WorldlinkGetprovaddrinfo = {pSeqClaimId:1234, pDocCode:'sample data', pCommentDesc:'sample data', pTimestamp:'sample data', pUser:'sample data', pProcess:'sample data', pPayeeName:'sample data', pAddressLine1:'sample data', pAddressLine2:'sample data', pAddressLine3:'sample data', pCountryCode:'sample data', pBankAddrFlg:'sample data', pRoutingNum:'sample data', pAccountNum:'sample data', pBankName:'sample data'};
      service.updateWorldlinkGetprovaddrinfo(worldlinkGetprovaddrinfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/worldlinkgetprovaddrinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteWorldlinkGetprovaddrinfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteWorldlinkGetprovaddrinfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/worldlinkgetprovaddrinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});