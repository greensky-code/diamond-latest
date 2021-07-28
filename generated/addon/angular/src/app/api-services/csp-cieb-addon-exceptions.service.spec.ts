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

import { CspCiebAddonExceptionsService } from './csp-cieb-addon-exceptions.service';
import { CspCiebAddonExceptions } from '../api-models/csp-cieb-addon-exceptions.model'
import { CspCiebAddonException } from "../api-models/testing/fake-csp-cieb-addon-exceptions.model"

describe('CspCiebAddonExceptionsService', () => {
  let injector: TestBed;
  let service: CspCiebAddonExceptionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspCiebAddonExceptionsService]
    });
    injector = getTestBed();
    service = injector.get(CspCiebAddonExceptionsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspCiebAddonException', () => {
    it('should return an Promise<CspCiebAddonExceptions[]>', () => {
      const cspCiebAddonExceptions = [
       {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'},
       {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'},
       {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'}

      ];
      service.getCspCiebAddonException().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspciebaddonexception/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspCiebAddonExceptions);
    });
  });


  describe('#createCspCiebAddonExceptions', () => {
    var id = 1;
    it('should return an Promise<CspCiebAddonExceptions>', () => {
      const cspCiebAddonExceptions: CspCiebAddonExceptions = {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'};
      service.createCspCiebAddonExceptions(cspCiebAddonExceptions).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspciebaddonexception`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspCiebAddonExceptions', () => {
    var id = 1;
    it('should return an Promise<CspCiebAddonExceptions>', () => {
      const cspCiebAddonExceptions: CspCiebAddonExceptions = {pProcedureName:'sample data', pTableName:'sample data', pUserName:'sample data', pOsUserName:'sample data', pErrorCode:'sample data', pErrorMessage:'sample data', pErrorDate:'sample data', pComments:'sample data'};
      service.updateCspCiebAddonExceptions(cspCiebAddonExceptions, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspciebaddonexception/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspCiebAddonExceptions', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspCiebAddonExceptions(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspciebaddonexception/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});