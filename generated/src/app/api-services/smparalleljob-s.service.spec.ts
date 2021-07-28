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

import { SmparalleljobSService } from './smparalleljob-s.service';
import { SmparalleljobS } from '../api-models/smparalleljob-s.model'
import { SmparalleljobSs } from "../api-models/testing/fake-smparalleljob-s.model"

describe('SmparalleljobSService', () => {
  let injector: TestBed;
  let service: SmparalleljobSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmparalleljobSService]
    });
    injector = getTestBed();
    service = injector.get(SmparalleljobSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmparalleljobSs', () => {
    it('should return an Promise<SmparalleljobS[]>', () => {
      const smparalleljobS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleljobIsselfdeleting:1234, paralleljobLastsavetime:'2018-01-01', paralleljobState:1234, paralleljobFinishstate:1234, paralleljobOemjobid:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleljobIsselfdeleting:1234, paralleljobLastsavetime:'2018-01-01', paralleljobState:1234, paralleljobFinishstate:1234, paralleljobOemjobid:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleljobIsselfdeleting:1234, paralleljobLastsavetime:'2018-01-01', paralleljobState:1234, paralleljobFinishstate:1234, paralleljobOemjobid:1234}

      ];
      service.getSmparalleljobSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smparalleljobss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smparalleljobS);
    });
  });


  describe('#createSmparalleljobS', () => {
    var id = 1;
    it('should return an Promise<SmparalleljobS>', () => {
      const smparalleljobS: SmparalleljobS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleljobIsselfdeleting:1234, paralleljobLastsavetime:'2018-01-01', paralleljobState:1234, paralleljobFinishstate:1234, paralleljobOemjobid:1234};
      service.createSmparalleljobS(smparalleljobS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smparalleljobss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmparalleljobS', () => {
    var id = 1;
    it('should return an Promise<SmparalleljobS>', () => {
      const smparalleljobS: SmparalleljobS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleljobIsselfdeleting:1234, paralleljobLastsavetime:'2018-01-01', paralleljobState:1234, paralleljobFinishstate:1234, paralleljobOemjobid:1234};
      service.updateSmparalleljobS(smparalleljobS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smparalleljobss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmparalleljobS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmparalleljobS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smparalleljobss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});