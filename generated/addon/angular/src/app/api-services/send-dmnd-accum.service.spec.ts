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

import { SendDmndAccumService } from './send-dmnd-accum.service';
import { SendDmndAccum } from '../api-models/send-dmnd-accum.model'
import { SendDmndAccums } from "../api-models/testing/fake-send-dmnd-accum.model"

describe('SendDmndAccumService', () => {
  let injector: TestBed;
  let service: SendDmndAccumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SendDmndAccumService]
    });
    injector = getTestBed();
    service = injector.get(SendDmndAccumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSendDmndAccums', () => {
    it('should return an Promise<SendDmndAccum[]>', () => {
      const sendDmndAccum = [
       {pMaxRecordNum:1234},
       {pMaxRecordNum:1234},
       {pMaxRecordNum:1234}

      ];
      service.getSendDmndAccums().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/senddmndaccums/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(sendDmndAccum);
    });
  });


  describe('#createSendDmndAccum', () => {
    var id = 1;
    it('should return an Promise<SendDmndAccum>', () => {
      const sendDmndAccum: SendDmndAccum = {pMaxRecordNum:1234};
      service.createSendDmndAccum(sendDmndAccum).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/senddmndaccums`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSendDmndAccum', () => {
    var id = 1;
    it('should return an Promise<SendDmndAccum>', () => {
      const sendDmndAccum: SendDmndAccum = {pMaxRecordNum:1234};
      service.updateSendDmndAccum(sendDmndAccum, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/senddmndaccums/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSendDmndAccum', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSendDmndAccum(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/senddmndaccums/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});