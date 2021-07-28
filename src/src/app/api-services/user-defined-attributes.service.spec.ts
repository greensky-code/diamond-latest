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

import { UserDefinedAttributesService } from './user-defined-attributes.service';
import { UserDefinedAttributes } from '../api-models/user-defined-attributes.model'
import { UserDefinedAttributeses } from "../api-models/testing/fake-user-defined-attributes.model"

describe('UserDefinedAttributesService', () => {
  let injector: TestBed;
  let service: UserDefinedAttributesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserDefinedAttributesService]
    });
    injector = getTestBed();
    service = injector.get(UserDefinedAttributesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getUserDefinedAttributeses', () => {
    it('should return an Promise<UserDefinedAttributes[]>', () => {
      const userDefinedAttributes = [
       {activated:'sample data', winId:'sample data', datawindowId:'sample data', columnName:'sample data', columnCategory:'sample data', userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', userDefinedRequired:'sample data', userDefinedEnableCountry:'sample data', userDefinedDefaultCountry:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {activated:'sample data', winId:'sample data', datawindowId:'sample data', columnName:'sample data', columnCategory:'sample data', userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', userDefinedRequired:'sample data', userDefinedEnableCountry:'sample data', userDefinedDefaultCountry:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {activated:'sample data', winId:'sample data', datawindowId:'sample data', columnName:'sample data', columnCategory:'sample data', userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', userDefinedRequired:'sample data', userDefinedEnableCountry:'sample data', userDefinedDefaultCountry:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getUserDefinedAttributeses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedattributeses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(userDefinedAttributes);
    });
  });


  describe('#createUserDefinedAttributes', () => {
    var id = 1;
    it('should return an Promise<UserDefinedAttributes>', () => {
      const userDefinedAttributes: UserDefinedAttributes = {activated:'sample data', winId:'sample data', datawindowId:'sample data', columnName:'sample data', columnCategory:'sample data', userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', userDefinedRequired:'sample data', userDefinedEnableCountry:'sample data', userDefinedDefaultCountry:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createUserDefinedAttributes(userDefinedAttributes).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedattributeses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateUserDefinedAttributes', () => {
    var id = 1;
    it('should return an Promise<UserDefinedAttributes>', () => {
      const userDefinedAttributes: UserDefinedAttributes = {activated:'sample data', winId:'sample data', datawindowId:'sample data', columnName:'sample data', columnCategory:'sample data', userDefinedFieldLabel:'sample data', userDefinedDisplayMask:'sample data', userDefinedValidLengths:'sample data', userDefinedRequired:'sample data', userDefinedEnableCountry:'sample data', userDefinedDefaultCountry:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateUserDefinedAttributes(userDefinedAttributes, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedattributeses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteUserDefinedAttributes', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteUserDefinedAttributes(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/userdefinedattributeses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});