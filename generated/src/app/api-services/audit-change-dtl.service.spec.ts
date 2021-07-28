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

import { AuditChangeDtlService } from './audit-change-dtl.service';
import { AuditChangeDtl } from '../api-models/audit-change-dtl.model'
import { AuditChangeDtls } from "../api-models/testing/fake-audit-change-dtl.model"

describe('AuditChangeDtlService', () => {
  let injector: TestBed;
  let service: AuditChangeDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuditChangeDtlService]
    });
    injector = getTestBed();
    service = injector.get(AuditChangeDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuditChangeDtls', () => {
    it('should return an Promise<AuditChangeDtl[]>', () => {
      const auditChangeDtl = [
       {seqAuditId:1234, auditedColumnName:'sample data', previousValue:'sample data', currentValue:'sample data'},
       {seqAuditId:1234, auditedColumnName:'sample data', previousValue:'sample data', currentValue:'sample data'},
       {seqAuditId:1234, auditedColumnName:'sample data', previousValue:'sample data', currentValue:'sample data'}

      ];
      service.getAuditChangeDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auditchangedtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auditChangeDtl);
    });
  });


  describe('#createAuditChangeDtl', () => {
    var id = 1;
    it('should return an Promise<AuditChangeDtl>', () => {
      const auditChangeDtl: AuditChangeDtl = {seqAuditId:1234, auditedColumnName:'sample data', previousValue:'sample data', currentValue:'sample data'};
      service.createAuditChangeDtl(auditChangeDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditchangedtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuditChangeDtl', () => {
    var id = 1;
    it('should return an Promise<AuditChangeDtl>', () => {
      const auditChangeDtl: AuditChangeDtl = {seqAuditId:1234, auditedColumnName:'sample data', previousValue:'sample data', currentValue:'sample data'};
      service.updateAuditChangeDtl(auditChangeDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditchangedtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuditChangeDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuditChangeDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditchangedtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});