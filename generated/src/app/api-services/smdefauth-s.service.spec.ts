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

import { SmdefauthSService } from './smdefauth-s.service';
import { SmdefauthS } from '../api-models/smdefauth-s.model'
import { SmdefauthSs } from "../api-models/testing/fake-smdefauth-s.model"

describe('SmdefauthSService', () => {
  let injector: TestBed;
  let service: SmdefauthSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmdefauthSService]
    });
    injector = getTestBed();
    service = injector.get(SmdefauthSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmdefauthSs', () => {
    it('should return an Promise<SmdefauthS[]>', () => {
      const smdefauthS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, defauthConsoleuser:'sample data', defauthOsusername:'sample data', defauthIsosusernameset:1234, defauthOspassword:'sample data', defauthIsospasswordset:1234, defauthDbusername:'sample data', defauthIsdbusernameset:1234, defauthDbpassword:'sample data', defauthIsdbpasswordset:1234, defauthInternalpassword:'sample data', defauthIsinternalpasswordset:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, defauthConsoleuser:'sample data', defauthOsusername:'sample data', defauthIsosusernameset:1234, defauthOspassword:'sample data', defauthIsospasswordset:1234, defauthDbusername:'sample data', defauthIsdbusernameset:1234, defauthDbpassword:'sample data', defauthIsdbpasswordset:1234, defauthInternalpassword:'sample data', defauthIsinternalpasswordset:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, defauthConsoleuser:'sample data', defauthOsusername:'sample data', defauthIsosusernameset:1234, defauthOspassword:'sample data', defauthIsospasswordset:1234, defauthDbusername:'sample data', defauthIsdbusernameset:1234, defauthDbpassword:'sample data', defauthIsdbpasswordset:1234, defauthInternalpassword:'sample data', defauthIsinternalpasswordset:1234}

      ];
      service.getSmdefauthSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smdefauthss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smdefauthS);
    });
  });


  describe('#createSmdefauthS', () => {
    var id = 1;
    it('should return an Promise<SmdefauthS>', () => {
      const smdefauthS: SmdefauthS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, defauthConsoleuser:'sample data', defauthOsusername:'sample data', defauthIsosusernameset:1234, defauthOspassword:'sample data', defauthIsospasswordset:1234, defauthDbusername:'sample data', defauthIsdbusernameset:1234, defauthDbpassword:'sample data', defauthIsdbpasswordset:1234, defauthInternalpassword:'sample data', defauthIsinternalpasswordset:1234};
      service.createSmdefauthS(smdefauthS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdefauthss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmdefauthS', () => {
    var id = 1;
    it('should return an Promise<SmdefauthS>', () => {
      const smdefauthS: SmdefauthS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, defauthConsoleuser:'sample data', defauthOsusername:'sample data', defauthIsosusernameset:1234, defauthOspassword:'sample data', defauthIsospasswordset:1234, defauthDbusername:'sample data', defauthIsdbusernameset:1234, defauthDbpassword:'sample data', defauthIsdbpasswordset:1234, defauthInternalpassword:'sample data', defauthIsinternalpasswordset:1234};
      service.updateSmdefauthS(smdefauthS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdefauthss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmdefauthS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmdefauthS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdefauthss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});