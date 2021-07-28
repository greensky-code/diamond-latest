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

import { SmdbauthSService } from './smdbauth-s.service';
import { SmdbauthS } from '../api-models/smdbauth-s.model'
import { SmdbauthSs } from "../api-models/testing/fake-smdbauth-s.model"

describe('SmdbauthSService', () => {
  let injector: TestBed;
  let service: SmdbauthSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmdbauthSService]
    });
    injector = getTestBed();
    service = injector.get(SmdbauthSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmdbauthSs', () => {
    it('should return an Promise<SmdbauthS[]>', () => {
      const smdbauthS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, dbauthConsoleuser:'sample data', dbauthDbusername:'sample data', dbauthIsdbusernameset:1234, dbauthDbpassword:'sample data', dbauthIsdbpasswordset:1234, dbauthInternalpassword:'sample data', dbauthIsinternalpasswordset:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, dbauthConsoleuser:'sample data', dbauthDbusername:'sample data', dbauthIsdbusernameset:1234, dbauthDbpassword:'sample data', dbauthIsdbpasswordset:1234, dbauthInternalpassword:'sample data', dbauthIsinternalpasswordset:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, dbauthConsoleuser:'sample data', dbauthDbusername:'sample data', dbauthIsdbusernameset:1234, dbauthDbpassword:'sample data', dbauthIsdbpasswordset:1234, dbauthInternalpassword:'sample data', dbauthIsinternalpasswordset:1234}

      ];
      service.getSmdbauthSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smdbauthss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smdbauthS);
    });
  });


  describe('#createSmdbauthS', () => {
    var id = 1;
    it('should return an Promise<SmdbauthS>', () => {
      const smdbauthS: SmdbauthS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, dbauthConsoleuser:'sample data', dbauthDbusername:'sample data', dbauthIsdbusernameset:1234, dbauthDbpassword:'sample data', dbauthIsdbpasswordset:1234, dbauthInternalpassword:'sample data', dbauthIsinternalpasswordset:1234};
      service.createSmdbauthS(smdbauthS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdbauthss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmdbauthS', () => {
    var id = 1;
    it('should return an Promise<SmdbauthS>', () => {
      const smdbauthS: SmdbauthS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, dbauthConsoleuser:'sample data', dbauthDbusername:'sample data', dbauthIsdbusernameset:1234, dbauthDbpassword:'sample data', dbauthIsdbpasswordset:1234, dbauthInternalpassword:'sample data', dbauthIsinternalpasswordset:1234};
      service.updateSmdbauthS(smdbauthS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdbauthss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmdbauthS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmdbauthS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdbauthss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});