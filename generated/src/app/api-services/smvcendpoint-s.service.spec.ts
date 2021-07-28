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

import { SmvcendpointSService } from './smvcendpoint-s.service';
import { SmvcendpointS } from '../api-models/smvcendpoint-s.model'
import { SmvcendpointSs } from "../api-models/testing/fake-smvcendpoint-s.model"

describe('SmvcendpointSService', () => {
  let injector: TestBed;
  let service: SmvcendpointSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmvcendpointSService]
    });
    injector = getTestBed();
    service = injector.get(SmvcendpointSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmvcendpointSs', () => {
    it('should return an Promise<SmvcendpointS[]>', () => {
      const smvcendpointS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, vcIslive:1234, vcType:1234, vcName:'sample data', vcTime:'2018-01-01', vcLastmessageno:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, vcIslive:1234, vcType:1234, vcName:'sample data', vcTime:'2018-01-01', vcLastmessageno:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, vcIslive:1234, vcType:1234, vcName:'sample data', vcTime:'2018-01-01', vcLastmessageno:1234}

      ];
      service.getSmvcendpointSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smvcendpointss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smvcendpointS);
    });
  });


  describe('#createSmvcendpointS', () => {
    var id = 1;
    it('should return an Promise<SmvcendpointS>', () => {
      const smvcendpointS: SmvcendpointS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, vcIslive:1234, vcType:1234, vcName:'sample data', vcTime:'2018-01-01', vcLastmessageno:1234};
      service.createSmvcendpointS(smvcendpointS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smvcendpointss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmvcendpointS', () => {
    var id = 1;
    it('should return an Promise<SmvcendpointS>', () => {
      const smvcendpointS: SmvcendpointS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, vcIslive:1234, vcType:1234, vcName:'sample data', vcTime:'2018-01-01', vcLastmessageno:1234};
      service.updateSmvcendpointS(smvcendpointS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smvcendpointss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmvcendpointS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmvcendpointS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smvcendpointss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});