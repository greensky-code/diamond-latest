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

import { SmsharedoracleclientSService } from './smsharedoracleclient-s.service';
import { SmsharedoracleclientS } from '../api-models/smsharedoracleclient-s.model'
import { SmsharedoracleclientSs } from "../api-models/testing/fake-smsharedoracleclient-s.model"

describe('SmsharedoracleclientSService', () => {
  let injector: TestBed;
  let service: SmsharedoracleclientSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmsharedoracleclientSService]
    });
    injector = getTestBed();
    service = injector.get(SmsharedoracleclientSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmsharedoracleclientSs', () => {
    it('should return an Promise<SmsharedoracleclientS[]>', () => {
      const smsharedoracleclientS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soclientName:'sample data', soclientOs:'sample data', soclientOsver:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soclientName:'sample data', soclientOs:'sample data', soclientOsver:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soclientName:'sample data', soclientOs:'sample data', soclientOsver:'sample data'}

      ];
      service.getSmsharedoracleclientSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smsharedoracleclientss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smsharedoracleclientS);
    });
  });


  describe('#createSmsharedoracleclientS', () => {
    var id = 1;
    it('should return an Promise<SmsharedoracleclientS>', () => {
      const smsharedoracleclientS: SmsharedoracleclientS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soclientName:'sample data', soclientOs:'sample data', soclientOsver:'sample data'};
      service.createSmsharedoracleclientS(smsharedoracleclientS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smsharedoracleclientss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmsharedoracleclientS', () => {
    var id = 1;
    it('should return an Promise<SmsharedoracleclientS>', () => {
      const smsharedoracleclientS: SmsharedoracleclientS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soclientName:'sample data', soclientOs:'sample data', soclientOsver:'sample data'};
      service.updateSmsharedoracleclientS(smsharedoracleclientS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smsharedoracleclientss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmsharedoracleclientS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmsharedoracleclientS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smsharedoracleclientss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});