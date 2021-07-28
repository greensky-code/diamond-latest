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

import { MessageMasterHdrService } from './message-master-hdr.service';
import { MessageMasterHdr } from '../api-models/message-master-hdr.model'
import { MessageMasterHdrs } from "../api-models/testing/fake-message-master-hdr.model"

describe('MessageMasterHdrService', () => {
  let injector: TestBed;
  let service: MessageMasterHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageMasterHdrService]
    });
    injector = getTestBed();
    service = injector.get(MessageMasterHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMessageMasterHdrs', () => {
    it('should return an Promise<MessageMasterHdr[]>', () => {
      const messageMasterHdr = [
       {messageId:1234, messageType:'sample data', messageLevel:1234, frontEndMessage:'sample data', replacementText:1234, displayMessage:'sample data', retainMessage:'sample data', messageOptions:'sample data', defaultMessage:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', uncleanFlag:'sample data'},
       {messageId:1234, messageType:'sample data', messageLevel:1234, frontEndMessage:'sample data', replacementText:1234, displayMessage:'sample data', retainMessage:'sample data', messageOptions:'sample data', defaultMessage:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', uncleanFlag:'sample data'},
       {messageId:1234, messageType:'sample data', messageLevel:1234, frontEndMessage:'sample data', replacementText:1234, displayMessage:'sample data', retainMessage:'sample data', messageOptions:'sample data', defaultMessage:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', uncleanFlag:'sample data'}

      ];
      service.getMessageMasterHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/messagemasterhdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(messageMasterHdr);
    });
  });


  describe('#createMessageMasterHdr', () => {
    var id = 1;
    it('should return an Promise<MessageMasterHdr>', () => {
      const messageMasterHdr: MessageMasterHdr = {messageId:1234, messageType:'sample data', messageLevel:1234, frontEndMessage:'sample data', replacementText:1234, displayMessage:'sample data', retainMessage:'sample data', messageOptions:'sample data', defaultMessage:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', uncleanFlag:'sample data'};
      service.createMessageMasterHdr(messageMasterHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/messagemasterhdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMessageMasterHdr', () => {
    var id = 1;
    it('should return an Promise<MessageMasterHdr>', () => {
      const messageMasterHdr: MessageMasterHdr = {messageId:1234, messageType:'sample data', messageLevel:1234, frontEndMessage:'sample data', replacementText:1234, displayMessage:'sample data', retainMessage:'sample data', messageOptions:'sample data', defaultMessage:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', uncleanFlag:'sample data'};
      service.updateMessageMasterHdr(messageMasterHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/messagemasterhdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMessageMasterHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMessageMasterHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/messagemasterhdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});