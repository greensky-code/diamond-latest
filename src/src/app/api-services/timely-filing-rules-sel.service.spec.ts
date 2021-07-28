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

import { TimelyFilingRulesSelService } from './timely-filing-rules-sel.service';
import { TimelyFilingRulesSel } from '../api-models/timely-filing-rules-sel.model'
import { TimelyFilingRulesSels } from "../api-models/testing/fake-timely-filing-rules-sel.model"

describe('TimelyFilingRulesSelService', () => {
  let injector: TestBed;
  let service: TimelyFilingRulesSelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimelyFilingRulesSelService]
    });
    injector = getTestBed();
    service = injector.get(TimelyFilingRulesSelService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getTimelyFilingRulesSels', () => {
    it('should return an Promise<TimelyFilingRulesSel[]>', () => {
      const timelyFilingRulesSel = [
       {seqTfrulId:1234, seqTfrulSelect:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqTfrulId:1234, seqTfrulSelect:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqTfrulId:1234, seqTfrulSelect:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getTimelyFilingRulesSels().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/timelyfilingrulessels/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(timelyFilingRulesSel);
    });
  });


  describe('#createTimelyFilingRulesSel', () => {
    var id = 1;
    it('should return an Promise<TimelyFilingRulesSel>', () => {
      const timelyFilingRulesSel: TimelyFilingRulesSel = {seqTfrulId:1234, seqTfrulSelect:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createTimelyFilingRulesSel(timelyFilingRulesSel).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/timelyfilingrulessels`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateTimelyFilingRulesSel', () => {
    var id = 1;
    it('should return an Promise<TimelyFilingRulesSel>', () => {
      const timelyFilingRulesSel: TimelyFilingRulesSel = {seqTfrulId:1234, seqTfrulSelect:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateTimelyFilingRulesSel(timelyFilingRulesSel, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/timelyfilingrulessels/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteTimelyFilingRulesSel', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteTimelyFilingRulesSel(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/timelyfilingrulessels/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});