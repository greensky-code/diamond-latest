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

import { UserCustomLookupService } from './user-custom-lookup.service';
import { UserCustomLookup } from '../api-models/user-custom-lookup.model'
import { UserCustomLookups } from "../api-models/testing/fake-user-custom-lookup.model"

describe('UserCustomLookupService', () => {
  let injector: TestBed;
  let service: UserCustomLookupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserCustomLookupService]
    });
    injector = getTestBed();
    service = injector.get(UserCustomLookupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getUserCustomLookups', () => {
    it('should return an Promise<UserCustomLookup[]>', () => {
      const userCustomLookup = [
       {userId:'sample data', keyWord:'sample data', dwName:'sample data', sqlSyn:1234, sitemAllContractFlg:'sample data'},
       {userId:'sample data', keyWord:'sample data', dwName:'sample data', sqlSyn:1234, sitemAllContractFlg:'sample data'},
       {userId:'sample data', keyWord:'sample data', dwName:'sample data', sqlSyn:1234, sitemAllContractFlg:'sample data'}

      ];
      service.getUserCustomLookups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/usercustomlookups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(userCustomLookup);
    });
  });


  describe('#createUserCustomLookup', () => {
    var id = 1;
    it('should return an Promise<UserCustomLookup>', () => {
      const userCustomLookup: UserCustomLookup = {userId:'sample data', keyWord:'sample data', dwName:'sample data', sqlSyn:1234, sitemAllContractFlg:'sample data'};
      service.createUserCustomLookup(userCustomLookup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/usercustomlookups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateUserCustomLookup', () => {
    var id = 1;
    it('should return an Promise<UserCustomLookup>', () => {
      const userCustomLookup: UserCustomLookup = {userId:'sample data', keyWord:'sample data', dwName:'sample data', sqlSyn:1234, sitemAllContractFlg:'sample data'};
      service.updateUserCustomLookup(userCustomLookup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/usercustomlookups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteUserCustomLookup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteUserCustomLookup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/usercustomlookups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});