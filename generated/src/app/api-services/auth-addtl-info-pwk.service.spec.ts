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

import { AuthAddtlInfoPwkService } from './auth-addtl-info-pwk.service';
import { AuthAddtlInfoPwk } from '../api-models/auth-addtl-info-pwk.model'
import { AuthAddtlInfoPwks } from "../api-models/testing/fake-auth-addtl-info-pwk.model"

describe('AuthAddtlInfoPwkService', () => {
  let injector: TestBed;
  let service: AuthAddtlInfoPwkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthAddtlInfoPwkService]
    });
    injector = getTestBed();
    service = injector.get(AuthAddtlInfoPwkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthAddtlInfoPwks', () => {
    it('should return an Promise<AuthAddtlInfoPwk[]>', () => {
      const authAddtlInfoPwk = [
       {seqAuthAddtlInfoPwk:1234, authNumber:1234, secondaryAuthNo:'sample data', seqAuthProcId:1234, respReqFlg:'sample data', processStatus:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAuthAddtlInfoPwk:1234, authNumber:1234, secondaryAuthNo:'sample data', seqAuthProcId:1234, respReqFlg:'sample data', processStatus:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAuthAddtlInfoPwk:1234, authNumber:1234, secondaryAuthNo:'sample data', seqAuthProcId:1234, respReqFlg:'sample data', processStatus:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthAddtlInfoPwks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authaddtlinfopwks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authAddtlInfoPwk);
    });
  });


  describe('#createAuthAddtlInfoPwk', () => {
    var id = 1;
    it('should return an Promise<AuthAddtlInfoPwk>', () => {
      const authAddtlInfoPwk: AuthAddtlInfoPwk = {seqAuthAddtlInfoPwk:1234, authNumber:1234, secondaryAuthNo:'sample data', seqAuthProcId:1234, respReqFlg:'sample data', processStatus:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthAddtlInfoPwk(authAddtlInfoPwk).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authaddtlinfopwks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthAddtlInfoPwk', () => {
    var id = 1;
    it('should return an Promise<AuthAddtlInfoPwk>', () => {
      const authAddtlInfoPwk: AuthAddtlInfoPwk = {seqAuthAddtlInfoPwk:1234, authNumber:1234, secondaryAuthNo:'sample data', seqAuthProcId:1234, respReqFlg:'sample data', processStatus:'sample data', rptTypeCode:'sample data', transCode:'sample data', ctrlNo:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthAddtlInfoPwk(authAddtlInfoPwk, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authaddtlinfopwks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthAddtlInfoPwk', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthAddtlInfoPwk(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authaddtlinfopwks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});