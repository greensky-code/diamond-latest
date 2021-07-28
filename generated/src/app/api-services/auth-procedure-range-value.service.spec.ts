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

import { AuthProcedureRangeValueService } from './auth-procedure-range-value.service';
import { AuthProcedureRangeValue } from '../api-models/auth-procedure-range-value.model'
import { AuthProcedureRangeValues } from "../api-models/testing/fake-auth-procedure-range-value.model"

describe('AuthProcedureRangeValueService', () => {
  let injector: TestBed;
  let service: AuthProcedureRangeValueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthProcedureRangeValueService]
    });
    injector = getTestBed();
    service = injector.get(AuthProcedureRangeValueService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthProcedureRangeValues', () => {
    it('should return an Promise<AuthProcedureRangeValue[]>', () => {
      const authProcedureRangeValue = [
       {authProcRangeId:'sample data', fromRange:'sample data', thruRange:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authProcRangeId:'sample data', fromRange:'sample data', thruRange:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authProcRangeId:'sample data', fromRange:'sample data', thruRange:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthProcedureRangeValues().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authprocedurerangevalues/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authProcedureRangeValue);
    });
  });


  describe('#createAuthProcedureRangeValue', () => {
    var id = 1;
    it('should return an Promise<AuthProcedureRangeValue>', () => {
      const authProcedureRangeValue: AuthProcedureRangeValue = {authProcRangeId:'sample data', fromRange:'sample data', thruRange:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthProcedureRangeValue(authProcedureRangeValue).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authprocedurerangevalues`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthProcedureRangeValue', () => {
    var id = 1;
    it('should return an Promise<AuthProcedureRangeValue>', () => {
      const authProcedureRangeValue: AuthProcedureRangeValue = {authProcRangeId:'sample data', fromRange:'sample data', thruRange:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthProcedureRangeValue(authProcedureRangeValue, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authprocedurerangevalues/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthProcedureRangeValue', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthProcedureRangeValue(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authprocedurerangevalues/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});