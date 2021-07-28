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

import { BenefitRuleService } from './benefit-rule.service';
import { BenefitRule } from '../api-models/benefit-rule.model'
import { BenefitRules } from "../api-models/testing/fake-benefit-rule.model"

describe('BenefitRuleService', () => {
  let injector: TestBed;
  let service: BenefitRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BenefitRuleService]
    });
    injector = getTestBed();
    service = injector.get(BenefitRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBenefitRules', () => {
    it('should return an Promise<BenefitRule[]>', () => {
      const benefitRule = [
       {ruleId:'sample data', ruleType:'sample data', shortDescription:'sample data', medDefFilter:'sample data', narrative:'sample data', attributeChar1:'sample data', attributeChar2:'sample data', attributeChar3:'sample data', attributeChar4:'sample data', attributeChar5:'sample data', attributeChar6:'sample data', attributeChar7:'sample data', attributeChar8:'sample data', attributeChar9:'sample data', attributeChar10:'sample data', attributeChar11:'sample data', attributeChar12:'sample data', attributeChar13:'sample data', attributeChar14:'sample data', attributeChar15:'sample data', attributeNum1:1234, attributeNum2:1234, attributeNum3:1234, attributeNum4:1234, attributeNum5:1234, attributeNum6:1234, attributeNum7:1234, attributeNum8:1234, attributeNum9:1234, attributeNum10:1234, attributeDate1:'2018-01-01', attributeDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', multiplyByQty:'sample data'},
       {ruleId:'sample data', ruleType:'sample data', shortDescription:'sample data', medDefFilter:'sample data', narrative:'sample data', attributeChar1:'sample data', attributeChar2:'sample data', attributeChar3:'sample data', attributeChar4:'sample data', attributeChar5:'sample data', attributeChar6:'sample data', attributeChar7:'sample data', attributeChar8:'sample data', attributeChar9:'sample data', attributeChar10:'sample data', attributeChar11:'sample data', attributeChar12:'sample data', attributeChar13:'sample data', attributeChar14:'sample data', attributeChar15:'sample data', attributeNum1:1234, attributeNum2:1234, attributeNum3:1234, attributeNum4:1234, attributeNum5:1234, attributeNum6:1234, attributeNum7:1234, attributeNum8:1234, attributeNum9:1234, attributeNum10:1234, attributeDate1:'2018-01-01', attributeDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', multiplyByQty:'sample data'},
       {ruleId:'sample data', ruleType:'sample data', shortDescription:'sample data', medDefFilter:'sample data', narrative:'sample data', attributeChar1:'sample data', attributeChar2:'sample data', attributeChar3:'sample data', attributeChar4:'sample data', attributeChar5:'sample data', attributeChar6:'sample data', attributeChar7:'sample data', attributeChar8:'sample data', attributeChar9:'sample data', attributeChar10:'sample data', attributeChar11:'sample data', attributeChar12:'sample data', attributeChar13:'sample data', attributeChar14:'sample data', attributeChar15:'sample data', attributeNum1:1234, attributeNum2:1234, attributeNum3:1234, attributeNum4:1234, attributeNum5:1234, attributeNum6:1234, attributeNum7:1234, attributeNum8:1234, attributeNum9:1234, attributeNum10:1234, attributeDate1:'2018-01-01', attributeDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', multiplyByQty:'sample data'}

      ];
      service.getBenefitRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/benefitrules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(benefitRule);
    });
  });


  describe('#createBenefitRule', () => {
    var id = 1;
    it('should return an Promise<BenefitRule>', () => {
      const benefitRule: BenefitRule = {ruleId:'sample data', ruleType:'sample data', shortDescription:'sample data', medDefFilter:'sample data', narrative:'sample data', attributeChar1:'sample data', attributeChar2:'sample data', attributeChar3:'sample data', attributeChar4:'sample data', attributeChar5:'sample data', attributeChar6:'sample data', attributeChar7:'sample data', attributeChar8:'sample data', attributeChar9:'sample data', attributeChar10:'sample data', attributeChar11:'sample data', attributeChar12:'sample data', attributeChar13:'sample data', attributeChar14:'sample data', attributeChar15:'sample data', attributeNum1:1234, attributeNum2:1234, attributeNum3:1234, attributeNum4:1234, attributeNum5:1234, attributeNum6:1234, attributeNum7:1234, attributeNum8:1234, attributeNum9:1234, attributeNum10:1234, attributeDate1:'2018-01-01', attributeDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', multiplyByQty:'sample data'};
      service.createBenefitRule(benefitRule).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitrules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBenefitRule', () => {
    var id = 1;
    it('should return an Promise<BenefitRule>', () => {
      const benefitRule: BenefitRule = {ruleId:'sample data', ruleType:'sample data', shortDescription:'sample data', medDefFilter:'sample data', narrative:'sample data', attributeChar1:'sample data', attributeChar2:'sample data', attributeChar3:'sample data', attributeChar4:'sample data', attributeChar5:'sample data', attributeChar6:'sample data', attributeChar7:'sample data', attributeChar8:'sample data', attributeChar9:'sample data', attributeChar10:'sample data', attributeChar11:'sample data', attributeChar12:'sample data', attributeChar13:'sample data', attributeChar14:'sample data', attributeChar15:'sample data', attributeNum1:1234, attributeNum2:1234, attributeNum3:1234, attributeNum4:1234, attributeNum5:1234, attributeNum6:1234, attributeNum7:1234, attributeNum8:1234, attributeNum9:1234, attributeNum10:1234, attributeDate1:'2018-01-01', attributeDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', multiplyByQty:'sample data'};
      service.updateBenefitRule(benefitRule, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitrules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBenefitRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBenefitRule(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitrules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});