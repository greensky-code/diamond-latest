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

import { ProvContractPriceService } from './prov-contract-price.service';
import { ProvContractPrice } from '../api-models/prov-contract-price.model'
import { ProvContractPrices } from "../api-models/testing/fake-prov-contract-price.model"

describe('ProvContractPriceService', () => {
  let injector: TestBed;
  let service: ProvContractPriceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvContractPriceService]
    });
    injector = getTestBed();
    service = injector.get(ProvContractPriceService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvContractPrices', () => {
    it('should return an Promise<ProvContractPrice[]>', () => {
      const provContractPrice = [
       {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, contractType:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, serviceRegion:'sample data', geographicRegion:'sample data', determinantTable:'sample data', determinant:'sample data', operator:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', pricerFacilityNumber:'sample data', pricerPaysource:'sample data', targetRevCodeEditFlag:'sample data', targetRevAction:'sample data', targetRevReason:'sample data'},
       {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, contractType:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, serviceRegion:'sample data', geographicRegion:'sample data', determinantTable:'sample data', determinant:'sample data', operator:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', pricerFacilityNumber:'sample data', pricerPaysource:'sample data', targetRevCodeEditFlag:'sample data', targetRevAction:'sample data', targetRevReason:'sample data'},
       {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, contractType:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, serviceRegion:'sample data', geographicRegion:'sample data', determinantTable:'sample data', determinant:'sample data', operator:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', pricerFacilityNumber:'sample data', pricerPaysource:'sample data', targetRevCodeEditFlag:'sample data', targetRevAction:'sample data', targetRevReason:'sample data'}

      ];
      service.getProvContractPrices().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractprices/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provContractPrice);
    });
  });


  describe('#createProvContractPrice', () => {
    var id = 1;
    it('should return an Promise<ProvContractPrice>', () => {
      const provContractPrice: ProvContractPrice = {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, contractType:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, serviceRegion:'sample data', geographicRegion:'sample data', determinantTable:'sample data', determinant:'sample data', operator:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', pricerFacilityNumber:'sample data', pricerPaysource:'sample data', targetRevCodeEditFlag:'sample data', targetRevAction:'sample data', targetRevReason:'sample data'};
      service.createProvContractPrice(provContractPrice).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractprices`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvContractPrice', () => {
    var id = 1;
    it('should return an Promise<ProvContractPrice>', () => {
      const provContractPrice: ProvContractPrice = {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, contractType:'sample data', priceRule1:'sample data', priceRule2:'sample data', priceSchedule1:'sample data', priceSchedule2:'sample data', pricingRegion:'sample data', pctOfBilled:1234, pctAllowed:1234, pctWithhold:1234, serviceRegion:'sample data', geographicRegion:'sample data', determinantTable:'sample data', determinant:'sample data', operator:'sample data', drgPricerId:'sample data', pricerVersion:'sample data', revisionLevel:'sample data', drgBaseMult:1234, drgOutlierMult:1234, drgOutlierPctBilled:1234, case2Pct:1234, case3Pct:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', pricerFacilityNumber:'sample data', pricerPaysource:'sample data', targetRevCodeEditFlag:'sample data', targetRevAction:'sample data', targetRevReason:'sample data'};
      service.updateProvContractPrice(provContractPrice, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractprices/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvContractPrice', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvContractPrice(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractprices/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});