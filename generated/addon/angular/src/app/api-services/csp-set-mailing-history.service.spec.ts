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

import { CspSetMailingHistoryService } from './csp-set-mailing-history.service';
import { CspSetMailingHistory } from '../api-models/csp-set-mailing-history.model'
import { CspSetMailingHistorys } from "../api-models/testing/fake-csp-set-mailing-history.model"

describe('CspSetMailingHistoryService', () => {
  let injector: TestBed;
  let service: CspSetMailingHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspSetMailingHistoryService]
    });
    injector = getTestBed();
    service = injector.get(CspSetMailingHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspSetMailingHistorys', () => {
    it('should return an Promise<CspSetMailingHistory[]>', () => {
      const cspSetMailingHistory = [
       {pSeqEntityId:1234, pSeqClaimId:1234, pAddrId:1234, pAddrSource:'sample data', pDocCode:'sample data', pTimestamp:'sample data', pCommentDesc:'sample data', pUser:'sample data', pProcess:'sample data'},
       {pSeqEntityId:1234, pSeqClaimId:1234, pAddrId:1234, pAddrSource:'sample data', pDocCode:'sample data', pTimestamp:'sample data', pCommentDesc:'sample data', pUser:'sample data', pProcess:'sample data'},
       {pSeqEntityId:1234, pSeqClaimId:1234, pAddrId:1234, pAddrSource:'sample data', pDocCode:'sample data', pTimestamp:'sample data', pCommentDesc:'sample data', pUser:'sample data', pProcess:'sample data'}

      ];
      service.getCspSetMailingHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspsetmailinghistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspSetMailingHistory);
    });
  });


  describe('#createCspSetMailingHistory', () => {
    var id = 1;
    it('should return an Promise<CspSetMailingHistory>', () => {
      const cspSetMailingHistory: CspSetMailingHistory = {pSeqEntityId:1234, pSeqClaimId:1234, pAddrId:1234, pAddrSource:'sample data', pDocCode:'sample data', pTimestamp:'sample data', pCommentDesc:'sample data', pUser:'sample data', pProcess:'sample data'};
      service.createCspSetMailingHistory(cspSetMailingHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspsetmailinghistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspSetMailingHistory', () => {
    var id = 1;
    it('should return an Promise<CspSetMailingHistory>', () => {
      const cspSetMailingHistory: CspSetMailingHistory = {pSeqEntityId:1234, pSeqClaimId:1234, pAddrId:1234, pAddrSource:'sample data', pDocCode:'sample data', pTimestamp:'sample data', pCommentDesc:'sample data', pUser:'sample data', pProcess:'sample data'};
      service.updateCspSetMailingHistory(cspSetMailingHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspsetmailinghistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspSetMailingHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspSetMailingHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspsetmailinghistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});