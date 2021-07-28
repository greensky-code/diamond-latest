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

import { FuncGetMessageDescService } from './func-get-message-desc.service';
import { FuncGetMessageDesc } from '../api-models/func-get-message-desc.model'
import { FuncGetMessageDescs } from "../api-models/testing/fake-func-get-message-desc.model"

describe('FuncGetMessageDescService', () => {
  let injector: TestBed;
  let service: FuncGetMessageDescService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetMessageDescService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetMessageDescService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetMessageDescs', () => {
    it('should return an Promise<FuncGetMessageDesc[]>', () => {
      const funcGetMessageDesc = [
       {pErrCode:'sample data'},
       {pErrCode:'sample data'},
       {pErrCode:'sample data'}

      ];
      service.getFuncGetMessageDescs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetmessagedescs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetMessageDesc);
    });
  });


  describe('#createFuncGetMessageDesc', () => {
    var id = 1;
    it('should return an Promise<FuncGetMessageDesc>', () => {
      const funcGetMessageDesc: FuncGetMessageDesc = {pErrCode:'sample data'};
      service.createFuncGetMessageDesc(funcGetMessageDesc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetmessagedescs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetMessageDesc', () => {
    var id = 1;
    it('should return an Promise<FuncGetMessageDesc>', () => {
      const funcGetMessageDesc: FuncGetMessageDesc = {pErrCode:'sample data'};
      service.updateFuncGetMessageDesc(funcGetMessageDesc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetmessagedescs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetMessageDesc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetMessageDesc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetmessagedescs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});