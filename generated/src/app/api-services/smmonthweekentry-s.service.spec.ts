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

import { SmmonthweekentrySService } from './smmonthweekentry-s.service';
import { SmmonthweekentryS } from '../api-models/smmonthweekentry-s.model'
import { SmmonthweekentrySs } from "../api-models/testing/fake-smmonthweekentry-s.model"

describe('SmmonthweekentrySService', () => {
  let injector: TestBed;
  let service: SmmonthweekentrySService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmmonthweekentrySService]
    });
    injector = getTestBed();
    service = injector.get(SmmonthweekentrySService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmmonthweekentrySs', () => {
    it('should return an Promise<SmmonthweekentryS[]>', () => {
      const smmonthweekentryS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthweekentryDayWkofmon:1234, monthweekentryDayDofwk:1234, monthweekentryTofdaySpm:1234, monthweekentryTofdayZone:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthweekentryDayWkofmon:1234, monthweekentryDayDofwk:1234, monthweekentryTofdaySpm:1234, monthweekentryTofdayZone:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthweekentryDayWkofmon:1234, monthweekentryDayDofwk:1234, monthweekentryTofdaySpm:1234, monthweekentryTofdayZone:1234}

      ];
      service.getSmmonthweekentrySs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smmonthweekentryss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smmonthweekentryS);
    });
  });


  describe('#createSmmonthweekentryS', () => {
    var id = 1;
    it('should return an Promise<SmmonthweekentryS>', () => {
      const smmonthweekentryS: SmmonthweekentryS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthweekentryDayWkofmon:1234, monthweekentryDayDofwk:1234, monthweekentryTofdaySpm:1234, monthweekentryTofdayZone:1234};
      service.createSmmonthweekentryS(smmonthweekentryS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smmonthweekentryss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmmonthweekentryS', () => {
    var id = 1;
    it('should return an Promise<SmmonthweekentryS>', () => {
      const smmonthweekentryS: SmmonthweekentryS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthweekentryDayWkofmon:1234, monthweekentryDayDofwk:1234, monthweekentryTofdaySpm:1234, monthweekentryTofdayZone:1234};
      service.updateSmmonthweekentryS(smmonthweekentryS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smmonthweekentryss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmmonthweekentryS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmmonthweekentryS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smmonthweekentryss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});