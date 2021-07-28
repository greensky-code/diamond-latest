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

import { TradingPartnerDetailService } from './trading-partner-detail.service';
import { TradingPartnerDetail } from '../api-models/trading-partner-detail.model'
import { TradingPartnerDetails } from "../api-models/testing/fake-trading-partner-detail.model"

describe('TradingPartnerDetailService', () => {
  let injector: TestBed;
  let service: TradingPartnerDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TradingPartnerDetailService]
    });
    injector = getTestBed();
    service = injector.get(TradingPartnerDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getTradingPartnerDetails', () => {
    it('should return an Promise<TradingPartnerDetail[]>', () => {
      const tradingPartnerDetail = [
       {tradingPartnerId:'sample data', transactionType:'sample data', description:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', userDefined1:'sample data', userDefined2:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {tradingPartnerId:'sample data', transactionType:'sample data', description:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', userDefined1:'sample data', userDefined2:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {tradingPartnerId:'sample data', transactionType:'sample data', description:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', userDefined1:'sample data', userDefined2:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getTradingPartnerDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnerdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(tradingPartnerDetail);
    });
  });


  describe('#createTradingPartnerDetail', () => {
    var id = 1;
    it('should return an Promise<TradingPartnerDetail>', () => {
      const tradingPartnerDetail: TradingPartnerDetail = {tradingPartnerId:'sample data', transactionType:'sample data', description:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', userDefined1:'sample data', userDefined2:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createTradingPartnerDetail(tradingPartnerDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnerdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateTradingPartnerDetail', () => {
    var id = 1;
    it('should return an Promise<TradingPartnerDetail>', () => {
      const tradingPartnerDetail: TradingPartnerDetail = {tradingPartnerId:'sample data', transactionType:'sample data', description:'sample data', autoValidate:'sample data', autoPost:'sample data', partialPost:'sample data', reworkable:'sample data', processByBatch:'sample data', priceClaims:'sample data', adjudicateClaims:'sample data', checkForDuplicates:'sample data', paymentForIndividual:'sample data', userDefined1:'sample data', userDefined2:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateTradingPartnerDetail(tradingPartnerDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnerdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteTradingPartnerDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteTradingPartnerDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnerdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});