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

import { AuthWaiveDeterminantsService } from './auth-waive-determinants.service';
import { AuthWaiveDeterminants } from '../api-models/auth-waive-determinants.model'
import { AuthWaiveDeterminantss } from "../api-models/testing/fake-auth-waive-determinants.model"

describe('AuthWaiveDeterminantsService', () => {
  let injector: TestBed;
  let service: AuthWaiveDeterminantsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthWaiveDeterminantsService]
    });
    injector = getTestBed();
    service = injector.get(AuthWaiveDeterminantsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthWaiveDeterminantss', () => {
    it('should return an Promise<AuthWaiveDeterminants[]>', () => {
      const authWaiveDeterminants = [
       {seqAwRule:1234, searchSequence:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAwRule:1234, searchSequence:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAwRule:1234, searchSequence:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthWaiveDeterminantss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authwaivedeterminantss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authWaiveDeterminants);
    });
  });


  describe('#createAuthWaiveDeterminants', () => {
    var id = 1;
    it('should return an Promise<AuthWaiveDeterminants>', () => {
      const authWaiveDeterminants: AuthWaiveDeterminants = {seqAwRule:1234, searchSequence:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthWaiveDeterminants(authWaiveDeterminants).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authwaivedeterminantss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthWaiveDeterminants', () => {
    var id = 1;
    it('should return an Promise<AuthWaiveDeterminants>', () => {
      const authWaiveDeterminants: AuthWaiveDeterminants = {seqAwRule:1234, searchSequence:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthWaiveDeterminants(authWaiveDeterminants, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authwaivedeterminantss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthWaiveDeterminants', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthWaiveDeterminants(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authwaivedeterminantss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});