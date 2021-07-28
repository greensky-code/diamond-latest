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

import { TradingPartnerMasterService } from './trading-partner-master.service';
import { TradingPartnerMaster } from '../api-models/trading-partner-master.model'
import { TradingPartnerMasters } from "../api-models/testing/fake-trading-partner-master.model"

describe('TradingPartnerMasterService', () => {
  let injector: TestBed;
  let service: TradingPartnerMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TradingPartnerMasterService]
    });
    injector = getTestBed();
    service = injector.get(TradingPartnerMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getTradingPartnerMasters', () => {
    it('should return an Promise<TradingPartnerMaster[]>', () => {
      const tradingPartnerMaster = [
       {tradingPartnerId:'sample data', tradingPartnerName:'sample data', tradingPartnerType:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', country:'sample data', contactName:'sample data', phoneNumber:'sample data', faxNumber:'sample data', email:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ediAccessNumber:'sample data'},
       {tradingPartnerId:'sample data', tradingPartnerName:'sample data', tradingPartnerType:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', country:'sample data', contactName:'sample data', phoneNumber:'sample data', faxNumber:'sample data', email:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ediAccessNumber:'sample data'},
       {tradingPartnerId:'sample data', tradingPartnerName:'sample data', tradingPartnerType:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', country:'sample data', contactName:'sample data', phoneNumber:'sample data', faxNumber:'sample data', email:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ediAccessNumber:'sample data'}

      ];
      service.getTradingPartnerMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnermasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(tradingPartnerMaster);
    });
  });


  describe('#createTradingPartnerMaster', () => {
    var id = 1;
    it('should return an Promise<TradingPartnerMaster>', () => {
      const tradingPartnerMaster: TradingPartnerMaster = {tradingPartnerId:'sample data', tradingPartnerName:'sample data', tradingPartnerType:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', country:'sample data', contactName:'sample data', phoneNumber:'sample data', faxNumber:'sample data', email:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ediAccessNumber:'sample data'};
      service.createTradingPartnerMaster(tradingPartnerMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnermasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateTradingPartnerMaster', () => {
    var id = 1;
    it('should return an Promise<TradingPartnerMaster>', () => {
      const tradingPartnerMaster: TradingPartnerMaster = {tradingPartnerId:'sample data', tradingPartnerName:'sample data', tradingPartnerType:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', country:'sample data', contactName:'sample data', phoneNumber:'sample data', faxNumber:'sample data', email:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ediAccessNumber:'sample data'};
      service.updateTradingPartnerMaster(tradingPartnerMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnermasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteTradingPartnerMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteTradingPartnerMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/tradingpartnermasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});