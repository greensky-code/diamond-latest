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

import { FuncIsZipValidService } from './func-is-zip-valid.service';
import { FuncIsZipValid } from '../api-models/func-is-zip-valid.model'
import { FuncIsZipValids } from "../api-models/testing/fake-func-is-zip-valid.model"

describe('FuncIsZipValidService', () => {
  let injector: TestBed;
  let service: FuncIsZipValidService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncIsZipValidService]
    });
    injector = getTestBed();
    service = injector.get(FuncIsZipValidService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncIsZipValids', () => {
    it('should return an Promise<FuncIsZipValid[]>', () => {
      const funcIsZipValid = [
       {pCountryCode:'sample data', pStateCode:'sample data', pZipCode:'sample data'},
       {pCountryCode:'sample data', pStateCode:'sample data', pZipCode:'sample data'},
       {pCountryCode:'sample data', pStateCode:'sample data', pZipCode:'sample data'}

      ];
      service.getFuncIsZipValids().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funciszipvalids/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcIsZipValid);
    });
  });


  describe('#createFuncIsZipValid', () => {
    var id = 1;
    it('should return an Promise<FuncIsZipValid>', () => {
      const funcIsZipValid: FuncIsZipValid = {pCountryCode:'sample data', pStateCode:'sample data', pZipCode:'sample data'};
      service.createFuncIsZipValid(funcIsZipValid).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funciszipvalids`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncIsZipValid', () => {
    var id = 1;
    it('should return an Promise<FuncIsZipValid>', () => {
      const funcIsZipValid: FuncIsZipValid = {pCountryCode:'sample data', pStateCode:'sample data', pZipCode:'sample data'};
      service.updateFuncIsZipValid(funcIsZipValid, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funciszipvalids/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncIsZipValid', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncIsZipValid(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funciszipvalids/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});