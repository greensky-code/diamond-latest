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

import { TradingPartnerRelationsService } from './trading-partner-relations.service';
import { TradingPartnerRelations } from '../api-models/trading-partner-relations.model'
import { TradingPartnerRelationss } from "../api-models/testing/fake-trading-partner-relations.model"

describe('TradingPartnerRelationsService', () => {
  let injector: TestBed;
  let service: TradingPartnerRelationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TradingPartnerRelationsService]
    });
    injector = getTestBed();
    service = injector.get(TradingPartnerRelationsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getTradingPartnerRelationss', () => {
    it('should return an Promise<TradingPartnerRelations[]>', () => {
      const tradingPartnerRelations = [
       {seqTpRelations:1234, receivingTpId:'sample data', sourceTpId:'sample data', companyCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqTpRelations:1234, receivingTpId:'sample data', sourceTpId:'sample data', companyCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqTpRelations:1234, receivingTpId:'sample data', sourceTpId:'sample data', companyCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getTradingPartnerRelationss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnerrelationss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(tradingPartnerRelations);
    });
  });


  describe('#createTradingPartnerRelations', () => {
    var id = 1;
    it('should return an Promise<TradingPartnerRelations>', () => {
      const tradingPartnerRelations: TradingPartnerRelations = {seqTpRelations:1234, receivingTpId:'sample data', sourceTpId:'sample data', companyCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createTradingPartnerRelations(tradingPartnerRelations).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnerrelationss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateTradingPartnerRelations', () => {
    var id = 1;
    it('should return an Promise<TradingPartnerRelations>', () => {
      const tradingPartnerRelations: TradingPartnerRelations = {seqTpRelations:1234, receivingTpId:'sample data', sourceTpId:'sample data', companyCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateTradingPartnerRelations(tradingPartnerRelations, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnerrelationss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteTradingPartnerRelations', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteTradingPartnerRelations(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnerrelationss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});