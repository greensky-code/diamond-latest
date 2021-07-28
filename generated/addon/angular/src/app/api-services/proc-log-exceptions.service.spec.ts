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

import { ProcLogExceptionsService } from './proc-log-exceptions.service';
import { ProcLogExceptions } from '../api-models/proc-log-exceptions.model'
import { ProcLogException } from "../api-models/testing/fake-proc-log-exceptions.model"

describe('ProcLogExceptionsService', () => {
  let injector: TestBed;
  let service: ProcLogExceptionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcLogExceptionsService]
    });
    injector = getTestBed();
    service = injector.get(ProcLogExceptionsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcLogException', () => {
    it('should return an Promise<ProcLogExceptions[]>', () => {
      const procLogExceptions = [
       {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'},
       {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'},
       {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'}

      ];
      service.getProcLogException().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/proclogexception/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procLogExceptions);
    });
  });


  describe('#createProcLogExceptions', () => {
    var id = 1;
    it('should return an Promise<ProcLogExceptions>', () => {
      const procLogExceptions: ProcLogExceptions = {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'};
      service.createProcLogExceptions(procLogExceptions).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proclogexception`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcLogExceptions', () => {
    var id = 1;
    it('should return an Promise<ProcLogExceptions>', () => {
      const procLogExceptions: ProcLogExceptions = {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'};
      service.updateProcLogExceptions(procLogExceptions, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proclogexception/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcLogExceptions', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcLogExceptions(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proclogexception/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});