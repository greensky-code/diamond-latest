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

import { UserDefinedTextService } from './user-defined-text.service';
import { UserDefinedText } from '../api-models/user-defined-text.model'
import { UserDefinedTexts } from "../api-models/testing/fake-user-defined-text.model"

describe('UserDefinedTextService', () => {
  let injector: TestBed;
  let service: UserDefinedTextService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserDefinedTextService]
    });
    injector = getTestBed();
    service = injector.get(UserDefinedTextService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getUserDefinedTexts', () => {
    it('should return an Promise<UserDefinedText[]>', () => {
      const userDefinedText = [
       {winId:'sample data', datawindowId:'sample data', userDefineTextName:'sample data', userDefineText:'sample data', userDefineName:'sample data', userDefineRequired:'sample data', maxLen:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234, userDefineValidateFlag:'sample data', validatedTableName:'sample data', validatedColumnName:'sample data'},
       {winId:'sample data', datawindowId:'sample data', userDefineTextName:'sample data', userDefineText:'sample data', userDefineName:'sample data', userDefineRequired:'sample data', maxLen:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234, userDefineValidateFlag:'sample data', validatedTableName:'sample data', validatedColumnName:'sample data'},
       {winId:'sample data', datawindowId:'sample data', userDefineTextName:'sample data', userDefineText:'sample data', userDefineName:'sample data', userDefineRequired:'sample data', maxLen:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234, userDefineValidateFlag:'sample data', validatedTableName:'sample data', validatedColumnName:'sample data'}

      ];
      service.getUserDefinedTexts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedtexts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(userDefinedText);
    });
  });


  describe('#createUserDefinedText', () => {
    var id = 1;
    it('should return an Promise<UserDefinedText>', () => {
      const userDefinedText: UserDefinedText = {winId:'sample data', datawindowId:'sample data', userDefineTextName:'sample data', userDefineText:'sample data', userDefineName:'sample data', userDefineRequired:'sample data', maxLen:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234, userDefineValidateFlag:'sample data', validatedTableName:'sample data', validatedColumnName:'sample data'};
      service.createUserDefinedText(userDefinedText).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedtexts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateUserDefinedText', () => {
    var id = 1;
    it('should return an Promise<UserDefinedText>', () => {
      const userDefinedText: UserDefinedText = {winId:'sample data', datawindowId:'sample data', userDefineTextName:'sample data', userDefineText:'sample data', userDefineName:'sample data', userDefineRequired:'sample data', maxLen:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234, userDefineValidateFlag:'sample data', validatedTableName:'sample data', validatedColumnName:'sample data'};
      service.updateUserDefinedText(userDefinedText, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedtexts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteUserDefinedText', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteUserDefinedText(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedtexts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});