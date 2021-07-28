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

import { TimelyFilingRulesService } from './timely-filing-rules.service';
import { TimelyFilingRules } from '../api-models/timely-filing-rules.model'
import { TimelyFilingRuleses } from "../api-models/testing/fake-timely-filing-rules.model"

describe('TimelyFilingRulesService', () => {
  let injector: TestBed;
  let service: TimelyFilingRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimelyFilingRulesService]
    });
    injector = getTestBed();
    service = injector.get(TimelyFilingRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getTimelyFilingRuleses', () => {
    it('should return an Promise<TimelyFilingRules[]>', () => {
      const timelyFilingRules = [
       {seqTfrulId:1234, ruleOrder:1234, claimType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', lobSelect:'sample data', authLevelSelect:'sample data', provStatusSelect:'sample data', serviceStateSelect:'sample data', companyCodeSelect:'sample data', calcFromDate:1234, calcThruDate:1234, filingLimitDays:1234, provLimDaysFlag:'sample data', action:'sample data', reasonCode:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', placeOfServiceSelect:'sample data', revenueCodeSelect:'sample data', billTypeSelect:'sample data', applyActionToAllDtlLines:'sample data'},
       {seqTfrulId:1234, ruleOrder:1234, claimType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', lobSelect:'sample data', authLevelSelect:'sample data', provStatusSelect:'sample data', serviceStateSelect:'sample data', companyCodeSelect:'sample data', calcFromDate:1234, calcThruDate:1234, filingLimitDays:1234, provLimDaysFlag:'sample data', action:'sample data', reasonCode:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', placeOfServiceSelect:'sample data', revenueCodeSelect:'sample data', billTypeSelect:'sample data', applyActionToAllDtlLines:'sample data'},
       {seqTfrulId:1234, ruleOrder:1234, claimType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', lobSelect:'sample data', authLevelSelect:'sample data', provStatusSelect:'sample data', serviceStateSelect:'sample data', companyCodeSelect:'sample data', calcFromDate:1234, calcThruDate:1234, filingLimitDays:1234, provLimDaysFlag:'sample data', action:'sample data', reasonCode:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', placeOfServiceSelect:'sample data', revenueCodeSelect:'sample data', billTypeSelect:'sample data', applyActionToAllDtlLines:'sample data'}

      ];
      service.getTimelyFilingRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/timelyfilingruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(timelyFilingRules);
    });
  });


  describe('#createTimelyFilingRules', () => {
    var id = 1;
    it('should return an Promise<TimelyFilingRules>', () => {
      const timelyFilingRules: TimelyFilingRules = {seqTfrulId:1234, ruleOrder:1234, claimType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', lobSelect:'sample data', authLevelSelect:'sample data', provStatusSelect:'sample data', serviceStateSelect:'sample data', companyCodeSelect:'sample data', calcFromDate:1234, calcThruDate:1234, filingLimitDays:1234, provLimDaysFlag:'sample data', action:'sample data', reasonCode:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', placeOfServiceSelect:'sample data', revenueCodeSelect:'sample data', billTypeSelect:'sample data', applyActionToAllDtlLines:'sample data'};
      service.createTimelyFilingRules(timelyFilingRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/timelyfilingruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateTimelyFilingRules', () => {
    var id = 1;
    it('should return an Promise<TimelyFilingRules>', () => {
      const timelyFilingRules: TimelyFilingRules = {seqTfrulId:1234, ruleOrder:1234, claimType:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', description:'sample data', lobSelect:'sample data', authLevelSelect:'sample data', provStatusSelect:'sample data', serviceStateSelect:'sample data', companyCodeSelect:'sample data', calcFromDate:1234, calcThruDate:1234, filingLimitDays:1234, provLimDaysFlag:'sample data', action:'sample data', reasonCode:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', placeOfServiceSelect:'sample data', revenueCodeSelect:'sample data', billTypeSelect:'sample data', applyActionToAllDtlLines:'sample data'};
      service.updateTimelyFilingRules(timelyFilingRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/timelyfilingruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteTimelyFilingRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteTimelyFilingRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/timelyfilingruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});