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

import { SecFuncDescrService } from './sec-func-descr.service';
import { SecFuncDescr } from '../api-models/sec-func-descr.model'
import { SecFuncDescrs } from "../api-models/testing/fake-sec-func-descr.model"

describe('SecFuncDescrService', () => {
  let injector: TestBed;
  let service: SecFuncDescrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecFuncDescrService]
    });
    injector = getTestBed();
    service = injector.get(SecFuncDescrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecFuncDescrs', () => {
    it('should return an Promise<SecFuncDescr[]>', () => {
      const secFuncDescr = [
       {funcId:'sample data', sdescr:'sample data', ldescr:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {funcId:'sample data', sdescr:'sample data', ldescr:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {funcId:'sample data', sdescr:'sample data', ldescr:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSecFuncDescrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/secfuncdescrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secFuncDescr);
    });
  });


  describe('#createSecFuncDescr', () => {
    var id = 1;
    it('should return an Promise<SecFuncDescr>', () => {
      const secFuncDescr: SecFuncDescr = {funcId:'sample data', sdescr:'sample data', ldescr:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSecFuncDescr(secFuncDescr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secfuncdescrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecFuncDescr', () => {
    var id = 1;
    it('should return an Promise<SecFuncDescr>', () => {
      const secFuncDescr: SecFuncDescr = {funcId:'sample data', sdescr:'sample data', ldescr:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSecFuncDescr(secFuncDescr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secfuncdescrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecFuncDescr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSecFuncDescr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secfuncdescrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});