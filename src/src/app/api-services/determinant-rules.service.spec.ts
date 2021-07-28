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

import { DeterminantRulesService } from './determinant-rules.service';
import { DeterminantRules } from '../api-models/determinant-rules.model'
import { DeterminantRuleses } from "../api-models/testing/fake-determinant-rules.model"

describe('DeterminantRulesService', () => {
  let injector: TestBed;
  let service: DeterminantRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeterminantRulesService]
    });
    injector = getTestBed();
    service = injector.get(DeterminantRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDeterminantRuleses', () => {
    it('should return an Promise<DeterminantRules[]>', () => {
      const determinantRules = [
       {keyword:'sample data', seqRuleId:1234, ruleOrder:1234, ruleId:'sample data', fileType:'sample data', actionCode:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', activeFlag:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', resultValue1:'sample data', resultValue2:'sample data', resultValue3:'sample data', resultValue4:'sample data', resultValue5:'sample data', resultValue6:'sample data', resultValue7:'sample data', resultValue8:'sample data', resultValue9:'sample data', resultValue10:'sample data', resultNumber3:1234, resultNumber4:1234, resultNumber5:1234, termReason:'sample data', resultNumber1:1234, resultNumber2:1234, userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01'},
       {keyword:'sample data', seqRuleId:1234, ruleOrder:1234, ruleId:'sample data', fileType:'sample data', actionCode:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', activeFlag:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', resultValue1:'sample data', resultValue2:'sample data', resultValue3:'sample data', resultValue4:'sample data', resultValue5:'sample data', resultValue6:'sample data', resultValue7:'sample data', resultValue8:'sample data', resultValue9:'sample data', resultValue10:'sample data', resultNumber3:1234, resultNumber4:1234, resultNumber5:1234, termReason:'sample data', resultNumber1:1234, resultNumber2:1234, userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01'},
       {keyword:'sample data', seqRuleId:1234, ruleOrder:1234, ruleId:'sample data', fileType:'sample data', actionCode:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', activeFlag:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', resultValue1:'sample data', resultValue2:'sample data', resultValue3:'sample data', resultValue4:'sample data', resultValue5:'sample data', resultValue6:'sample data', resultValue7:'sample data', resultValue8:'sample data', resultValue9:'sample data', resultValue10:'sample data', resultNumber3:1234, resultNumber4:1234, resultNumber5:1234, termReason:'sample data', resultNumber1:1234, resultNumber2:1234, userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01'}

      ];
      service.getDeterminantRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/determinantruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(determinantRules);
    });
  });


  describe('#createDeterminantRules', () => {
    var id = 1;
    it('should return an Promise<DeterminantRules>', () => {
      const determinantRules: DeterminantRules = {keyword:'sample data', seqRuleId:1234, ruleOrder:1234, ruleId:'sample data', fileType:'sample data', actionCode:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', activeFlag:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', resultValue1:'sample data', resultValue2:'sample data', resultValue3:'sample data', resultValue4:'sample data', resultValue5:'sample data', resultValue6:'sample data', resultValue7:'sample data', resultValue8:'sample data', resultValue9:'sample data', resultValue10:'sample data', resultNumber3:1234, resultNumber4:1234, resultNumber5:1234, termReason:'sample data', resultNumber1:1234, resultNumber2:1234, userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01'};
      service.createDeterminantRules(determinantRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinantruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDeterminantRules', () => {
    var id = 1;
    it('should return an Promise<DeterminantRules>', () => {
      const determinantRules: DeterminantRules = {keyword:'sample data', seqRuleId:1234, ruleOrder:1234, ruleId:'sample data', fileType:'sample data', actionCode:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', activeFlag:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', resultValue1:'sample data', resultValue2:'sample data', resultValue3:'sample data', resultValue4:'sample data', resultValue5:'sample data', resultValue6:'sample data', resultValue7:'sample data', resultValue8:'sample data', resultValue9:'sample data', resultValue10:'sample data', resultNumber3:1234, resultNumber4:1234, resultNumber5:1234, termReason:'sample data', resultNumber1:1234, resultNumber2:1234, userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01'};
      service.updateDeterminantRules(determinantRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinantruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDeterminantRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDeterminantRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinantruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});