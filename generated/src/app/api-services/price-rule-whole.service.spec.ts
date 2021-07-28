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

import { PriceRuleWholeService } from './price-rule-whole.service';
import { PriceRuleWhole } from '../api-models/price-rule-whole.model'
import { PriceRuleWholes } from "../api-models/testing/fake-price-rule-whole.model"

describe('PriceRuleWholeService', () => {
  let injector: TestBed;
  let service: PriceRuleWholeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PriceRuleWholeService]
    });
    injector = getTestBed();
    service = injector.get(PriceRuleWholeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPriceRuleWholes', () => {
    it('should return an Promise<PriceRuleWhole[]>', () => {
      const priceRuleWhole = [
       {priceRule:'sample data', seqRuleWhole:1234, ruleType:'sample data', ruleOrder:1234, tieredSeqNumber:1234, effectiveDate:'2018-01-01', priceDeterminant:'sample data', termDate:'2018-01-01', description:'sample data', ruleFromDays:1234, ruleThruDays:1234, daysRangeMethod:'sample data', ruleFromAmt:1234, ruleThruAmt:1234, ruleAmtType:'sample data', patientFromAge:1234, patientThruAge:1234, threshQty:1234, threshQtyMethod:'sample data', threshAmt:1234, threshAmtMethod:'sample data', threshPct:1234, threshPctMethod:'sample data', capAmt:1234, capAmtMethod:'sample data', capPct:1234, capPctMethod:'sample data', calcMethodCode:'sample data', summingDetails:'sample data', allowedReason:'sample data', applyToBucket:'sample data', bucketLogic:'sample data', sysProcedureCode:'sample data', holdReason:'sample data', customPgmName:'sample data', messageToOperator:'sample data', tieredPerdiemDaysFrom:1234, tieredPerdiemDaysThru:1234, tieredStoplossAmtFrom:1234, tieredStoplossAmtThru:1234, usePctAllowed:'sample data', allowedFactOvr:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {priceRule:'sample data', seqRuleWhole:1234, ruleType:'sample data', ruleOrder:1234, tieredSeqNumber:1234, effectiveDate:'2018-01-01', priceDeterminant:'sample data', termDate:'2018-01-01', description:'sample data', ruleFromDays:1234, ruleThruDays:1234, daysRangeMethod:'sample data', ruleFromAmt:1234, ruleThruAmt:1234, ruleAmtType:'sample data', patientFromAge:1234, patientThruAge:1234, threshQty:1234, threshQtyMethod:'sample data', threshAmt:1234, threshAmtMethod:'sample data', threshPct:1234, threshPctMethod:'sample data', capAmt:1234, capAmtMethod:'sample data', capPct:1234, capPctMethod:'sample data', calcMethodCode:'sample data', summingDetails:'sample data', allowedReason:'sample data', applyToBucket:'sample data', bucketLogic:'sample data', sysProcedureCode:'sample data', holdReason:'sample data', customPgmName:'sample data', messageToOperator:'sample data', tieredPerdiemDaysFrom:1234, tieredPerdiemDaysThru:1234, tieredStoplossAmtFrom:1234, tieredStoplossAmtThru:1234, usePctAllowed:'sample data', allowedFactOvr:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {priceRule:'sample data', seqRuleWhole:1234, ruleType:'sample data', ruleOrder:1234, tieredSeqNumber:1234, effectiveDate:'2018-01-01', priceDeterminant:'sample data', termDate:'2018-01-01', description:'sample data', ruleFromDays:1234, ruleThruDays:1234, daysRangeMethod:'sample data', ruleFromAmt:1234, ruleThruAmt:1234, ruleAmtType:'sample data', patientFromAge:1234, patientThruAge:1234, threshQty:1234, threshQtyMethod:'sample data', threshAmt:1234, threshAmtMethod:'sample data', threshPct:1234, threshPctMethod:'sample data', capAmt:1234, capAmtMethod:'sample data', capPct:1234, capPctMethod:'sample data', calcMethodCode:'sample data', summingDetails:'sample data', allowedReason:'sample data', applyToBucket:'sample data', bucketLogic:'sample data', sysProcedureCode:'sample data', holdReason:'sample data', customPgmName:'sample data', messageToOperator:'sample data', tieredPerdiemDaysFrom:1234, tieredPerdiemDaysThru:1234, tieredStoplossAmtFrom:1234, tieredStoplossAmtThru:1234, usePctAllowed:'sample data', allowedFactOvr:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPriceRuleWholes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pricerulewholes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(priceRuleWhole);
    });
  });


  describe('#createPriceRuleWhole', () => {
    var id = 1;
    it('should return an Promise<PriceRuleWhole>', () => {
      const priceRuleWhole: PriceRuleWhole = {priceRule:'sample data', seqRuleWhole:1234, ruleType:'sample data', ruleOrder:1234, tieredSeqNumber:1234, effectiveDate:'2018-01-01', priceDeterminant:'sample data', termDate:'2018-01-01', description:'sample data', ruleFromDays:1234, ruleThruDays:1234, daysRangeMethod:'sample data', ruleFromAmt:1234, ruleThruAmt:1234, ruleAmtType:'sample data', patientFromAge:1234, patientThruAge:1234, threshQty:1234, threshQtyMethod:'sample data', threshAmt:1234, threshAmtMethod:'sample data', threshPct:1234, threshPctMethod:'sample data', capAmt:1234, capAmtMethod:'sample data', capPct:1234, capPctMethod:'sample data', calcMethodCode:'sample data', summingDetails:'sample data', allowedReason:'sample data', applyToBucket:'sample data', bucketLogic:'sample data', sysProcedureCode:'sample data', holdReason:'sample data', customPgmName:'sample data', messageToOperator:'sample data', tieredPerdiemDaysFrom:1234, tieredPerdiemDaysThru:1234, tieredStoplossAmtFrom:1234, tieredStoplossAmtThru:1234, usePctAllowed:'sample data', allowedFactOvr:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPriceRuleWhole(priceRuleWhole).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pricerulewholes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePriceRuleWhole', () => {
    var id = 1;
    it('should return an Promise<PriceRuleWhole>', () => {
      const priceRuleWhole: PriceRuleWhole = {priceRule:'sample data', seqRuleWhole:1234, ruleType:'sample data', ruleOrder:1234, tieredSeqNumber:1234, effectiveDate:'2018-01-01', priceDeterminant:'sample data', termDate:'2018-01-01', description:'sample data', ruleFromDays:1234, ruleThruDays:1234, daysRangeMethod:'sample data', ruleFromAmt:1234, ruleThruAmt:1234, ruleAmtType:'sample data', patientFromAge:1234, patientThruAge:1234, threshQty:1234, threshQtyMethod:'sample data', threshAmt:1234, threshAmtMethod:'sample data', threshPct:1234, threshPctMethod:'sample data', capAmt:1234, capAmtMethod:'sample data', capPct:1234, capPctMethod:'sample data', calcMethodCode:'sample data', summingDetails:'sample data', allowedReason:'sample data', applyToBucket:'sample data', bucketLogic:'sample data', sysProcedureCode:'sample data', holdReason:'sample data', customPgmName:'sample data', messageToOperator:'sample data', tieredPerdiemDaysFrom:1234, tieredPerdiemDaysThru:1234, tieredStoplossAmtFrom:1234, tieredStoplossAmtThru:1234, usePctAllowed:'sample data', allowedFactOvr:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePriceRuleWhole(priceRuleWhole, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pricerulewholes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePriceRuleWhole', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePriceRuleWhole(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pricerulewholes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});