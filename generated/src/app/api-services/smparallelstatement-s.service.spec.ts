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

import { SmparallelstatementSService } from './smparallelstatement-s.service';
import { SmparallelstatementS } from '../api-models/smparallelstatement-s.model'
import { SmparallelstatementSs } from "../api-models/testing/fake-smparallelstatement-s.model"

describe('SmparallelstatementSService', () => {
  let injector: TestBed;
  let service: SmparallelstatementSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmparallelstatementSService]
    });
    injector = getTestBed();
    service = injector.get(SmparallelstatementSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmparallelstatementSs', () => {
    it('should return an Promise<SmparallelstatementS[]>', () => {
      const smparallelstatementS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, parallelstatementPosition:1234, parallelstatementContinue:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, parallelstatementPosition:1234, parallelstatementContinue:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, parallelstatementPosition:1234, parallelstatementContinue:1234}

      ];
      service.getSmparallelstatementSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smparallelstatementss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smparallelstatementS);
    });
  });


  describe('#createSmparallelstatementS', () => {
    var id = 1;
    it('should return an Promise<SmparallelstatementS>', () => {
      const smparallelstatementS: SmparallelstatementS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, parallelstatementPosition:1234, parallelstatementContinue:1234};
      service.createSmparallelstatementS(smparallelstatementS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smparallelstatementss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmparallelstatementS', () => {
    var id = 1;
    it('should return an Promise<SmparallelstatementS>', () => {
      const smparallelstatementS: SmparallelstatementS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, parallelstatementPosition:1234, parallelstatementContinue:1234};
      service.updateSmparallelstatementS(smparallelstatementS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smparallelstatementss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmparallelstatementS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmparallelstatementS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smparallelstatementss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});