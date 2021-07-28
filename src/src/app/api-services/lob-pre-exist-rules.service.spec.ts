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

import { LobPreExistRulesService } from './lob-pre-exist-rules.service';
import { LobPreExistRules } from '../api-models/lob-pre-exist-rules.model'
import { LobPreExistRuleses } from "../api-models/testing/fake-lob-pre-exist-rules.model"

describe('LobPreExistRulesService', () => {
  let injector: TestBed;
  let service: LobPreExistRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LobPreExistRulesService]
    });
    injector = getTestBed();
    service = injector.get(LobPreExistRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLobPreExistRuleses', () => {
    it('should return an Promise<LobPreExistRules[]>', () => {
      const lobPreExistRules = [
       {seqLbpecId:1234, lineOfBusiness:'sample data', pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', applyGroupsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLbpecId:1234, lineOfBusiness:'sample data', pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', applyGroupsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLbpecId:1234, lineOfBusiness:'sample data', pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', applyGroupsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getLobPreExistRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/lobpreexistruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(lobPreExistRules);
    });
  });


  describe('#createLobPreExistRules', () => {
    var id = 1;
    it('should return an Promise<LobPreExistRules>', () => {
      const lobPreExistRules: LobPreExistRules = {seqLbpecId:1234, lineOfBusiness:'sample data', pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', applyGroupsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createLobPreExistRules(lobPreExistRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lobpreexistruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLobPreExistRules', () => {
    var id = 1;
    it('should return an Promise<LobPreExistRules>', () => {
      const lobPreExistRules: LobPreExistRules = {seqLbpecId:1234, lineOfBusiness:'sample data', pecRuleId:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', applyGroupsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateLobPreExistRules(lobPreExistRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lobpreexistruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLobPreExistRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLobPreExistRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lobpreexistruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});