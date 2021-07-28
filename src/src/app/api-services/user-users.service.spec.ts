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

import { UserUsersService } from './user-users.service';
import { UserUsers } from '../api-models/user-users.model'
import { UserUserss } from "../api-models/testing/fake-user-users.model"

describe('UserUsersService', () => {
  let injector: TestBed;
  let service: UserUsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserUsersService]
    });
    injector = getTestBed();
    service = injector.get(UserUsersService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getUserUserss', () => {
    it('should return an Promise<UserUsers[]>', () => {
      const userUsers = [
       {allShard:'sample data', implicit:'sample data', defaultCollation:'sample data', inherited:'sample data', oracleMaintained:'sample data', common:'sample data', proxyOnlyConnect:'sample data', externalName:'sample data', initialRsrcConsumerGroup:'sample data', created:'2018-01-01', localTempTablespace:'sample data', temporaryTablespace:'sample data', defaultTablespace:'sample data', expiryDate:'2018-01-01', lockDate:'2018-01-01', accountStatus:'sample data', userId:1234, username:'sample data'},
       {allShard:'sample data', implicit:'sample data', defaultCollation:'sample data', inherited:'sample data', oracleMaintained:'sample data', common:'sample data', proxyOnlyConnect:'sample data', externalName:'sample data', initialRsrcConsumerGroup:'sample data', created:'2018-01-01', localTempTablespace:'sample data', temporaryTablespace:'sample data', defaultTablespace:'sample data', expiryDate:'2018-01-01', lockDate:'2018-01-01', accountStatus:'sample data', userId:1234, username:'sample data'},
       {allShard:'sample data', implicit:'sample data', defaultCollation:'sample data', inherited:'sample data', oracleMaintained:'sample data', common:'sample data', proxyOnlyConnect:'sample data', externalName:'sample data', initialRsrcConsumerGroup:'sample data', created:'2018-01-01', localTempTablespace:'sample data', temporaryTablespace:'sample data', defaultTablespace:'sample data', expiryDate:'2018-01-01', lockDate:'2018-01-01', accountStatus:'sample data', userId:1234, username:'sample data'}

      ];
      service.getUserUserss().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/useruserss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(userUsers);
    });
  });


  describe('#createUserUsers', () => {
    var id = 1;
    it('should return an Promise<UserUsers>', () => {
      const userUsers: UserUsers = {allShard:'sample data', implicit:'sample data', defaultCollation:'sample data', inherited:'sample data', oracleMaintained:'sample data', common:'sample data', proxyOnlyConnect:'sample data', externalName:'sample data', initialRsrcConsumerGroup:'sample data', created:'2018-01-01', localTempTablespace:'sample data', temporaryTablespace:'sample data', defaultTablespace:'sample data', expiryDate:'2018-01-01', lockDate:'2018-01-01', accountStatus:'sample data', userId:1234, username:'sample data'};
      service.createUserUsers(userUsers).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/useruserss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateUserUsers', () => {
    var id = 1;
    it('should return an Promise<UserUsers>', () => {
      const userUsers: UserUsers = {allShard:'sample data', implicit:'sample data', defaultCollation:'sample data', inherited:'sample data', oracleMaintained:'sample data', common:'sample data', proxyOnlyConnect:'sample data', externalName:'sample data', initialRsrcConsumerGroup:'sample data', created:'2018-01-01', localTempTablespace:'sample data', temporaryTablespace:'sample data', defaultTablespace:'sample data', expiryDate:'2018-01-01', lockDate:'2018-01-01', accountStatus:'sample data', userId:1234, username:'sample data'};
      service.updateUserUsers(userUsers, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/useruserss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteUserUsers', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteUserUsers(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/useruserss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});