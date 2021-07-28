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

import { AuditKeywordTableService } from './audit-keyword-table.service';
import { AuditKeywordTable } from '../api-models/audit-keyword-table.model'
import { AuditKeywordTables } from "../api-models/testing/fake-audit-keyword-table.model"

describe('AuditKeywordTableService', () => {
  let injector: TestBed;
  let service: AuditKeywordTableService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuditKeywordTableService]
    });
    injector = getTestBed();
    service = injector.get(AuditKeywordTableService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuditKeywordTables', () => {
    it('should return an Promise<AuditKeywordTable[]>', () => {
      const auditKeywordTable = [
       {keyword:'sample data', tableName:'sample data'},
       {keyword:'sample data', tableName:'sample data'},
       {keyword:'sample data', tableName:'sample data'}

      ];
      service.getAuditKeywordTables().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auditkeywordtables/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auditKeywordTable);
    });
  });


  describe('#createAuditKeywordTable', () => {
    var id = 1;
    it('should return an Promise<AuditKeywordTable>', () => {
      const auditKeywordTable: AuditKeywordTable = {keyword:'sample data', tableName:'sample data'};
      service.createAuditKeywordTable(auditKeywordTable).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditkeywordtables`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuditKeywordTable', () => {
    var id = 1;
    it('should return an Promise<AuditKeywordTable>', () => {
      const auditKeywordTable: AuditKeywordTable = {keyword:'sample data', tableName:'sample data'};
      service.updateAuditKeywordTable(auditKeywordTable, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditkeywordtables/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuditKeywordTable', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuditKeywordTable(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditkeywordtables/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});