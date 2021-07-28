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

import { GetMemberEligRsService } from './get-member-elig-rs.service';
import { GetMemberEligRs } from '../api-models/get-member-elig-rs.model'
import { GetMemberEligR } from "../api-models/testing/fake-get-member-elig-rs.model"

describe('GetMemberEligRsService', () => {
  let injector: TestBed;
  let service: GetMemberEligRsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetMemberEligRsService]
    });
    injector = getTestBed();
    service = injector.get(GetMemberEligRsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetMemberEligR', () => {
    it('should return an Promise<GetMemberEligRs[]>', () => {
      const getMemberEligRs = [
       {pSeqMembId:1234, pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data', pReqStcInforList:'sample data'},
       {pSeqMembId:1234, pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data', pReqStcInforList:'sample data'},
       {pSeqMembId:1234, pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data', pReqStcInforList:'sample data'}

      ];
      service.getGetMemberEligR().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getmembereligr/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getMemberEligRs);
    });
  });


  describe('#createGetMemberEligRs', () => {
    var id = 1;
    it('should return an Promise<GetMemberEligRs>', () => {
      const getMemberEligRs: GetMemberEligRs = {pSeqMembId:1234, pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data', pReqStcInforList:'sample data'};
      service.createGetMemberEligRs(getMemberEligRs).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getmembereligr`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetMemberEligRs', () => {
    var id = 1;
    it('should return an Promise<GetMemberEligRs>', () => {
      const getMemberEligRs: GetMemberEligRs = {pSeqMembId:1234, pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data', pReqStcInforList:'sample data'};
      service.updateGetMemberEligRs(getMemberEligRs, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getmembereligr/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetMemberEligRs', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetMemberEligRs(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getmembereligr/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});