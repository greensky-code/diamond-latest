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

import { AuthTypeMasterService } from './auth-type-master.service';
import { AuthTypeMaster } from '../api-models/auth-type-master.model'
import { AuthTypeMasters } from "../api-models/testing/fake-auth-type-master.model"

describe('AuthTypeMasterService', () => {
  let injector: TestBed;
  let service: AuthTypeMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthTypeMasterService]
    });
    injector = getTestBed();
    service = injector.get(AuthTypeMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthTypeMasters', () => {
    it('should return an Promise<AuthTypeMaster[]>', () => {
      const authTypeMaster = [
       {seqAuthType:1234, authType:'sample data', description:'sample data', requestNextReviewDate:'sample data', allowNonSystemSubscriberId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authExpUpdFlg:'sample data', useQuantityMatch:'sample data'},
       {seqAuthType:1234, authType:'sample data', description:'sample data', requestNextReviewDate:'sample data', allowNonSystemSubscriberId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authExpUpdFlg:'sample data', useQuantityMatch:'sample data'},
       {seqAuthType:1234, authType:'sample data', description:'sample data', requestNextReviewDate:'sample data', allowNonSystemSubscriberId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authExpUpdFlg:'sample data', useQuantityMatch:'sample data'}

      ];
      service.getAuthTypeMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authtypemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authTypeMaster);
    });
  });


  describe('#createAuthTypeMaster', () => {
    var id = 1;
    it('should return an Promise<AuthTypeMaster>', () => {
      const authTypeMaster: AuthTypeMaster = {seqAuthType:1234, authType:'sample data', description:'sample data', requestNextReviewDate:'sample data', allowNonSystemSubscriberId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authExpUpdFlg:'sample data', useQuantityMatch:'sample data'};
      service.createAuthTypeMaster(authTypeMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authtypemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthTypeMaster', () => {
    var id = 1;
    it('should return an Promise<AuthTypeMaster>', () => {
      const authTypeMaster: AuthTypeMaster = {seqAuthType:1234, authType:'sample data', description:'sample data', requestNextReviewDate:'sample data', allowNonSystemSubscriberId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', authExpUpdFlg:'sample data', useQuantityMatch:'sample data'};
      service.updateAuthTypeMaster(authTypeMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authtypemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthTypeMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthTypeMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authtypemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});