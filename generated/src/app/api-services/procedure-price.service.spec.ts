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

import { ProcedurePriceService } from './procedure-price.service';
import { ProcedurePrice } from '../api-models/procedure-price.model'
import { ProcedurePrices } from "../api-models/testing/fake-procedure-price.model"

describe('ProcedurePriceService', () => {
  let injector: TestBed;
  let service: ProcedurePriceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcedurePriceService]
    });
    injector = getTestBed();
    service = injector.get(ProcedurePriceService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcedurePrices', () => {
    it('should return an Promise<ProcedurePrice[]>', () => {
      const procedurePrice = [
       {procedureCode:'sample data', seqProcPrice:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', allowedAmt:1234, pctOfBilled:1234, withholdPct:1234, contractOverride:'sample data', procedureHold:'sample data', holdDate:'2018-01-01', perDiemFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', modifierCode:'sample data', geoZipRegion:'sample data'},
       {procedureCode:'sample data', seqProcPrice:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', allowedAmt:1234, pctOfBilled:1234, withholdPct:1234, contractOverride:'sample data', procedureHold:'sample data', holdDate:'2018-01-01', perDiemFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', modifierCode:'sample data', geoZipRegion:'sample data'},
       {procedureCode:'sample data', seqProcPrice:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', allowedAmt:1234, pctOfBilled:1234, withholdPct:1234, contractOverride:'sample data', procedureHold:'sample data', holdDate:'2018-01-01', perDiemFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', modifierCode:'sample data', geoZipRegion:'sample data'}

      ];
      service.getProcedurePrices().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procedureprices/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procedurePrice);
    });
  });


  describe('#createProcedurePrice', () => {
    var id = 1;
    it('should return an Promise<ProcedurePrice>', () => {
      const procedurePrice: ProcedurePrice = {procedureCode:'sample data', seqProcPrice:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', allowedAmt:1234, pctOfBilled:1234, withholdPct:1234, contractOverride:'sample data', procedureHold:'sample data', holdDate:'2018-01-01', perDiemFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', modifierCode:'sample data', geoZipRegion:'sample data'};
      service.createProcedurePrice(procedurePrice).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedureprices`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcedurePrice', () => {
    var id = 1;
    it('should return an Promise<ProcedurePrice>', () => {
      const procedurePrice: ProcedurePrice = {procedureCode:'sample data', seqProcPrice:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', allowedAmt:1234, pctOfBilled:1234, withholdPct:1234, contractOverride:'sample data', procedureHold:'sample data', holdDate:'2018-01-01', perDiemFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', modifierCode:'sample data', geoZipRegion:'sample data'};
      service.updateProcedurePrice(procedurePrice, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedureprices/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcedurePrice', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcedurePrice(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procedureprices/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});