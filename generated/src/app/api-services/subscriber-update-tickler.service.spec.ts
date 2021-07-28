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

import { SubscriberUpdateTicklerService } from './subscriber-update-tickler.service';
import { SubscriberUpdateTickler } from '../api-models/subscriber-update-tickler.model'
import { SubscriberUpdateTicklers } from "../api-models/testing/fake-subscriber-update-tickler.model"

describe('SubscriberUpdateTicklerService', () => {
  let injector: TestBed;
  let service: SubscriberUpdateTicklerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscriberUpdateTicklerService]
    });
    injector = getTestBed();
    service = injector.get(SubscriberUpdateTicklerService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSubscriberUpdateTicklers', () => {
    it('should return an Promise<SubscriberUpdateTickler[]>', () => {
      const subscriberUpdateTickler = [
       {seqSubsId:1234},
       {seqSubsId:1234},
       {seqSubsId:1234}

      ];
      service.getSubscriberUpdateTicklers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/subscriberupdateticklers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(subscriberUpdateTickler);
    });
  });


  describe('#createSubscriberUpdateTickler', () => {
    var id = 1;
    it('should return an Promise<SubscriberUpdateTickler>', () => {
      const subscriberUpdateTickler: SubscriberUpdateTickler = {seqSubsId:1234};
      service.createSubscriberUpdateTickler(subscriberUpdateTickler).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscriberupdateticklers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSubscriberUpdateTickler', () => {
    var id = 1;
    it('should return an Promise<SubscriberUpdateTickler>', () => {
      const subscriberUpdateTickler: SubscriberUpdateTickler = {seqSubsId:1234};
      service.updateSubscriberUpdateTickler(subscriberUpdateTickler, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscriberupdateticklers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSubscriberUpdateTickler', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSubscriberUpdateTickler(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscriberupdateticklers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});