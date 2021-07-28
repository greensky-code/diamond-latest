/* Copyright (c) 2020 . All Rights Reserved. */

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

import { ClaimAuditResultDetailService } from './claim-audit-result-detail.service';
import { ClaimAuditResultDetail } from '../api-models/claim-audit-result-detail.model'
import { ClaimAuditResultDetails } from "../api-models/testing/fake-claim-audit-result-detail.model"

describe('ClaimAuditResultDetailService', () => {
  let injector: TestBed;
  let service: ClaimAuditResultDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimAuditResultDetailService]
    });
    injector = getTestBed();
    service = injector.get(ClaimAuditResultDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimAuditResultDetails', () => {
    it('should return an Promise<ClaimAuditResultDetail[]>', () => {
      const claimAuditResultDetail = [
       {claimResultCode:'sample data', editType:'sample data', editValue:'sample data', editOrder:1234, codeOrigination:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {claimResultCode:'sample data', editType:'sample data', editValue:'sample data', editOrder:1234, codeOrigination:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {claimResultCode:'sample data', editType:'sample data', editValue:'sample data', editOrder:1234, codeOrigination:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getClaimAuditResultDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditresultdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimAuditResultDetail);
    });
  });


  describe('#createClaimAuditResultDetail', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditResultDetail>', () => {
      const claimAuditResultDetail: ClaimAuditResultDetail = {claimResultCode:'sample data', editType:'sample data', editValue:'sample data', editOrder:1234, codeOrigination:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createClaimAuditResultDetail(claimAuditResultDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditresultdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimAuditResultDetail', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditResultDetail>', () => {
      const claimAuditResultDetail: ClaimAuditResultDetail = {claimResultCode:'sample data', editType:'sample data', editValue:'sample data', editOrder:1234, codeOrigination:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateClaimAuditResultDetail(claimAuditResultDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditresultdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimAuditResultDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimAuditResultDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditresultdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});