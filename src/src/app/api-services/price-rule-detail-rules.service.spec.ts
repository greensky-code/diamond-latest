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

import { PriceRuleDetailRulesService } from './price-rule-detail-rules.service';
import { PriceRuleDetailRules } from '../api-models/price-rule-detail-rules.model'
import { PriceRuleDetailRuleses } from "../api-models/testing/fake-price-rule-detail-rules.model"

describe('PriceRuleDetailRulesService', () => {
  let injector: TestBed;
  let service: PriceRuleDetailRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PriceRuleDetailRulesService]
    });
    injector = getTestBed();
    service = injector.get(PriceRuleDetailRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPriceRuleDetailRuleses', () => {
    it('should return an Promise<PriceRuleDetailRules[]>', () => {
      const priceRuleDetailRules = [
       {priceRule:'sample data', seqRuleDetail:1234, ruleOrder:1234, operator:'sample data', procCode1:'sample data', procCode2:'sample data', procCode3:'sample data', procCode4:'sample data', procCode5:'sample data', procCode6:'sample data', procCode7:'sample data', procCode8:'sample data', procCode9:'sample data', procCode10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {priceRule:'sample data', seqRuleDetail:1234, ruleOrder:1234, operator:'sample data', procCode1:'sample data', procCode2:'sample data', procCode3:'sample data', procCode4:'sample data', procCode5:'sample data', procCode6:'sample data', procCode7:'sample data', procCode8:'sample data', procCode9:'sample data', procCode10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {priceRule:'sample data', seqRuleDetail:1234, ruleOrder:1234, operator:'sample data', procCode1:'sample data', procCode2:'sample data', procCode3:'sample data', procCode4:'sample data', procCode5:'sample data', procCode6:'sample data', procCode7:'sample data', procCode8:'sample data', procCode9:'sample data', procCode10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPriceRuleDetailRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/priceruledetailruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(priceRuleDetailRules);
    });
  });


  describe('#createPriceRuleDetailRules', () => {
    var id = 1;
    it('should return an Promise<PriceRuleDetailRules>', () => {
      const priceRuleDetailRules: PriceRuleDetailRules = {priceRule:'sample data', seqRuleDetail:1234, ruleOrder:1234, operator:'sample data', procCode1:'sample data', procCode2:'sample data', procCode3:'sample data', procCode4:'sample data', procCode5:'sample data', procCode6:'sample data', procCode7:'sample data', procCode8:'sample data', procCode9:'sample data', procCode10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPriceRuleDetailRules(priceRuleDetailRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/priceruledetailruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePriceRuleDetailRules', () => {
    var id = 1;
    it('should return an Promise<PriceRuleDetailRules>', () => {
      const priceRuleDetailRules: PriceRuleDetailRules = {priceRule:'sample data', seqRuleDetail:1234, ruleOrder:1234, operator:'sample data', procCode1:'sample data', procCode2:'sample data', procCode3:'sample data', procCode4:'sample data', procCode5:'sample data', procCode6:'sample data', procCode7:'sample data', procCode8:'sample data', procCode9:'sample data', procCode10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePriceRuleDetailRules(priceRuleDetailRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/priceruledetailruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePriceRuleDetailRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePriceRuleDetailRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/priceruledetailruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});