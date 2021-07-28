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

import { AuditDeleteDtlService } from './audit-delete-dtl.service';
import { AuditDeleteDtl } from '../api-models/audit-delete-dtl.model'
import { AuditDeleteDtls } from "../api-models/testing/fake-audit-delete-dtl.model"

describe('AuditDeleteDtlService', () => {
  let injector: TestBed;
  let service: AuditDeleteDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuditDeleteDtlService]
    });
    injector = getTestBed();
    service = injector.get(AuditDeleteDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuditDeleteDtls', () => {
    it('should return an Promise<AuditDeleteDtl[]>', () => {
      const auditDeleteDtl = [
       {seqAuditId:1234, segmentCnt:1234, segmentData:'sample data'},
       {seqAuditId:1234, segmentCnt:1234, segmentData:'sample data'},
       {seqAuditId:1234, segmentCnt:1234, segmentData:'sample data'}

      ];
      service.getAuditDeleteDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auditdeletedtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auditDeleteDtl);
    });
  });


  describe('#createAuditDeleteDtl', () => {
    var id = 1;
    it('should return an Promise<AuditDeleteDtl>', () => {
      const auditDeleteDtl: AuditDeleteDtl = {seqAuditId:1234, segmentCnt:1234, segmentData:'sample data'};
      service.createAuditDeleteDtl(auditDeleteDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditdeletedtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuditDeleteDtl', () => {
    var id = 1;
    it('should return an Promise<AuditDeleteDtl>', () => {
      const auditDeleteDtl: AuditDeleteDtl = {seqAuditId:1234, segmentCnt:1234, segmentData:'sample data'};
      service.updateAuditDeleteDtl(auditDeleteDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditdeletedtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuditDeleteDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuditDeleteDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditdeletedtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});