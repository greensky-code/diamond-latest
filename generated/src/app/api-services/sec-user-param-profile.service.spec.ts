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

import { SecUserParamProfileService } from './sec-user-param-profile.service';
import { SecUserParamProfile } from '../api-models/sec-user-param-profile.model'
import { SecUserParamProfiles } from "../api-models/testing/fake-sec-user-param-profile.model"

describe('SecUserParamProfileService', () => {
  let injector: TestBed;
  let service: SecUserParamProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecUserParamProfileService]
    });
    injector = getTestBed();
    service = injector.get(SecUserParamProfileService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecUserParamProfiles', () => {
    it('should return an Promise<SecUserParamProfile[]>', () => {
      const secUserParamProfile = [
       {userId:'sample data', secParamSeq:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {userId:'sample data', secParamSeq:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {userId:'sample data', secParamSeq:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSecUserParamProfiles().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/secuserparamprofiles/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secUserParamProfile);
    });
  });


  describe('#createSecUserParamProfile', () => {
    var id = 1;
    it('should return an Promise<SecUserParamProfile>', () => {
      const secUserParamProfile: SecUserParamProfile = {userId:'sample data', secParamSeq:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSecUserParamProfile(secUserParamProfile).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secuserparamprofiles`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecUserParamProfile', () => {
    var id = 1;
    it('should return an Promise<SecUserParamProfile>', () => {
      const secUserParamProfile: SecUserParamProfile = {userId:'sample data', secParamSeq:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSecUserParamProfile(secUserParamProfile, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secuserparamprofiles/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecUserParamProfile', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSecUserParamProfile(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secuserparamprofiles/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});