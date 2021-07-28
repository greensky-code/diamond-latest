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

import { UserDefinedValdtCodesService } from './user-defined-valdt-codes.service';
import { UserDefinedValdtCodes } from '../api-models/user-defined-valdt-codes.model'
import { UserDefinedValdtCodeses } from "../api-models/testing/fake-user-defined-valdt-codes.model"

describe('UserDefinedValdtCodesService', () => {
  let injector: TestBed;
  let service: UserDefinedValdtCodesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserDefinedValdtCodesService]
    });
    injector = getTestBed();
    service = injector.get(UserDefinedValdtCodesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getUserDefinedValdtCodeses', () => {
    it('should return an Promise<UserDefinedValdtCodes[]>', () => {
      const userDefinedValdtCodes = [
       {validatedTableName:'sample data', validatedColumnName:'sample data', userValidCode:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', userValidCodeShortDesc:'sample data', userValidCodeLongDesc:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {validatedTableName:'sample data', validatedColumnName:'sample data', userValidCode:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', userValidCodeShortDesc:'sample data', userValidCodeLongDesc:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {validatedTableName:'sample data', validatedColumnName:'sample data', userValidCode:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', userValidCodeShortDesc:'sample data', userValidCodeLongDesc:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getUserDefinedValdtCodeses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedvaldtcodeses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(userDefinedValdtCodes);
    });
  });


  describe('#createUserDefinedValdtCodes', () => {
    var id = 1;
    it('should return an Promise<UserDefinedValdtCodes>', () => {
      const userDefinedValdtCodes: UserDefinedValdtCodes = {validatedTableName:'sample data', validatedColumnName:'sample data', userValidCode:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', userValidCodeShortDesc:'sample data', userValidCodeLongDesc:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createUserDefinedValdtCodes(userDefinedValdtCodes).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedvaldtcodeses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateUserDefinedValdtCodes', () => {
    var id = 1;
    it('should return an Promise<UserDefinedValdtCodes>', () => {
      const userDefinedValdtCodes: UserDefinedValdtCodes = {validatedTableName:'sample data', validatedColumnName:'sample data', userValidCode:'sample data', languageId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', userValidCodeShortDesc:'sample data', userValidCodeLongDesc:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateUserDefinedValdtCodes(userDefinedValdtCodes, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedvaldtcodeses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteUserDefinedValdtCodes', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteUserDefinedValdtCodes(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedvaldtcodeses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});