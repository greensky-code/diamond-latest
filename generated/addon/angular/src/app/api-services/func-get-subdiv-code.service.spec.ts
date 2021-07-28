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

import { FuncGetSubdivCodeService } from './func-get-subdiv-code.service';
import { FuncGetSubdivCode } from '../api-models/func-get-subdiv-code.model'
import { FuncGetSubdivCodes } from "../api-models/testing/fake-func-get-subdiv-code.model"

describe('FuncGetSubdivCodeService', () => {
  let injector: TestBed;
  let service: FuncGetSubdivCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetSubdivCodeService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetSubdivCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetSubdivCodes', () => {
    it('should return an Promise<FuncGetSubdivCode[]>', () => {
      const funcGetSubdivCode = [
       {pSubscriberId:'sample data'},
       {pSubscriberId:'sample data'},
       {pSubscriberId:'sample data'}

      ];
      service.getFuncGetSubdivCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsubdivcodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetSubdivCode);
    });
  });


  describe('#createFuncGetSubdivCode', () => {
    var id = 1;
    it('should return an Promise<FuncGetSubdivCode>', () => {
      const funcGetSubdivCode: FuncGetSubdivCode = {pSubscriberId:'sample data'};
      service.createFuncGetSubdivCode(funcGetSubdivCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsubdivcodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetSubdivCode', () => {
    var id = 1;
    it('should return an Promise<FuncGetSubdivCode>', () => {
      const funcGetSubdivCode: FuncGetSubdivCode = {pSubscriberId:'sample data'};
      service.updateFuncGetSubdivCode(funcGetSubdivCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsubdivcodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetSubdivCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetSubdivCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsubdivcodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});