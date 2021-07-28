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

import { AuthSecondOpinionService } from './auth-second-opinion.service';
import { AuthSecondOpinion } from '../api-models/auth-second-opinion.model'
import { AuthSecondOpinions } from "../api-models/testing/fake-auth-second-opinion.model"

describe('AuthSecondOpinionService', () => {
  let injector: TestBed;
  let service: AuthSecondOpinionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthSecondOpinionService]
    });
    injector = getTestBed();
    service = injector.get(AuthSecondOpinionService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthSecondOpinions', () => {
    it('should return an Promise<AuthSecondOpinion[]>', () => {
      const authSecondOpinion = [
       {authNumber:1234, secondaryAuthNo:'sample data', seqSecondOp:1234, seqProvId:1234, secondOpinionDate:'2018-01-01', secondOpinion:'sample data', decision:'sample data', comments:'sample data', status:'sample data', statusReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqSecondOp:1234, seqProvId:1234, secondOpinionDate:'2018-01-01', secondOpinion:'sample data', decision:'sample data', comments:'sample data', status:'sample data', statusReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqSecondOp:1234, seqProvId:1234, secondOpinionDate:'2018-01-01', secondOpinion:'sample data', decision:'sample data', comments:'sample data', status:'sample data', statusReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthSecondOpinions().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authsecondopinions/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authSecondOpinion);
    });
  });


  describe('#createAuthSecondOpinion', () => {
    var id = 1;
    it('should return an Promise<AuthSecondOpinion>', () => {
      const authSecondOpinion: AuthSecondOpinion = {authNumber:1234, secondaryAuthNo:'sample data', seqSecondOp:1234, seqProvId:1234, secondOpinionDate:'2018-01-01', secondOpinion:'sample data', decision:'sample data', comments:'sample data', status:'sample data', statusReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuthSecondOpinion(authSecondOpinion).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authsecondopinions`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthSecondOpinion', () => {
    var id = 1;
    it('should return an Promise<AuthSecondOpinion>', () => {
      const authSecondOpinion: AuthSecondOpinion = {authNumber:1234, secondaryAuthNo:'sample data', seqSecondOp:1234, seqProvId:1234, secondOpinionDate:'2018-01-01', secondOpinion:'sample data', decision:'sample data', comments:'sample data', status:'sample data', statusReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuthSecondOpinion(authSecondOpinion, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authsecondopinions/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthSecondOpinion', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthSecondOpinion(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authsecondopinions/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});