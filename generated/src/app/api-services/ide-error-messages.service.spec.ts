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

import { IdeErrorMessagesService } from './ide-error-messages.service';
import { IdeErrorMessages } from '../api-models/ide-error-messages.model'
import { IdeErrorMessageses } from "../api-models/testing/fake-ide-error-messages.model"

describe('IdeErrorMessagesService', () => {
  let injector: TestBed;
  let service: IdeErrorMessagesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IdeErrorMessagesService]
    });
    injector = getTestBed();
    service = injector.get(IdeErrorMessagesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIdeErrorMessageses', () => {
    it('should return an Promise<IdeErrorMessages[]>', () => {
      const ideErrorMessages = [
       {seqMessageId:1234, errorType:'sample data', sourceId:'sample data', messageText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data'},
       {seqMessageId:1234, errorType:'sample data', sourceId:'sample data', messageText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data'},
       {seqMessageId:1234, errorType:'sample data', sourceId:'sample data', messageText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data'}

      ];
      service.getIdeErrorMessageses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ideerrormessageses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ideErrorMessages);
    });
  });


  describe('#createIdeErrorMessages', () => {
    var id = 1;
    it('should return an Promise<IdeErrorMessages>', () => {
      const ideErrorMessages: IdeErrorMessages = {seqMessageId:1234, errorType:'sample data', sourceId:'sample data', messageText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data'};
      service.createIdeErrorMessages(ideErrorMessages).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ideerrormessageses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIdeErrorMessages', () => {
    var id = 1;
    it('should return an Promise<IdeErrorMessages>', () => {
      const ideErrorMessages: IdeErrorMessages = {seqMessageId:1234, errorType:'sample data', sourceId:'sample data', messageText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data'};
      service.updateIdeErrorMessages(ideErrorMessages, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ideerrormessageses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIdeErrorMessages', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIdeErrorMessages(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ideerrormessageses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});