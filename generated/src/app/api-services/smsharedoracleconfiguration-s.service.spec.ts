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

import { SmsharedoracleconfigurationSService } from './smsharedoracleconfiguration-s.service';
import { SmsharedoracleconfigurationS } from '../api-models/smsharedoracleconfiguration-s.model'
import { SmsharedoracleconfigurationSs } from "../api-models/testing/fake-smsharedoracleconfiguration-s.model"

describe('SmsharedoracleconfigurationSService', () => {
  let injector: TestBed;
  let service: SmsharedoracleconfigurationSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmsharedoracleconfigurationSService]
    });
    injector = getTestBed();
    service = injector.get(SmsharedoracleconfigurationSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmsharedoracleconfigurationSs', () => {
    it('should return an Promise<SmsharedoracleconfigurationS[]>', () => {
      const smsharedoracleconfigurationS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soconfigName:'sample data', soconfigOs:'sample data', soconfigSosetting:1234, soconfigKind:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soconfigName:'sample data', soconfigOs:'sample data', soconfigSosetting:1234, soconfigKind:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soconfigName:'sample data', soconfigOs:'sample data', soconfigSosetting:1234, soconfigKind:1234}

      ];
      service.getSmsharedoracleconfigurationSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smsharedoracleconfigurationss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smsharedoracleconfigurationS);
    });
  });


  describe('#createSmsharedoracleconfigurationS', () => {
    var id = 1;
    it('should return an Promise<SmsharedoracleconfigurationS>', () => {
      const smsharedoracleconfigurationS: SmsharedoracleconfigurationS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soconfigName:'sample data', soconfigOs:'sample data', soconfigSosetting:1234, soconfigKind:1234};
      service.createSmsharedoracleconfigurationS(smsharedoracleconfigurationS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smsharedoracleconfigurationss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmsharedoracleconfigurationS', () => {
    var id = 1;
    it('should return an Promise<SmsharedoracleconfigurationS>', () => {
      const smsharedoracleconfigurationS: SmsharedoracleconfigurationS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, soconfigName:'sample data', soconfigOs:'sample data', soconfigSosetting:1234, soconfigKind:1234};
      service.updateSmsharedoracleconfigurationS(smsharedoracleconfigurationS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smsharedoracleconfigurationss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmsharedoracleconfigurationS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmsharedoracleconfigurationS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smsharedoracleconfigurationss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});