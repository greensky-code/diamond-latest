/* Copyright (c) 2021 . All Rights Reserved. */

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

import { GetMemberRsService } from './get-member-rs.service';
import { GetMemberRs } from '../api-models/get-member-rs.model'
import { GetMemberR } from "../api-models/testing/fake-get-member-rs.model"

describe('GetMemberRsService', () => {
  let injector: TestBed;
  let service: GetMemberRsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetMemberRsService]
    });
    injector = getTestBed();
    service = injector.get(GetMemberRsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetMemberR', () => {
    it('should return an Promise<GetMemberRs[]>', () => {
      const getMemberRs = [
       {pSubscriberId:'sample data', pPersonNumber:'sample data', pFirstName:'sample data', pLastName:'sample data', pDob:'sample data', pGender:'sample data', pSvcStartDt:'sample data'},
       {pSubscriberId:'sample data', pPersonNumber:'sample data', pFirstName:'sample data', pLastName:'sample data', pDob:'sample data', pGender:'sample data', pSvcStartDt:'sample data'},
       {pSubscriberId:'sample data', pPersonNumber:'sample data', pFirstName:'sample data', pLastName:'sample data', pDob:'sample data', pGender:'sample data', pSvcStartDt:'sample data'}

      ];
      service.getGetMemberR().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getmemberr/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getMemberRs);
    });
  });


  describe('#createGetMemberRs', () => {
    var id = 1;
    it('should return an Promise<GetMemberRs>', () => {
      const getMemberRs: GetMemberRs = {pSubscriberId:'sample data', pPersonNumber:'sample data', pFirstName:'sample data', pLastName:'sample data', pDob:'sample data', pGender:'sample data', pSvcStartDt:'sample data'};
      service.createGetMemberRs(getMemberRs).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getmemberr`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetMemberRs', () => {
    var id = 1;
    it('should return an Promise<GetMemberRs>', () => {
      const getMemberRs: GetMemberRs = {pSubscriberId:'sample data', pPersonNumber:'sample data', pFirstName:'sample data', pLastName:'sample data', pDob:'sample data', pGender:'sample data', pSvcStartDt:'sample data'};
      service.updateGetMemberRs(getMemberRs, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getmemberr/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetMemberRs', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetMemberRs(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getmemberr/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});