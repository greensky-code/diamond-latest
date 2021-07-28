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

import { BatchMessageService } from './batch-message.service';
import { BatchMessage } from '../api-models/batch-message.model'
import { BatchMessages } from "../api-models/testing/fake-batch-message.model"

describe('BatchMessageService', () => {
  let injector: TestBed;
  let service: BatchMessageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BatchMessageService]
    });
    injector = getTestBed();
    service = injector.get(BatchMessageService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBatchMessages', () => {
    it('should return an Promise<BatchMessage[]>', () => {
      const batchMessage = [
       {seqMessageId:1234, batchId:'sample data', transactionId:1234, additionalKey:1234, messageId:1234, messageType:'sample data', messageText:'sample data', keyId1:'sample data', keyId2:'sample data', keyId3:'sample data', keyId4:'sample data', keyId5:'sample data', keyId6:'sample data', keyId7:'sample data', keyId8:'sample data', keyId9:'sample data', keyId10:'sample data', keyId11:'sample data', keyId12:'sample data', keyId13:'sample data', keyId14:'sample data', keyId15:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqMessageId:1234, batchId:'sample data', transactionId:1234, additionalKey:1234, messageId:1234, messageType:'sample data', messageText:'sample data', keyId1:'sample data', keyId2:'sample data', keyId3:'sample data', keyId4:'sample data', keyId5:'sample data', keyId6:'sample data', keyId7:'sample data', keyId8:'sample data', keyId9:'sample data', keyId10:'sample data', keyId11:'sample data', keyId12:'sample data', keyId13:'sample data', keyId14:'sample data', keyId15:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqMessageId:1234, batchId:'sample data', transactionId:1234, additionalKey:1234, messageId:1234, messageType:'sample data', messageText:'sample data', keyId1:'sample data', keyId2:'sample data', keyId3:'sample data', keyId4:'sample data', keyId5:'sample data', keyId6:'sample data', keyId7:'sample data', keyId8:'sample data', keyId9:'sample data', keyId10:'sample data', keyId11:'sample data', keyId12:'sample data', keyId13:'sample data', keyId14:'sample data', keyId15:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getBatchMessages().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/batchmessages/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(batchMessage);
    });
  });


  describe('#createBatchMessage', () => {
    var id = 1;
    it('should return an Promise<BatchMessage>', () => {
      const batchMessage: BatchMessage = {seqMessageId:1234, batchId:'sample data', transactionId:1234, additionalKey:1234, messageId:1234, messageType:'sample data', messageText:'sample data', keyId1:'sample data', keyId2:'sample data', keyId3:'sample data', keyId4:'sample data', keyId5:'sample data', keyId6:'sample data', keyId7:'sample data', keyId8:'sample data', keyId9:'sample data', keyId10:'sample data', keyId11:'sample data', keyId12:'sample data', keyId13:'sample data', keyId14:'sample data', keyId15:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createBatchMessage(batchMessage).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmessages`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBatchMessage', () => {
    var id = 1;
    it('should return an Promise<BatchMessage>', () => {
      const batchMessage: BatchMessage = {seqMessageId:1234, batchId:'sample data', transactionId:1234, additionalKey:1234, messageId:1234, messageType:'sample data', messageText:'sample data', keyId1:'sample data', keyId2:'sample data', keyId3:'sample data', keyId4:'sample data', keyId5:'sample data', keyId6:'sample data', keyId7:'sample data', keyId8:'sample data', keyId9:'sample data', keyId10:'sample data', keyId11:'sample data', keyId12:'sample data', keyId13:'sample data', keyId14:'sample data', keyId15:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateBatchMessage(batchMessage, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmessages/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBatchMessage', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBatchMessage(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmessages/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});