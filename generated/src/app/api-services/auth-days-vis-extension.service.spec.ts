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

import { AuthDaysVisExtensionService } from './auth-days-vis-extension.service';
import { AuthDaysVisExtension } from '../api-models/auth-days-vis-extension.model'
import { AuthDaysVisExtensions } from "../api-models/testing/fake-auth-days-vis-extension.model"

describe('AuthDaysVisExtensionService', () => {
  let injector: TestBed;
  let service: AuthDaysVisExtensionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthDaysVisExtensionService]
    });
    injector = getTestBed();
    service = injector.get(AuthDaysVisExtensionService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthDaysVisExtensions', () => {
    it('should return an Promise<AuthDaysVisExtension[]>', () => {
      const authDaysVisExtension = [
       {authNumber:1234, secondaryAuthNo:'sample data', seqDaysVisExt:1234, daysVisitsExtension:1234, extensionReason:'sample data', extensionDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqDaysVisExt:1234, daysVisitsExtension:1234, extensionReason:'sample data', extensionDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqDaysVisExt:1234, daysVisitsExtension:1234, extensionReason:'sample data', extensionDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthDaysVisExtensions().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authdaysvisextensions/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authDaysVisExtension);
    });
  });


  describe('#createAuthDaysVisExtension', () => {
    var id = 1;
    it('should return an Promise<AuthDaysVisExtension>', () => {
      const authDaysVisExtension: AuthDaysVisExtension = {authNumber:1234, secondaryAuthNo:'sample data', seqDaysVisExt:1234, daysVisitsExtension:1234, extensionReason:'sample data', extensionDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthDaysVisExtension(authDaysVisExtension).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authdaysvisextensions`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthDaysVisExtension', () => {
    var id = 1;
    it('should return an Promise<AuthDaysVisExtension>', () => {
      const authDaysVisExtension: AuthDaysVisExtension = {authNumber:1234, secondaryAuthNo:'sample data', seqDaysVisExt:1234, daysVisitsExtension:1234, extensionReason:'sample data', extensionDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthDaysVisExtension(authDaysVisExtension, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authdaysvisextensions/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthDaysVisExtension', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthDaysVisExtension(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authdaysvisextensions/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});