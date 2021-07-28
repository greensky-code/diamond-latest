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

import { SmconsolesosettingSService } from './smconsolesosetting-s.service';
import { SmconsolesosettingS } from '../api-models/smconsolesosetting-s.model'
import { SmconsolesosettingSs } from "../api-models/testing/fake-smconsolesosetting-s.model"

describe('SmconsolesosettingSService', () => {
  let injector: TestBed;
  let service: SmconsolesosettingSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmconsolesosettingSService]
    });
    injector = getTestBed();
    service = injector.get(SmconsolesosettingSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmconsolesosettingSs', () => {
    it('should return an Promise<SmconsolesosettingS[]>', () => {
      const smconsolesosettingS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, csosettingSosetting:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, csosettingSosetting:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, csosettingSosetting:1234}

      ];
      service.getSmconsolesosettingSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smconsolesosettingss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smconsolesosettingS);
    });
  });


  describe('#createSmconsolesosettingS', () => {
    var id = 1;
    it('should return an Promise<SmconsolesosettingS>', () => {
      const smconsolesosettingS: SmconsolesosettingS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, csosettingSosetting:1234};
      service.createSmconsolesosettingS(smconsolesosettingS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smconsolesosettingss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmconsolesosettingS', () => {
    var id = 1;
    it('should return an Promise<SmconsolesosettingS>', () => {
      const smconsolesosettingS: SmconsolesosettingS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, csosettingSosetting:1234};
      service.updateSmconsolesosettingS(smconsolesosettingS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smconsolesosettingss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmconsolesosettingS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmconsolesosettingS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smconsolesosettingss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});