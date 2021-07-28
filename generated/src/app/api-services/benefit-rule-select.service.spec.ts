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

import { BenefitRuleSelectService } from './benefit-rule-select.service';
import { BenefitRuleSelect } from '../api-models/benefit-rule-select.model'
import { BenefitRuleSelects } from "../api-models/testing/fake-benefit-rule-select.model"

describe('BenefitRuleSelectService', () => {
  let injector: TestBed;
  let service: BenefitRuleSelectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BenefitRuleSelectService]
    });
    injector = getTestBed();
    service = injector.get(BenefitRuleSelectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBenefitRuleSelects', () => {
    it('should return an Promise<BenefitRuleSelect[]>', () => {
      const benefitRuleSelect = [
       {ruleId:'sample data', seqBenRuleSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', state:'sample data'},
       {ruleId:'sample data', seqBenRuleSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', state:'sample data'},
       {ruleId:'sample data', seqBenRuleSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', state:'sample data'}

      ];
      service.getBenefitRuleSelects().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/benefitruleselects/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(benefitRuleSelect);
    });
  });


  describe('#createBenefitRuleSelect', () => {
    var id = 1;
    it('should return an Promise<BenefitRuleSelect>', () => {
      const benefitRuleSelect: BenefitRuleSelect = {ruleId:'sample data', seqBenRuleSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', state:'sample data'};
      service.createBenefitRuleSelect(benefitRuleSelect).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitruleselects`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBenefitRuleSelect', () => {
    var id = 1;
    it('should return an Promise<BenefitRuleSelect>', () => {
      const benefitRuleSelect: BenefitRuleSelect = {ruleId:'sample data', seqBenRuleSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', state:'sample data'};
      service.updateBenefitRuleSelect(benefitRuleSelect, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitruleselects/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBenefitRuleSelect', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBenefitRuleSelect(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitruleselects/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});