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

import { SmrunSService } from './smrun-s.service';
import { SmrunS } from '../api-models/smrun-s.model'
import { SmrunSs } from "../api-models/testing/fake-smrun-s.model"

describe('SmrunSService', () => {
  let injector: TestBed;
  let service: SmrunSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmrunSService]
    });
    injector = getTestBed();
    service = injector.get(SmrunSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmrunSs', () => {
    it('should return an Promise<SmrunS[]>', () => {
      const smrunS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, runState:1234, runStarttime:'2018-01-01', runEndtime:'2018-01-01', runProgramcounter:'sample data', runFinishstate:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, runState:1234, runStarttime:'2018-01-01', runEndtime:'2018-01-01', runProgramcounter:'sample data', runFinishstate:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, runState:1234, runStarttime:'2018-01-01', runEndtime:'2018-01-01', runProgramcounter:'sample data', runFinishstate:1234}

      ];
      service.getSmrunSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smrunss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smrunS);
    });
  });


  describe('#createSmrunS', () => {
    var id = 1;
    it('should return an Promise<SmrunS>', () => {
      const smrunS: SmrunS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, runState:1234, runStarttime:'2018-01-01', runEndtime:'2018-01-01', runProgramcounter:'sample data', runFinishstate:1234};
      service.createSmrunS(smrunS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smrunss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmrunS', () => {
    var id = 1;
    it('should return an Promise<SmrunS>', () => {
      const smrunS: SmrunS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, runState:1234, runStarttime:'2018-01-01', runEndtime:'2018-01-01', runProgramcounter:'sample data', runFinishstate:1234};
      service.updateSmrunS(smrunS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smrunss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmrunS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmrunS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smrunss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});