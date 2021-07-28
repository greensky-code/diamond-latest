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

import { ObjectTokenService } from './object-token.service';
import { ObjectToken } from '../api-models/object-token.model'
import { ObjectTokens } from "../api-models/testing/fake-object-token.model"

describe('ObjectTokenService', () => {
  let injector: TestBed;
  let service: ObjectTokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ObjectTokenService]
    });
    injector = getTestBed();
    service = injector.get(ObjectTokenService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getObjectTokens', () => {
    it('should return an Promise<ObjectToken[]>', () => {
      const objectToken = [
       {objectId:'sample data', languageId:1234, controlName:'sample data', controlValueOccurrence:1234, controlText:'sample data', controlType:'sample data', maxLen:1234, keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {objectId:'sample data', languageId:1234, controlName:'sample data', controlValueOccurrence:1234, controlText:'sample data', controlType:'sample data', maxLen:1234, keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {objectId:'sample data', languageId:1234, controlName:'sample data', controlValueOccurrence:1234, controlText:'sample data', controlType:'sample data', maxLen:1234, keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getObjectTokens().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/objecttokens/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(objectToken);
    });
  });


  describe('#createObjectToken', () => {
    var id = 1;
    it('should return an Promise<ObjectToken>', () => {
      const objectToken: ObjectToken = {objectId:'sample data', languageId:1234, controlName:'sample data', controlValueOccurrence:1234, controlText:'sample data', controlType:'sample data', maxLen:1234, keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createObjectToken(objectToken).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/objecttokens`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateObjectToken', () => {
    var id = 1;
    it('should return an Promise<ObjectToken>', () => {
      const objectToken: ObjectToken = {objectId:'sample data', languageId:1234, controlName:'sample data', controlValueOccurrence:1234, controlText:'sample data', controlType:'sample data', maxLen:1234, keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateObjectToken(objectToken, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/objecttokens/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteObjectToken', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteObjectToken(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/objecttokens/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});