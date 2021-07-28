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

import { FuncAbbrvAddresslineService } from './func-abbrv-addressline.service';
import { FuncAbbrvAddressline } from '../api-models/func-abbrv-addressline.model'
import { FuncAbbrvAddresslines } from "../api-models/testing/fake-func-abbrv-addressline.model"

describe('FuncAbbrvAddresslineService', () => {
  let injector: TestBed;
  let service: FuncAbbrvAddresslineService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncAbbrvAddresslineService]
    });
    injector = getTestBed();
    service = injector.get(FuncAbbrvAddresslineService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncAbbrvAddresslines', () => {
    it('should return an Promise<FuncAbbrvAddressline[]>', () => {
      const funcAbbrvAddressline = [
       {pAddress:'sample data', pAddressLength:1234},
       {pAddress:'sample data', pAddressLength:1234},
       {pAddress:'sample data', pAddressLength:1234}

      ];
      service.getFuncAbbrvAddresslines().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcabbrvaddresslines/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcAbbrvAddressline);
    });
  });


  describe('#createFuncAbbrvAddressline', () => {
    var id = 1;
    it('should return an Promise<FuncAbbrvAddressline>', () => {
      const funcAbbrvAddressline: FuncAbbrvAddressline = {pAddress:'sample data', pAddressLength:1234};
      service.createFuncAbbrvAddressline(funcAbbrvAddressline).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcabbrvaddresslines`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncAbbrvAddressline', () => {
    var id = 1;
    it('should return an Promise<FuncAbbrvAddressline>', () => {
      const funcAbbrvAddressline: FuncAbbrvAddressline = {pAddress:'sample data', pAddressLength:1234};
      service.updateFuncAbbrvAddressline(funcAbbrvAddressline, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcabbrvaddresslines/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncAbbrvAddressline', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncAbbrvAddressline(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcabbrvaddresslines/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});