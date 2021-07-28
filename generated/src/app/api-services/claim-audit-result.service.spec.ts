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

import { ClaimAuditResultService } from './claim-audit-result.service';
import { ClaimAuditResult } from '../api-models/claim-audit-result.model'
import { ClaimAuditResults } from "../api-models/testing/fake-claim-audit-result.model"

describe('ClaimAuditResultService', () => {
  let injector: TestBed;
  let service: ClaimAuditResultService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimAuditResultService]
    });
    injector = getTestBed();
    service = injector.get(ClaimAuditResultService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimAuditResults', () => {
    it('should return an Promise<ClaimAuditResult[]>', () => {
      const claimAuditResult = [
       {claimResultCode:'sample data', origLineDenyReasn:'sample data', histChangeHoldReasn:'sample data', applySmartSusp:'sample data', smartSuspReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inclSingleLine:'sample data', capStatusAction:'sample data', capStatusReason:'sample data'},
       {claimResultCode:'sample data', origLineDenyReasn:'sample data', histChangeHoldReasn:'sample data', applySmartSusp:'sample data', smartSuspReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inclSingleLine:'sample data', capStatusAction:'sample data', capStatusReason:'sample data'},
       {claimResultCode:'sample data', origLineDenyReasn:'sample data', histChangeHoldReasn:'sample data', applySmartSusp:'sample data', smartSuspReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inclSingleLine:'sample data', capStatusAction:'sample data', capStatusReason:'sample data'}

      ];
      service.getClaimAuditResults().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditresults/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimAuditResult);
    });
  });


  describe('#createClaimAuditResult', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditResult>', () => {
      const claimAuditResult: ClaimAuditResult = {claimResultCode:'sample data', origLineDenyReasn:'sample data', histChangeHoldReasn:'sample data', applySmartSusp:'sample data', smartSuspReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inclSingleLine:'sample data', capStatusAction:'sample data', capStatusReason:'sample data'};
      service.createClaimAuditResult(claimAuditResult).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditresults`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimAuditResult', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditResult>', () => {
      const claimAuditResult: ClaimAuditResult = {claimResultCode:'sample data', origLineDenyReasn:'sample data', histChangeHoldReasn:'sample data', applySmartSusp:'sample data', smartSuspReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', inclSingleLine:'sample data', capStatusAction:'sample data', capStatusReason:'sample data'};
      service.updateClaimAuditResult(claimAuditResult, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditresults/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimAuditResult', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimAuditResult(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditresults/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});