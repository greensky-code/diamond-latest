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

import { SmreleaseSService } from './smrelease-s.service';
import { SmreleaseS } from '../api-models/smrelease-s.model'
import { SmreleaseSs } from "../api-models/testing/fake-smrelease-s.model"

describe('SmreleaseSService', () => {
  let injector: TestBed;
  let service: SmreleaseSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmreleaseSService]
    });
    injector = getTestBed();
    service = injector.get(SmreleaseSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmreleaseSs', () => {
    it('should return an Promise<SmreleaseS[]>', () => {
      const smreleaseS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, releaseState:1234, releaseMediatype:1234, releaseProdfiletype:1234, releaseLocation:'sample data', releaseDescription:'sample data', releasePartnumber:'sample data', releaseThirdpartyreleasepram:'sample data', releaseUserremark:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, releaseState:1234, releaseMediatype:1234, releaseProdfiletype:1234, releaseLocation:'sample data', releaseDescription:'sample data', releasePartnumber:'sample data', releaseThirdpartyreleasepram:'sample data', releaseUserremark:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, releaseState:1234, releaseMediatype:1234, releaseProdfiletype:1234, releaseLocation:'sample data', releaseDescription:'sample data', releasePartnumber:'sample data', releaseThirdpartyreleasepram:'sample data', releaseUserremark:'sample data'}

      ];
      service.getSmreleaseSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smreleasess/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smreleaseS);
    });
  });


  describe('#createSmreleaseS', () => {
    var id = 1;
    it('should return an Promise<SmreleaseS>', () => {
      const smreleaseS: SmreleaseS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, releaseState:1234, releaseMediatype:1234, releaseProdfiletype:1234, releaseLocation:'sample data', releaseDescription:'sample data', releasePartnumber:'sample data', releaseThirdpartyreleasepram:'sample data', releaseUserremark:'sample data'};
      service.createSmreleaseS(smreleaseS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smreleasess`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmreleaseS', () => {
    var id = 1;
    it('should return an Promise<SmreleaseS>', () => {
      const smreleaseS: SmreleaseS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, releaseState:1234, releaseMediatype:1234, releaseProdfiletype:1234, releaseLocation:'sample data', releaseDescription:'sample data', releasePartnumber:'sample data', releaseThirdpartyreleasepram:'sample data', releaseUserremark:'sample data'};
      service.updateSmreleaseS(smreleaseS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smreleasess/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmreleaseS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmreleaseS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smreleasess/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});