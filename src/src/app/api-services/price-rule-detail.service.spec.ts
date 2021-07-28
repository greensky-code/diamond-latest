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

import { PriceRuleDetailService } from './price-rule-detail.service';
import { PriceRuleDetail } from '../api-models/price-rule-detail.model'
import { PriceRuleDetails } from "../api-models/testing/fake-price-rule-detail.model"

describe('PriceRuleDetailService', () => {
  let injector: TestBed;
  let service: PriceRuleDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PriceRuleDetailService]
    });
    injector = getTestBed();
    service = injector.get(PriceRuleDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPriceRuleDetails', () => {
    it('should return an Promise<PriceRuleDetail[]>', () => {
      const priceRuleDetail = [
       {priceRule:'sample data', seqRuleDetail:1234, modifierCode:'sample data', ruleLevel:'sample data', searchSequence:1234, calculationMethod:'sample data', allowedReason:'sample data', holdReason:'sample data', addToBaseUnits:1234, allowedFactOvr:1234, allowedFactor:'sample data', multByPctAllowed:'sample data', unitValueType:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', resetToInfo:'sample data', carveOut:'sample data', capOutlierInclExcl:'sample data', multModPriceMethod:1234, multModAllowedReason:'sample data', multModAllowedFactOvr:1234, userDefined1:'sample data', userDefined2:'sample data'},
       {priceRule:'sample data', seqRuleDetail:1234, modifierCode:'sample data', ruleLevel:'sample data', searchSequence:1234, calculationMethod:'sample data', allowedReason:'sample data', holdReason:'sample data', addToBaseUnits:1234, allowedFactOvr:1234, allowedFactor:'sample data', multByPctAllowed:'sample data', unitValueType:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', resetToInfo:'sample data', carveOut:'sample data', capOutlierInclExcl:'sample data', multModPriceMethod:1234, multModAllowedReason:'sample data', multModAllowedFactOvr:1234, userDefined1:'sample data', userDefined2:'sample data'},
       {priceRule:'sample data', seqRuleDetail:1234, modifierCode:'sample data', ruleLevel:'sample data', searchSequence:1234, calculationMethod:'sample data', allowedReason:'sample data', holdReason:'sample data', addToBaseUnits:1234, allowedFactOvr:1234, allowedFactor:'sample data', multByPctAllowed:'sample data', unitValueType:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', resetToInfo:'sample data', carveOut:'sample data', capOutlierInclExcl:'sample data', multModPriceMethod:1234, multModAllowedReason:'sample data', multModAllowedFactOvr:1234, userDefined1:'sample data', userDefined2:'sample data'}

      ];
      service.getPriceRuleDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/priceruledetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(priceRuleDetail);
    });
  });


  describe('#createPriceRuleDetail', () => {
    var id = 1;
    it('should return an Promise<PriceRuleDetail>', () => {
      const priceRuleDetail: PriceRuleDetail = {priceRule:'sample data', seqRuleDetail:1234, modifierCode:'sample data', ruleLevel:'sample data', searchSequence:1234, calculationMethod:'sample data', allowedReason:'sample data', holdReason:'sample data', addToBaseUnits:1234, allowedFactOvr:1234, allowedFactor:'sample data', multByPctAllowed:'sample data', unitValueType:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', resetToInfo:'sample data', carveOut:'sample data', capOutlierInclExcl:'sample data', multModPriceMethod:1234, multModAllowedReason:'sample data', multModAllowedFactOvr:1234, userDefined1:'sample data', userDefined2:'sample data'};
      service.createPriceRuleDetail(priceRuleDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/priceruledetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePriceRuleDetail', () => {
    var id = 1;
    it('should return an Promise<PriceRuleDetail>', () => {
      const priceRuleDetail: PriceRuleDetail = {priceRule:'sample data', seqRuleDetail:1234, modifierCode:'sample data', ruleLevel:'sample data', searchSequence:1234, calculationMethod:'sample data', allowedReason:'sample data', holdReason:'sample data', addToBaseUnits:1234, allowedFactOvr:1234, allowedFactor:'sample data', multByPctAllowed:'sample data', unitValueType:'sample data', messageToOperator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', resetToInfo:'sample data', carveOut:'sample data', capOutlierInclExcl:'sample data', multModPriceMethod:1234, multModAllowedReason:'sample data', multModAllowedFactOvr:1234, userDefined1:'sample data', userDefined2:'sample data'};
      service.updatePriceRuleDetail(priceRuleDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/priceruledetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePriceRuleDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePriceRuleDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/priceruledetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});