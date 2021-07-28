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

import { CiebCombMsgService } from './cieb-comb-msg.service';
import { CiebCombMsg } from '../api-models/cieb-comb-msg.model'
import { CiebCombMsgs } from "../api-models/testing/fake-cieb-comb-msg.model"

describe('CiebCombMsgService', () => {
  let injector: TestBed;
  let service: CiebCombMsgService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebCombMsgService]
    });
    injector = getTestBed();
    service = injector.get(CiebCombMsgService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebCombMsgs', () => {
    it('should return an Promise<CiebCombMsg[]>', () => {
      const ciebCombMsg = [
       {seqMsgId:1234, msgId:'sample data', message:'sample data', msgIdType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqMsgId:1234, msgId:'sample data', message:'sample data', msgIdType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqMsgId:1234, msgId:'sample data', message:'sample data', msgIdType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebCombMsgs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcombmsgs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebCombMsg);
    });
  });


  describe('#createCiebCombMsg', () => {
    var id = 1;
    it('should return an Promise<CiebCombMsg>', () => {
      const ciebCombMsg: CiebCombMsg = {seqMsgId:1234, msgId:'sample data', message:'sample data', msgIdType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebCombMsg(ciebCombMsg).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcombmsgs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebCombMsg', () => {
    var id = 1;
    it('should return an Promise<CiebCombMsg>', () => {
      const ciebCombMsg: CiebCombMsg = {seqMsgId:1234, msgId:'sample data', message:'sample data', msgIdType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebCombMsg(ciebCombMsg, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcombmsgs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebCombMsg', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebCombMsg(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcombmsgs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});