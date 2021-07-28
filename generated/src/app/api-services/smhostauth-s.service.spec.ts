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

import { SmhostauthSService } from './smhostauth-s.service';
import { SmhostauthS } from '../api-models/smhostauth-s.model'
import { SmhostauthSs } from "../api-models/testing/fake-smhostauth-s.model"

describe('SmhostauthSService', () => {
  let injector: TestBed;
  let service: SmhostauthSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmhostauthSService]
    });
    injector = getTestBed();
    service = injector.get(SmhostauthSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmhostauthSs', () => {
    it('should return an Promise<SmhostauthS[]>', () => {
      const smhostauthS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostauthConsoleuser:'sample data', hostauthOsusername:'sample data', hostauthIsosusernameset:1234, hostauthOspassword:'sample data', hostauthIsospasswordset:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostauthConsoleuser:'sample data', hostauthOsusername:'sample data', hostauthIsosusernameset:1234, hostauthOspassword:'sample data', hostauthIsospasswordset:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostauthConsoleuser:'sample data', hostauthOsusername:'sample data', hostauthIsosusernameset:1234, hostauthOspassword:'sample data', hostauthIsospasswordset:1234}

      ];
      service.getSmhostauthSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smhostauthss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smhostauthS);
    });
  });


  describe('#createSmhostauthS', () => {
    var id = 1;
    it('should return an Promise<SmhostauthS>', () => {
      const smhostauthS: SmhostauthS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostauthConsoleuser:'sample data', hostauthOsusername:'sample data', hostauthIsosusernameset:1234, hostauthOspassword:'sample data', hostauthIsospasswordset:1234};
      service.createSmhostauthS(smhostauthS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smhostauthss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmhostauthS', () => {
    var id = 1;
    it('should return an Promise<SmhostauthS>', () => {
      const smhostauthS: SmhostauthS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostauthConsoleuser:'sample data', hostauthOsusername:'sample data', hostauthIsosusernameset:1234, hostauthOspassword:'sample data', hostauthIsospasswordset:1234};
      service.updateSmhostauthS(smhostauthS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smhostauthss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmhostauthS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmhostauthS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smhostauthss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});