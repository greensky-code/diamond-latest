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

import { SubscriberIdChangeWorkService } from './subscriber-id-change-work.service';
import { SubscriberIdChangeWork } from '../api-models/subscriber-id-change-work.model'
import { SubscriberIdChangeWorks } from "../api-models/testing/fake-subscriber-id-change-work.model"

describe('SubscriberIdChangeWorkService', () => {
  let injector: TestBed;
  let service: SubscriberIdChangeWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscriberIdChangeWorkService]
    });
    injector = getTestBed();
    service = injector.get(SubscriberIdChangeWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSubscriberIdChangeWorks', () => {
    it('should return an Promise<SubscriberIdChangeWork[]>', () => {
      const subscriberIdChangeWork = [
       {seqSubsId:1234, subscriberId:'sample data', newSubscriberId:'sample data', subscIdChangeRequestUser:'sample data', subscIdChangeRequestDate:'2018-01-01'},
       {seqSubsId:1234, subscriberId:'sample data', newSubscriberId:'sample data', subscIdChangeRequestUser:'sample data', subscIdChangeRequestDate:'2018-01-01'},
       {seqSubsId:1234, subscriberId:'sample data', newSubscriberId:'sample data', subscIdChangeRequestUser:'sample data', subscIdChangeRequestDate:'2018-01-01'}

      ];
      service.getSubscriberIdChangeWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/subscriberidchangeworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(subscriberIdChangeWork);
    });
  });


  describe('#createSubscriberIdChangeWork', () => {
    var id = 1;
    it('should return an Promise<SubscriberIdChangeWork>', () => {
      const subscriberIdChangeWork: SubscriberIdChangeWork = {seqSubsId:1234, subscriberId:'sample data', newSubscriberId:'sample data', subscIdChangeRequestUser:'sample data', subscIdChangeRequestDate:'2018-01-01'};
      service.createSubscriberIdChangeWork(subscriberIdChangeWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscriberidchangeworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSubscriberIdChangeWork', () => {
    var id = 1;
    it('should return an Promise<SubscriberIdChangeWork>', () => {
      const subscriberIdChangeWork: SubscriberIdChangeWork = {seqSubsId:1234, subscriberId:'sample data', newSubscriberId:'sample data', subscIdChangeRequestUser:'sample data', subscIdChangeRequestDate:'2018-01-01'};
      service.updateSubscriberIdChangeWork(subscriberIdChangeWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscriberidchangeworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSubscriberIdChangeWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSubscriberIdChangeWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscriberidchangeworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});