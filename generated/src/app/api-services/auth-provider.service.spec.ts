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

import { AuthProviderService } from './auth-provider.service';
import { AuthProvider } from '../api-models/auth-provider.model'
import { AuthProviders } from "../api-models/testing/fake-auth-provider.model"

describe('AuthProviderService', () => {
  let injector: TestBed;
  let service: AuthProviderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthProviderService]
    });
    injector = getTestBed();
    service = injector.get(AuthProviderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthProviders', () => {
    it('should return an Promise<AuthProvider[]>', () => {
      const authProvider = [
       {authNumber:1234, secondaryAuthNo:'sample data', provCode:'sample data', seqProvId:1234, prevSeqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, outOfNetStatus:'sample data', seqProvxId:1234, seqCovProvGrp:1234, servicePostalCode:'sample data', inAreaServiceStatus:'sample data', provTaxonomyCode:'sample data', seqVendId:1234},
       {authNumber:1234, secondaryAuthNo:'sample data', provCode:'sample data', seqProvId:1234, prevSeqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, outOfNetStatus:'sample data', seqProvxId:1234, seqCovProvGrp:1234, servicePostalCode:'sample data', inAreaServiceStatus:'sample data', provTaxonomyCode:'sample data', seqVendId:1234},
       {authNumber:1234, secondaryAuthNo:'sample data', provCode:'sample data', seqProvId:1234, prevSeqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, outOfNetStatus:'sample data', seqProvxId:1234, seqCovProvGrp:1234, servicePostalCode:'sample data', inAreaServiceStatus:'sample data', provTaxonomyCode:'sample data', seqVendId:1234}

      ];
      service.getAuthProviders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authproviders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authProvider);
    });
  });


  describe('#createAuthProvider', () => {
    var id = 1;
    it('should return an Promise<AuthProvider>', () => {
      const authProvider: AuthProvider = {authNumber:1234, secondaryAuthNo:'sample data', provCode:'sample data', seqProvId:1234, prevSeqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, outOfNetStatus:'sample data', seqProvxId:1234, seqCovProvGrp:1234, servicePostalCode:'sample data', inAreaServiceStatus:'sample data', provTaxonomyCode:'sample data', seqVendId:1234};
      service.createAuthProvider(authProvider).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authproviders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthProvider', () => {
    var id = 1;
    it('should return an Promise<AuthProvider>', () => {
      const authProvider: AuthProvider = {authNumber:1234, secondaryAuthNo:'sample data', provCode:'sample data', seqProvId:1234, prevSeqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, outOfNetStatus:'sample data', seqProvxId:1234, seqCovProvGrp:1234, servicePostalCode:'sample data', inAreaServiceStatus:'sample data', provTaxonomyCode:'sample data', seqVendId:1234};
      service.updateAuthProvider(authProvider, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authproviders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthProvider', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthProvider(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authproviders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});