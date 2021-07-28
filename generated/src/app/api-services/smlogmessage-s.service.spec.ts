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

import { SmlogmessageSService } from './smlogmessage-s.service';
import { SmlogmessageS } from '../api-models/smlogmessage-s.model'
import { SmlogmessageSs } from "../api-models/testing/fake-smlogmessage-s.model"

describe('SmlogmessageSService', () => {
  let injector: TestBed;
  let service: SmlogmessageSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmlogmessageSService]
    });
    injector = getTestBed();
    service = injector.get(SmlogmessageSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmlogmessageSs', () => {
    it('should return an Promise<SmlogmessageS[]>', () => {
      const smlogmessageS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, logmessageTime:'2018-01-01', logmessageProgramcounter:'sample data', logmessageMessage:'sample data', logmessageKind:1234, logmessagePriority:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, logmessageTime:'2018-01-01', logmessageProgramcounter:'sample data', logmessageMessage:'sample data', logmessageKind:1234, logmessagePriority:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, logmessageTime:'2018-01-01', logmessageProgramcounter:'sample data', logmessageMessage:'sample data', logmessageKind:1234, logmessagePriority:1234}

      ];
      service.getSmlogmessageSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smlogmessagess/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smlogmessageS);
    });
  });


  describe('#createSmlogmessageS', () => {
    var id = 1;
    it('should return an Promise<SmlogmessageS>', () => {
      const smlogmessageS: SmlogmessageS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, logmessageTime:'2018-01-01', logmessageProgramcounter:'sample data', logmessageMessage:'sample data', logmessageKind:1234, logmessagePriority:1234};
      service.createSmlogmessageS(smlogmessageS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smlogmessagess`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmlogmessageS', () => {
    var id = 1;
    it('should return an Promise<SmlogmessageS>', () => {
      const smlogmessageS: SmlogmessageS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, logmessageTime:'2018-01-01', logmessageProgramcounter:'sample data', logmessageMessage:'sample data', logmessageKind:1234, logmessagePriority:1234};
      service.updateSmlogmessageS(smlogmessageS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smlogmessagess/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmlogmessageS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmlogmessageS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smlogmessagess/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});