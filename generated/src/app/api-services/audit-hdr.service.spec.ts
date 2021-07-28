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

import { AuditHdrService } from './audit-hdr.service';
import { AuditHdr } from '../api-models/audit-hdr.model'
import { AuditHdrs } from "../api-models/testing/fake-audit-hdr.model"

describe('AuditHdrService', () => {
  let injector: TestBed;
  let service: AuditHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuditHdrService]
    });
    injector = getTestBed();
    service = injector.get(AuditHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuditHdrs', () => {
    it('should return an Promise<AuditHdr[]>', () => {
      const auditHdr = [
       {seqAuditId:1234, auditedRecordKey:'sample data', keywordGroup:'sample data', auditedTableName:'sample data', databaseAction:'sample data', modifyingUserId:'sample data', auditTms:'2018-01-01', modifyingProcessId:'sample data', keyword:'sample data'},
       {seqAuditId:1234, auditedRecordKey:'sample data', keywordGroup:'sample data', auditedTableName:'sample data', databaseAction:'sample data', modifyingUserId:'sample data', auditTms:'2018-01-01', modifyingProcessId:'sample data', keyword:'sample data'},
       {seqAuditId:1234, auditedRecordKey:'sample data', keywordGroup:'sample data', auditedTableName:'sample data', databaseAction:'sample data', modifyingUserId:'sample data', auditTms:'2018-01-01', modifyingProcessId:'sample data', keyword:'sample data'}

      ];
      service.getAuditHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/audithdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auditHdr);
    });
  });


  describe('#createAuditHdr', () => {
    var id = 1;
    it('should return an Promise<AuditHdr>', () => {
      const auditHdr: AuditHdr = {seqAuditId:1234, auditedRecordKey:'sample data', keywordGroup:'sample data', auditedTableName:'sample data', databaseAction:'sample data', modifyingUserId:'sample data', auditTms:'2018-01-01', modifyingProcessId:'sample data', keyword:'sample data'};
      service.createAuditHdr(auditHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/audithdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuditHdr', () => {
    var id = 1;
    it('should return an Promise<AuditHdr>', () => {
      const auditHdr: AuditHdr = {seqAuditId:1234, auditedRecordKey:'sample data', keywordGroup:'sample data', auditedTableName:'sample data', databaseAction:'sample data', modifyingUserId:'sample data', auditTms:'2018-01-01', modifyingProcessId:'sample data', keyword:'sample data'};
      service.updateAuditHdr(auditHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/audithdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuditHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuditHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/audithdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});