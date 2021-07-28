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

import { LobPreExistRuleDtlService } from './lob-pre-exist-rule-dtl.service';
import { LobPreExistRuleDtl } from '../api-models/lob-pre-exist-rule-dtl.model'
import { LobPreExistRuleDtls } from "../api-models/testing/fake-lob-pre-exist-rule-dtl.model"

describe('LobPreExistRuleDtlService', () => {
  let injector: TestBed;
  let service: LobPreExistRuleDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LobPreExistRuleDtlService]
    });
    injector = getTestBed();
    service = injector.get(LobPreExistRuleDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLobPreExistRuleDtls', () => {
    it('should return an Promise<LobPreExistRuleDtl[]>', () => {
      const lobPreExistRuleDtl = [
       {seqLbpecId:1234, seqLbpecDtl:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLbpecId:1234, seqLbpecDtl:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLbpecId:1234, seqLbpecDtl:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getLobPreExistRuleDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/lobpreexistruledtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(lobPreExistRuleDtl);
    });
  });


  describe('#createLobPreExistRuleDtl', () => {
    var id = 1;
    it('should return an Promise<LobPreExistRuleDtl>', () => {
      const lobPreExistRuleDtl: LobPreExistRuleDtl = {seqLbpecId:1234, seqLbpecDtl:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createLobPreExistRuleDtl(lobPreExistRuleDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lobpreexistruledtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLobPreExistRuleDtl', () => {
    var id = 1;
    it('should return an Promise<LobPreExistRuleDtl>', () => {
      const lobPreExistRuleDtl: LobPreExistRuleDtl = {seqLbpecId:1234, seqLbpecDtl:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateLobPreExistRuleDtl(lobPreExistRuleDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lobpreexistruledtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLobPreExistRuleDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLobPreExistRuleDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lobpreexistruledtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});