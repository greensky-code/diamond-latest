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

import { AlLetterEventTicklerService } from './al-letter-event-tickler.service';
import { AlLetterEventTickler } from '../api-models/al-letter-event-tickler.model'
import { AlLetterEventTicklers } from "../api-models/testing/fake-al-letter-event-tickler.model"

describe('AlLetterEventTicklerService', () => {
  let injector: TestBed;
  let service: AlLetterEventTicklerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlLetterEventTicklerService]
    });
    injector = getTestBed();
    service = injector.get(AlLetterEventTicklerService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAlLetterEventTicklers', () => {
    it('should return an Promise<AlLetterEventTickler[]>', () => {
      const alLetterEventTickler = [
       {seqLetterEventId:1234, letterEventId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterEventId:1234, letterEventId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterEventId:1234, letterEventId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAlLetterEventTicklers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/allettereventticklers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(alLetterEventTickler);
    });
  });


  describe('#createAlLetterEventTickler', () => {
    var id = 1;
    it('should return an Promise<AlLetterEventTickler>', () => {
      const alLetterEventTickler: AlLetterEventTickler = {seqLetterEventId:1234, letterEventId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAlLetterEventTickler(alLetterEventTickler).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/allettereventticklers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAlLetterEventTickler', () => {
    var id = 1;
    it('should return an Promise<AlLetterEventTickler>', () => {
      const alLetterEventTickler: AlLetterEventTickler = {seqLetterEventId:1234, letterEventId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAlLetterEventTickler(alLetterEventTickler, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/allettereventticklers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAlLetterEventTickler', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAlLetterEventTickler(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/allettereventticklers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});