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

import { CspGetMemberInfoService } from './csp-get-member-info.service';
import { CspGetMemberInfo } from '../api-models/csp-get-member-info.model'
import { CspGetMemberInfos } from "../api-models/testing/fake-csp-get-member-info.model"

describe('CspGetMemberInfoService', () => {
  let injector: TestBed;
  let service: CspGetMemberInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetMemberInfoService]
    });
    injector = getTestBed();
    service = injector.get(CspGetMemberInfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetMemberInfos', () => {
    it('should return an Promise<CspGetMemberInfo[]>', () => {
      const cspGetMemberInfo = [
       {pSeqMembId:1234, pSeqSubsId:1234, pLastName:'sample data', pFirstName:'sample data', pMiddleInitial:'sample data'},
       {pSeqMembId:1234, pSeqSubsId:1234, pLastName:'sample data', pFirstName:'sample data', pMiddleInitial:'sample data'},
       {pSeqMembId:1234, pSeqSubsId:1234, pLastName:'sample data', pFirstName:'sample data', pMiddleInitial:'sample data'}

      ];
      service.getCspGetMemberInfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmemberinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetMemberInfo);
    });
  });


  describe('#createCspGetMemberInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetMemberInfo>', () => {
      const cspGetMemberInfo: CspGetMemberInfo = {pSeqMembId:1234, pSeqSubsId:1234, pLastName:'sample data', pFirstName:'sample data', pMiddleInitial:'sample data'};
      service.createCspGetMemberInfo(cspGetMemberInfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmemberinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetMemberInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetMemberInfo>', () => {
      const cspGetMemberInfo: CspGetMemberInfo = {pSeqMembId:1234, pSeqSubsId:1234, pLastName:'sample data', pFirstName:'sample data', pMiddleInitial:'sample data'};
      service.updateCspGetMemberInfo(cspGetMemberInfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmemberinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetMemberInfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetMemberInfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetmemberinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});