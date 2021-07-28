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

import { GetSubscriberRsService } from './get-subscriber-rs.service';
import { GetSubscriberRs } from '../api-models/get-subscriber-rs.model'
import { GetSubscriberR } from "../api-models/testing/fake-get-subscriber-rs.model"

describe('GetSubscriberRsService', () => {
  let injector: TestBed;
  let service: GetSubscriberRsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetSubscriberRsService]
    });
    injector = getTestBed();
    service = injector.get(GetSubscriberRsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetSubscriberR', () => {
    it('should return an Promise<GetSubscriberRs[]>', () => {
      const getSubscriberRs = [
       {pSubscriberId:'sample data', pPersonNumber:'sample data'},
       {pSubscriberId:'sample data', pPersonNumber:'sample data'},
       {pSubscriberId:'sample data', pPersonNumber:'sample data'}

      ];
      service.getGetSubscriberR().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getsubscriberr/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getSubscriberRs);
    });
  });


  describe('#createGetSubscriberRs', () => {
    var id = 1;
    it('should return an Promise<GetSubscriberRs>', () => {
      const getSubscriberRs: GetSubscriberRs = {pSubscriberId:'sample data', pPersonNumber:'sample data'};
      service.createGetSubscriberRs(getSubscriberRs).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getsubscriberr`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetSubscriberRs', () => {
    var id = 1;
    it('should return an Promise<GetSubscriberRs>', () => {
      const getSubscriberRs: GetSubscriberRs = {pSubscriberId:'sample data', pPersonNumber:'sample data'};
      service.updateGetSubscriberRs(getSubscriberRs, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getsubscriberr/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetSubscriberRs', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetSubscriberRs(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getsubscriberr/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});