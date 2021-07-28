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

import { MessageMasterDtlService } from './message-master-dtl.service';
import { MessageMasterDtl } from '../api-models/message-master-dtl.model'
import { MessageMasterDtls } from "../api-models/testing/fake-message-master-dtl.model"

describe('MessageMasterDtlService', () => {
  let injector: TestBed;
  let service: MessageMasterDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageMasterDtlService]
    });
    injector = getTestBed();
    service = injector.get(MessageMasterDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMessageMasterDtls', () => {
    it('should return an Promise<MessageMasterDtl[]>', () => {
      const messageMasterDtl = [
       {messageId:1234, languageId:1234, messageText:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {messageId:1234, languageId:1234, messageText:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {messageId:1234, languageId:1234, messageText:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getMessageMasterDtls().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/messagemasterdtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(messageMasterDtl);
    });
  });


  describe('#createMessageMasterDtl', () => {
    var id = 1;
    it('should return an Promise<MessageMasterDtl>', () => {
      const messageMasterDtl: MessageMasterDtl = {messageId:1234, languageId:1234, messageText:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createMessageMasterDtl(messageMasterDtl).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/messagemasterdtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMessageMasterDtl', () => {
    var id = 1;
    it('should return an Promise<MessageMasterDtl>', () => {
      const messageMasterDtl: MessageMasterDtl = {messageId:1234, languageId:1234, messageText:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateMessageMasterDtl(messageMasterDtl, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/messagemasterdtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMessageMasterDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMessageMasterDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/messagemasterdtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});