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

import { UserDefAttribsTokenService } from './user-def-attribs-token.service';
import { UserDefAttribsToken } from '../api-models/user-def-attribs-token.model'
import { UserDefAttribsTokens } from "../api-models/testing/fake-user-def-attribs-token.model"

describe('UserDefAttribsTokenService', () => {
  let injector: TestBed;
  let service: UserDefAttribsTokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserDefAttribsTokenService]
    });
    injector = getTestBed();
    service = injector.get(UserDefAttribsTokenService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getUserDefAttribsTokens', () => {
    it('should return an Promise<UserDefAttribsToken[]>', () => {
      const userDefAttribsToken = [
       {winId:'sample data', datawindowId:'sample data', columnName:'sample data', languageId:1234, userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {winId:'sample data', datawindowId:'sample data', columnName:'sample data', languageId:1234, userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {winId:'sample data', datawindowId:'sample data', columnName:'sample data', languageId:1234, userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getUserDefAttribsTokens().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/userdefattribstokens/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(userDefAttribsToken);
    });
  });


  describe('#createUserDefAttribsToken', () => {
    var id = 1;
    it('should return an Promise<UserDefAttribsToken>', () => {
      const userDefAttribsToken: UserDefAttribsToken = {winId:'sample data', datawindowId:'sample data', columnName:'sample data', languageId:1234, userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createUserDefAttribsToken(userDefAttribsToken).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefattribstokens`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateUserDefAttribsToken', () => {
    var id = 1;
    it('should return an Promise<UserDefAttribsToken>', () => {
      const userDefAttribsToken: UserDefAttribsToken = {winId:'sample data', datawindowId:'sample data', columnName:'sample data', languageId:1234, userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateUserDefAttribsToken(userDefAttribsToken, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefattribstokens/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteUserDefAttribsToken', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteUserDefAttribsToken(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefattribstokens/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});