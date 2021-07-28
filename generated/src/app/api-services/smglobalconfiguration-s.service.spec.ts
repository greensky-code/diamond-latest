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

import { SmglobalconfigurationSService } from './smglobalconfiguration-s.service';
import { SmglobalconfigurationS } from '../api-models/smglobalconfiguration-s.model'
import { SmglobalconfigurationSs } from "../api-models/testing/fake-smglobalconfiguration-s.model"

describe('SmglobalconfigurationSService', () => {
  let injector: TestBed;
  let service: SmglobalconfigurationSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmglobalconfigurationSService]
    });
    injector = getTestBed();
    service = injector.get(SmglobalconfigurationSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmglobalconfigurationSs', () => {
    it('should return an Promise<SmglobalconfigurationS[]>', () => {
      const smglobalconfigurationS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, gconfigVersion:'sample data', cconfigName:'sample data', cconfigTime:'2018-01-01', hconfigSosetting:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, gconfigVersion:'sample data', cconfigName:'sample data', cconfigTime:'2018-01-01', hconfigSosetting:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, gconfigVersion:'sample data', cconfigName:'sample data', cconfigTime:'2018-01-01', hconfigSosetting:1234}

      ];
      service.getSmglobalconfigurationSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smglobalconfigurationss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smglobalconfigurationS);
    });
  });


  describe('#createSmglobalconfigurationS', () => {
    var id = 1;
    it('should return an Promise<SmglobalconfigurationS>', () => {
      const smglobalconfigurationS: SmglobalconfigurationS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, gconfigVersion:'sample data', cconfigName:'sample data', cconfigTime:'2018-01-01', hconfigSosetting:1234};
      service.createSmglobalconfigurationS(smglobalconfigurationS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smglobalconfigurationss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmglobalconfigurationS', () => {
    var id = 1;
    it('should return an Promise<SmglobalconfigurationS>', () => {
      const smglobalconfigurationS: SmglobalconfigurationS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, gconfigVersion:'sample data', cconfigName:'sample data', cconfigTime:'2018-01-01', hconfigSosetting:1234};
      service.updateSmglobalconfigurationS(smglobalconfigurationS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smglobalconfigurationss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmglobalconfigurationS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmglobalconfigurationS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smglobalconfigurationss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});