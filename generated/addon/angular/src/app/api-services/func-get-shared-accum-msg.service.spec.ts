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

import { FuncGetSharedAccumMsgService } from './func-get-shared-accum-msg.service';
import { FuncGetSharedAccumMsg } from '../api-models/func-get-shared-accum-msg.model'
import { FuncGetSharedAccumMsgs } from "../api-models/testing/fake-func-get-shared-accum-msg.model"

describe('FuncGetSharedAccumMsgService', () => {
  let injector: TestBed;
  let service: FuncGetSharedAccumMsgService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetSharedAccumMsgService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetSharedAccumMsgService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetSharedAccumMsgs', () => {
    it('should return an Promise<FuncGetSharedAccumMsg[]>', () => {
      const funcGetSharedAccumMsg = [
       {pRuleId:'sample data', pReqStcList:'sample data'},
       {pRuleId:'sample data', pReqStcList:'sample data'},
       {pRuleId:'sample data', pReqStcList:'sample data'}

      ];
      service.getFuncGetSharedAccumMsgs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsharedaccummsgs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetSharedAccumMsg);
    });
  });


  describe('#createFuncGetSharedAccumMsg', () => {
    var id = 1;
    it('should return an Promise<FuncGetSharedAccumMsg>', () => {
      const funcGetSharedAccumMsg: FuncGetSharedAccumMsg = {pRuleId:'sample data', pReqStcList:'sample data'};
      service.createFuncGetSharedAccumMsg(funcGetSharedAccumMsg).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsharedaccummsgs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetSharedAccumMsg', () => {
    var id = 1;
    it('should return an Promise<FuncGetSharedAccumMsg>', () => {
      const funcGetSharedAccumMsg: FuncGetSharedAccumMsg = {pRuleId:'sample data', pReqStcList:'sample data'};
      service.updateFuncGetSharedAccumMsg(funcGetSharedAccumMsg, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsharedaccummsgs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetSharedAccumMsg', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetSharedAccumMsg(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetsharedaccummsgs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});