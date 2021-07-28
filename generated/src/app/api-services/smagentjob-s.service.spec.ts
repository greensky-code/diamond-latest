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

import { SmagentjobSService } from './smagentjob-s.service';
import { SmagentjobS } from '../api-models/smagentjob-s.model'
import { SmagentjobSs } from "../api-models/testing/fake-smagentjob-s.model"

describe('SmagentjobSService', () => {
  let injector: TestBed;
  let service: SmagentjobSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmagentjobSService]
    });
    injector = getTestBed();
    service = injector.get(SmagentjobSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmagentjobSs', () => {
    it('should return an Promise<SmagentjobS[]>', () => {
      const smagentjobS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, agentjobState:1234, agentjobFinishstate:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, agentjobState:1234, agentjobFinishstate:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, agentjobState:1234, agentjobFinishstate:1234}

      ];
      service.getSmagentjobSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smagentjobss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smagentjobS);
    });
  });


  describe('#createSmagentjobS', () => {
    var id = 1;
    it('should return an Promise<SmagentjobS>', () => {
      const smagentjobS: SmagentjobS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, agentjobState:1234, agentjobFinishstate:1234};
      service.createSmagentjobS(smagentjobS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smagentjobss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmagentjobS', () => {
    var id = 1;
    it('should return an Promise<SmagentjobS>', () => {
      const smagentjobS: SmagentjobS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, agentjobState:1234, agentjobFinishstate:1234};
      service.updateSmagentjobS(smagentjobS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smagentjobss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmagentjobS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmagentjobS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smagentjobss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});