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

import { SecFuncService } from './sec-func.service';
import { SecFunc } from '../api-models/sec-func.model'
import { SecFuncs } from "../api-models/testing/fake-sec-func.model"

describe('SecFuncService', () => {
  let injector: TestBed;
  let service: SecFuncService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecFuncService]
    });
    injector = getTestBed();
    service = injector.get(SecFuncService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecFuncs', () => {
    it('should return an Promise<SecFunc[]>', () => {
      const secFunc = [
       {userId:'sample data', funcId:'sample data', pExe:'sample data', insDt:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {userId:'sample data', funcId:'sample data', pExe:'sample data', insDt:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {userId:'sample data', funcId:'sample data', pExe:'sample data', insDt:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSecFuncs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/secfuncs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secFunc);
    });
  });


  describe('#createSecFunc', () => {
    var id = 1;
    it('should return an Promise<SecFunc>', () => {
      const secFunc: SecFunc = {userId:'sample data', funcId:'sample data', pExe:'sample data', insDt:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSecFunc(secFunc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secfuncs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecFunc', () => {
    var id = 1;
    it('should return an Promise<SecFunc>', () => {
      const secFunc: SecFunc = {userId:'sample data', funcId:'sample data', pExe:'sample data', insDt:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSecFunc(secFunc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secfuncs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecFunc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSecFunc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secfuncs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});