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

import { SmomstringSService } from './smomstring-s.service';
import { SmomstringS } from '../api-models/smomstring-s.model'
import { SmomstringSs } from "../api-models/testing/fake-smomstring-s.model"

describe('SmomstringSService', () => {
  let injector: TestBed;
  let service: SmomstringSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmomstringSService]
    });
    injector = getTestBed();
    service = injector.get(SmomstringSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmomstringSs', () => {
    it('should return an Promise<SmomstringS[]>', () => {
      const smomstringS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, omstringValue:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, omstringValue:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, omstringValue:'sample data'}

      ];
      service.getSmomstringSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smomstringss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smomstringS);
    });
  });


  describe('#createSmomstringS', () => {
    var id = 1;
    it('should return an Promise<SmomstringS>', () => {
      const smomstringS: SmomstringS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, omstringValue:'sample data'};
      service.createSmomstringS(smomstringS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smomstringss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmomstringS', () => {
    var id = 1;
    it('should return an Promise<SmomstringS>', () => {
      const smomstringS: SmomstringS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, omstringValue:'sample data'};
      service.updateSmomstringS(smomstringS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smomstringss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmomstringS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmomstringS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smomstringss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});