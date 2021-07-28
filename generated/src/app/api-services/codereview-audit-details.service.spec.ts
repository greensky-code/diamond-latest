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

import { CodereviewAuditDetailsService } from './codereview-audit-details.service';
import { CodereviewAuditDetails } from '../api-models/codereview-audit-details.model'
import { CodereviewAuditDetailss } from "../api-models/testing/fake-codereview-audit-details.model"

describe('CodereviewAuditDetailsService', () => {
  let injector: TestBed;
  let service: CodereviewAuditDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CodereviewAuditDetailsService]
    });
    injector = getTestBed();
    service = injector.get(CodereviewAuditDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCodereviewAuditDetailss', () => {
    it('should return an Promise<CodereviewAuditDetails[]>', () => {
      const codereviewAuditDetails = [
       {claimNumber:'sample data', lineNumber:1234, histClaimNumber:'sample data', histLineNumber:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {claimNumber:'sample data', lineNumber:1234, histClaimNumber:'sample data', histLineNumber:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {claimNumber:'sample data', lineNumber:1234, histClaimNumber:'sample data', histLineNumber:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'}

      ];
      service.getCodereviewAuditDetailss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewauditdetailss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(codereviewAuditDetails);
    });
  });


  describe('#createCodereviewAuditDetails', () => {
    var id = 1;
    it('should return an Promise<CodereviewAuditDetails>', () => {
      const codereviewAuditDetails: CodereviewAuditDetails = {claimNumber:'sample data', lineNumber:1234, histClaimNumber:'sample data', histLineNumber:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.createCodereviewAuditDetails(codereviewAuditDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewauditdetailss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCodereviewAuditDetails', () => {
    var id = 1;
    it('should return an Promise<CodereviewAuditDetails>', () => {
      const codereviewAuditDetails: CodereviewAuditDetails = {claimNumber:'sample data', lineNumber:1234, histClaimNumber:'sample data', histLineNumber:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.updateCodereviewAuditDetails(codereviewAuditDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewauditdetailss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCodereviewAuditDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCodereviewAuditDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewauditdetailss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});