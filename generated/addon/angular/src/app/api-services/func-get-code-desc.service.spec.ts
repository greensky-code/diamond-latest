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

import { FuncGetCodeDescService } from './func-get-code-desc.service';
import { FuncGetCodeDesc } from '../api-models/func-get-code-desc.model'
import { FuncGetCodeDescs } from "../api-models/testing/fake-func-get-code-desc.model"

describe('FuncGetCodeDescService', () => {
  let injector: TestBed;
  let service: FuncGetCodeDescService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetCodeDescService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetCodeDescService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetCodeDescs', () => {
    it('should return an Promise<FuncGetCodeDesc[]>', () => {
      const funcGetCodeDesc = [
       {pCode:'sample data', pCodeType:'sample data'},
       {pCode:'sample data', pCodeType:'sample data'},
       {pCode:'sample data', pCodeType:'sample data'}

      ];
      service.getFuncGetCodeDescs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetcodedescs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetCodeDesc);
    });
  });


  describe('#createFuncGetCodeDesc', () => {
    var id = 1;
    it('should return an Promise<FuncGetCodeDesc>', () => {
      const funcGetCodeDesc: FuncGetCodeDesc = {pCode:'sample data', pCodeType:'sample data'};
      service.createFuncGetCodeDesc(funcGetCodeDesc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetcodedescs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetCodeDesc', () => {
    var id = 1;
    it('should return an Promise<FuncGetCodeDesc>', () => {
      const funcGetCodeDesc: FuncGetCodeDesc = {pCode:'sample data', pCodeType:'sample data'};
      service.updateFuncGetCodeDesc(funcGetCodeDesc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetcodedescs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetCodeDesc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetCodeDesc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetcodedescs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});