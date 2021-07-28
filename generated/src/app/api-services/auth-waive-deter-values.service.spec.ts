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

import { AuthWaiveDeterValuesService } from './auth-waive-deter-values.service';
import { AuthWaiveDeterValues } from '../api-models/auth-waive-deter-values.model'
import { AuthWaiveDeterValueses } from "../api-models/testing/fake-auth-waive-deter-values.model"

describe('AuthWaiveDeterValuesService', () => {
  let injector: TestBed;
  let service: AuthWaiveDeterValuesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthWaiveDeterValuesService]
    });
    injector = getTestBed();
    service = injector.get(AuthWaiveDeterValuesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthWaiveDeterValueses', () => {
    it('should return an Promise<AuthWaiveDeterValues[]>', () => {
      const authWaiveDeterValues = [
       {seqAwRule:1234, searchSequence:1234, determinantSequence:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAwRule:1234, searchSequence:1234, determinantSequence:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAwRule:1234, searchSequence:1234, determinantSequence:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthWaiveDeterValueses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authwaivedetervalueses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authWaiveDeterValues);
    });
  });


  describe('#createAuthWaiveDeterValues', () => {
    var id = 1;
    it('should return an Promise<AuthWaiveDeterValues>', () => {
      const authWaiveDeterValues: AuthWaiveDeterValues = {seqAwRule:1234, searchSequence:1234, determinantSequence:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthWaiveDeterValues(authWaiveDeterValues).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authwaivedetervalueses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthWaiveDeterValues', () => {
    var id = 1;
    it('should return an Promise<AuthWaiveDeterValues>', () => {
      const authWaiveDeterValues: AuthWaiveDeterValues = {seqAwRule:1234, searchSequence:1234, determinantSequence:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthWaiveDeterValues(authWaiveDeterValues, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authwaivedetervalueses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthWaiveDeterValues', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthWaiveDeterValues(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authwaivedetervalueses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});