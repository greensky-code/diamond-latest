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

import { CsfGetEntityForSubscriberService } from './csf-get-entity-for-subscriber.service';
import { CsfGetEntityForSubscriber } from '../api-models/csf-get-entity-for-subscriber.model'
import { CsfGetEntityForSubscribers } from "../api-models/testing/fake-csf-get-entity-for-subscriber.model"

describe('CsfGetEntityForSubscriberService', () => {
  let injector: TestBed;
  let service: CsfGetEntityForSubscriberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfGetEntityForSubscriberService]
    });
    injector = getTestBed();
    service = injector.get(CsfGetEntityForSubscriberService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfGetEntityForSubscribers', () => {
    it('should return an Promise<CsfGetEntityForSubscriber[]>', () => {
      const csfGetEntityForSubscriber = [
       {pSeqSubsId:1234},
       {pSeqSubsId:1234},
       {pSeqSubsId:1234}

      ];
      service.getCsfGetEntityForSubscribers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityforsubscribers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfGetEntityForSubscriber);
    });
  });


  describe('#createCsfGetEntityForSubscriber', () => {
    var id = 1;
    it('should return an Promise<CsfGetEntityForSubscriber>', () => {
      const csfGetEntityForSubscriber: CsfGetEntityForSubscriber = {pSeqSubsId:1234};
      service.createCsfGetEntityForSubscriber(csfGetEntityForSubscriber).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityforsubscribers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfGetEntityForSubscriber', () => {
    var id = 1;
    it('should return an Promise<CsfGetEntityForSubscriber>', () => {
      const csfGetEntityForSubscriber: CsfGetEntityForSubscriber = {pSeqSubsId:1234};
      service.updateCsfGetEntityForSubscriber(csfGetEntityForSubscriber, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityforsubscribers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfGetEntityForSubscriber', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfGetEntityForSubscriber(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityforsubscribers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});