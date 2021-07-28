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

import { DbColsNotCaseSensitiveService } from './db-cols-not-case-sensitive.service';
import { DbColsNotCaseSensitive } from '../api-models/db-cols-not-case-sensitive.model'
import { DbColsNotCaseSensitives } from "../api-models/testing/fake-db-cols-not-case-sensitive.model"

describe('DbColsNotCaseSensitiveService', () => {
  let injector: TestBed;
  let service: DbColsNotCaseSensitiveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DbColsNotCaseSensitiveService]
    });
    injector = getTestBed();
    service = injector.get(DbColsNotCaseSensitiveService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDbColsNotCaseSensitives', () => {
    it('should return an Promise<DbColsNotCaseSensitive[]>', () => {
      const dbColsNotCaseSensitive = [
       {caseInsensitiveTblNmPk:'sample data', caseInsensitiveColNmPk:'sample data', insertRowTms:'2018-01-01', insertUserSysId:'sample data', insertProcessSysId:'sample data', updateRowTms:'2018-01-01', updateUserSysId:'sample data', updateProcessSysId:'sample data'},
       {caseInsensitiveTblNmPk:'sample data', caseInsensitiveColNmPk:'sample data', insertRowTms:'2018-01-01', insertUserSysId:'sample data', insertProcessSysId:'sample data', updateRowTms:'2018-01-01', updateUserSysId:'sample data', updateProcessSysId:'sample data'},
       {caseInsensitiveTblNmPk:'sample data', caseInsensitiveColNmPk:'sample data', insertRowTms:'2018-01-01', insertUserSysId:'sample data', insertProcessSysId:'sample data', updateRowTms:'2018-01-01', updateUserSysId:'sample data', updateProcessSysId:'sample data'}

      ];
      service.getDbColsNotCaseSensitives().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/dbcolsnotcasesensitives/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(dbColsNotCaseSensitive);
    });
  });


  describe('#createDbColsNotCaseSensitive', () => {
    var id = 1;
    it('should return an Promise<DbColsNotCaseSensitive>', () => {
      const dbColsNotCaseSensitive: DbColsNotCaseSensitive = {caseInsensitiveTblNmPk:'sample data', caseInsensitiveColNmPk:'sample data', insertRowTms:'2018-01-01', insertUserSysId:'sample data', insertProcessSysId:'sample data', updateRowTms:'2018-01-01', updateUserSysId:'sample data', updateProcessSysId:'sample data'};
      service.createDbColsNotCaseSensitive(dbColsNotCaseSensitive).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dbcolsnotcasesensitives`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDbColsNotCaseSensitive', () => {
    var id = 1;
    it('should return an Promise<DbColsNotCaseSensitive>', () => {
      const dbColsNotCaseSensitive: DbColsNotCaseSensitive = {caseInsensitiveTblNmPk:'sample data', caseInsensitiveColNmPk:'sample data', insertRowTms:'2018-01-01', insertUserSysId:'sample data', insertProcessSysId:'sample data', updateRowTms:'2018-01-01', updateUserSysId:'sample data', updateProcessSysId:'sample data'};
      service.updateDbColsNotCaseSensitive(dbColsNotCaseSensitive, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dbcolsnotcasesensitives/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDbColsNotCaseSensitive', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDbColsNotCaseSensitive(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dbcolsnotcasesensitives/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});