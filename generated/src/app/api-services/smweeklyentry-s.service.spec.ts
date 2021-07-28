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

import { SmweeklyentrySService } from './smweeklyentry-s.service';
import { SmweeklyentryS } from '../api-models/smweeklyentry-s.model'
import { SmweeklyentrySs } from "../api-models/testing/fake-smweeklyentry-s.model"

describe('SmweeklyentrySService', () => {
  let injector: TestBed;
  let service: SmweeklyentrySService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmweeklyentrySService]
    });
    injector = getTestBed();
    service = injector.get(SmweeklyentrySService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmweeklyentrySs', () => {
    it('should return an Promise<SmweeklyentryS[]>', () => {
      const smweeklyentryS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, weeklyentryDay:1234, weeklyentryTofdaySpm:1234, weeklyentryTofdayZone:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, weeklyentryDay:1234, weeklyentryTofdaySpm:1234, weeklyentryTofdayZone:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, weeklyentryDay:1234, weeklyentryTofdaySpm:1234, weeklyentryTofdayZone:1234}

      ];
      service.getSmweeklyentrySs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smweeklyentryss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smweeklyentryS);
    });
  });


  describe('#createSmweeklyentryS', () => {
    var id = 1;
    it('should return an Promise<SmweeklyentryS>', () => {
      const smweeklyentryS: SmweeklyentryS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, weeklyentryDay:1234, weeklyentryTofdaySpm:1234, weeklyentryTofdayZone:1234};
      service.createSmweeklyentryS(smweeklyentryS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smweeklyentryss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmweeklyentryS', () => {
    var id = 1;
    it('should return an Promise<SmweeklyentryS>', () => {
      const smweeklyentryS: SmweeklyentryS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, weeklyentryDay:1234, weeklyentryTofdaySpm:1234, weeklyentryTofdayZone:1234};
      service.updateSmweeklyentryS(smweeklyentryS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smweeklyentryss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmweeklyentryS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmweeklyentryS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smweeklyentryss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});