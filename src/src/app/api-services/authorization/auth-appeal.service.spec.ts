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

import { AuthAppealService } from './auth-appeal.service';
import { AuthAppeal } from '../api-models/auth-appeal.model'
import { AuthAppeals } from "../api-models/testing/fake-auth-appeal.model"

describe('AuthAppealService', () => {
  let injector: TestBed;
  let service: AuthAppealService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthAppealService]
    });
    injector = getTestBed();
    service = injector.get(AuthAppealService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthAppeals', () => {
    it('should return an Promise<AuthAppeal[]>', () => {
      const authAppeal = [
       {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAppeal:1234, appealNumber:'sample data', appellant:'sample data', seqProvId:1234, contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAppeal:1234, appealNumber:'sample data', appellant:'sample data', seqProvId:1234, contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAppeal:1234, appealNumber:'sample data', appellant:'sample data', seqProvId:1234, contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthAppeals().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authappeals/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authAppeal);
    });
  });


  describe('#createAuthAppeal', () => {
    var id = 1;
    it('should return an Promise<AuthAppeal>', () => {
      const authAppeal: AuthAppeal = {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAppeal:1234, appealNumber:'sample data', appellant:'sample data', seqProvId:1234, contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthAppeal(authAppeal).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authappeals`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthAppeal', () => {
    var id = 1;
    it('should return an Promise<AuthAppeal>', () => {
      const authAppeal: AuthAppeal = {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAppeal:1234, appealNumber:'sample data', appellant:'sample data', seqProvId:1234, contactDate:'2018-01-01', decisionDate:'2018-01-01', advisorDecision:'sample data', notificationDate:'2018-01-01', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthAppeal(authAppeal, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authappeals/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthAppeal', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthAppeal(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authappeals/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});