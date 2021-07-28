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

import { DddwDtlService } from './dddw-dtl.service';
import { DddwDtl } from '../api-models/dddw-dtl.model'
import { DddwDtls } from "../api-models/testing/fake-dddw-dtl.model"

describe('DddwDtlService', () => {
  let injector: TestBed;
  let service: DddwDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DddwDtlService]
    });
    injector = getTestBed();
    service = injector.get(DddwDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDddwDtls', () => {
    it('should return an Promise<DddwDtl[]>', () => {
      const dddwDtl = [
       {dwName:'sample data', columnName:'sample data', displayVal:'sample data', dataVal:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {dwName:'sample data', columnName:'sample data', displayVal:'sample data', dataVal:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {dwName:'sample data', columnName:'sample data', displayVal:'sample data', dataVal:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getDddwDtls().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/dddwdtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(dddwDtl);
    });
  });


  describe('#createDddwDtl', () => {
    var id = 1;
    it('should return an Promise<DddwDtl>', () => {
      const dddwDtl: DddwDtl = {dwName:'sample data', columnName:'sample data', displayVal:'sample data', dataVal:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createDddwDtl(dddwDtl).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dddwdtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDddwDtl', () => {
    var id = 1;
    it('should return an Promise<DddwDtl>', () => {
      const dddwDtl: DddwDtl = {dwName:'sample data', columnName:'sample data', displayVal:'sample data', dataVal:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateDddwDtl(dddwDtl, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dddwdtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDddwDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDddwDtl(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dddwdtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});