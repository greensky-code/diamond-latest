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

import { SmparalleloperationSService } from './smparalleloperation-s.service';
import { SmparalleloperationS } from '../api-models/smparalleloperation-s.model'
import { SmparalleloperationSs } from "../api-models/testing/fake-smparalleloperation-s.model"

describe('SmparalleloperationSService', () => {
  let injector: TestBed;
  let service: SmparalleloperationSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmparalleloperationSService]
    });
    injector = getTestBed();
    service = injector.get(SmparalleloperationSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmparalleloperationSs', () => {
    it('should return an Promise<SmparalleloperationS[]>', () => {
      const smparalleloperationS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleloperationName:'sample data', paralleloperationDescription:'sample data', paralleloperationParallel:1234, builtinoperationBuiltinid:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleloperationName:'sample data', paralleloperationDescription:'sample data', paralleloperationParallel:1234, builtinoperationBuiltinid:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleloperationName:'sample data', paralleloperationDescription:'sample data', paralleloperationParallel:1234, builtinoperationBuiltinid:1234}

      ];
      service.getSmparalleloperationSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smparalleloperationss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smparalleloperationS);
    });
  });


  describe('#createSmparalleloperationS', () => {
    var id = 1;
    it('should return an Promise<SmparalleloperationS>', () => {
      const smparalleloperationS: SmparalleloperationS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleloperationName:'sample data', paralleloperationDescription:'sample data', paralleloperationParallel:1234, builtinoperationBuiltinid:1234};
      service.createSmparalleloperationS(smparalleloperationS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smparalleloperationss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmparalleloperationS', () => {
    var id = 1;
    it('should return an Promise<SmparalleloperationS>', () => {
      const smparalleloperationS: SmparalleloperationS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, paralleloperationName:'sample data', paralleloperationDescription:'sample data', paralleloperationParallel:1234, builtinoperationBuiltinid:1234};
      service.updateSmparalleloperationS(smparalleloperationS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smparalleloperationss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmparalleloperationS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmparalleloperationS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smparalleloperationss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});