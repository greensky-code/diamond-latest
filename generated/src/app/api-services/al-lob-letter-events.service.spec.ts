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

import { AlLobLetterEventsService } from './al-lob-letter-events.service';
import { AlLobLetterEvents } from '../api-models/al-lob-letter-events.model'
import { AlLobLetterEventss } from "../api-models/testing/fake-al-lob-letter-events.model"

describe('AlLobLetterEventsService', () => {
  let injector: TestBed;
  let service: AlLobLetterEventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlLobLetterEventsService]
    });
    injector = getTestBed();
    service = injector.get(AlLobLetterEventsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAlLobLetterEventss', () => {
    it('should return an Promise<AlLobLetterEvents[]>', () => {
      const alLobLetterEvents = [
       {lineOfBusiness:'sample data', letterEventId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', replaceFlag:'sample data'},
       {lineOfBusiness:'sample data', letterEventId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', replaceFlag:'sample data'},
       {lineOfBusiness:'sample data', letterEventId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', replaceFlag:'sample data'}

      ];
      service.getAlLobLetterEventss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/alloblettereventss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(alLobLetterEvents);
    });
  });


  describe('#createAlLobLetterEvents', () => {
    var id = 1;
    it('should return an Promise<AlLobLetterEvents>', () => {
      const alLobLetterEvents: AlLobLetterEvents = {lineOfBusiness:'sample data', letterEventId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', replaceFlag:'sample data'};
      service.createAlLobLetterEvents(alLobLetterEvents).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alloblettereventss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAlLobLetterEvents', () => {
    var id = 1;
    it('should return an Promise<AlLobLetterEvents>', () => {
      const alLobLetterEvents: AlLobLetterEvents = {lineOfBusiness:'sample data', letterEventId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', replaceFlag:'sample data'};
      service.updateAlLobLetterEvents(alLobLetterEvents, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alloblettereventss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAlLobLetterEvents', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAlLobLetterEvents(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alloblettereventss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});