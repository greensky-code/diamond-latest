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

import { SmactualparameterSService } from './smactualparameter-s.service';
import { SmactualparameterS } from '../api-models/smactualparameter-s.model'
import { SmactualparameterSs } from "../api-models/testing/fake-smactualparameter-s.model"

describe('SmactualparameterSService', () => {
  let injector: TestBed;
  let service: SmactualparameterSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmactualparameterSService]
    });
    injector = getTestBed();
    service = injector.get(SmactualparameterSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmactualparameterSs', () => {
    it('should return an Promise<SmactualparameterS[]>', () => {
      const smactualparameterS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, numberparameterValue:1234, stringparameterValue:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, numberparameterValue:1234, stringparameterValue:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, numberparameterValue:1234, stringparameterValue:'sample data'}

      ];
      service.getSmactualparameterSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smactualparameterss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smactualparameterS);
    });
  });


  describe('#createSmactualparameterS', () => {
    var id = 1;
    it('should return an Promise<SmactualparameterS>', () => {
      const smactualparameterS: SmactualparameterS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, numberparameterValue:1234, stringparameterValue:'sample data'};
      service.createSmactualparameterS(smactualparameterS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smactualparameterss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmactualparameterS', () => {
    var id = 1;
    it('should return an Promise<SmactualparameterS>', () => {
      const smactualparameterS: SmactualparameterS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, numberparameterValue:1234, stringparameterValue:'sample data'};
      service.updateSmactualparameterS(smactualparameterS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smactualparameterss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmactualparameterS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmactualparameterS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smactualparameterss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});