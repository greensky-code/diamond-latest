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

import { SmmonthlyentrySService } from './smmonthlyentry-s.service';
import { SmmonthlyentryS } from '../api-models/smmonthlyentry-s.model'
import { SmmonthlyentrySs } from "../api-models/testing/fake-smmonthlyentry-s.model"

describe('SmmonthlyentrySService', () => {
  let injector: TestBed;
  let service: SmmonthlyentrySService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmmonthlyentrySService]
    });
    injector = getTestBed();
    service = injector.get(SmmonthlyentrySService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmmonthlyentrySs', () => {
    it('should return an Promise<SmmonthlyentryS[]>', () => {
      const smmonthlyentryS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthlyentryDay:1234, monthlyentryTofdaySpm:1234, monthlyentryTofdayZone:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthlyentryDay:1234, monthlyentryTofdaySpm:1234, monthlyentryTofdayZone:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthlyentryDay:1234, monthlyentryTofdaySpm:1234, monthlyentryTofdayZone:1234}

      ];
      service.getSmmonthlyentrySs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smmonthlyentryss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smmonthlyentryS);
    });
  });


  describe('#createSmmonthlyentryS', () => {
    var id = 1;
    it('should return an Promise<SmmonthlyentryS>', () => {
      const smmonthlyentryS: SmmonthlyentryS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthlyentryDay:1234, monthlyentryTofdaySpm:1234, monthlyentryTofdayZone:1234};
      service.createSmmonthlyentryS(smmonthlyentryS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smmonthlyentryss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmmonthlyentryS', () => {
    var id = 1;
    it('should return an Promise<SmmonthlyentryS>', () => {
      const smmonthlyentryS: SmmonthlyentryS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, monthlyentryDay:1234, monthlyentryTofdaySpm:1234, monthlyentryTofdayZone:1234};
      service.updateSmmonthlyentryS(smmonthlyentryS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smmonthlyentryss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmmonthlyentryS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmmonthlyentryS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smmonthlyentryss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});