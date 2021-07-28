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

import { VendorAdvPayRulesService } from './vendor-adv-pay-rules.service';
import { VendorAdvPayRules } from '../api-models/vendor-adv-pay-rules.model'
import { VendorAdvPayRuleses } from "../api-models/testing/fake-vendor-adv-pay-rules.model"

describe('VendorAdvPayRulesService', () => {
  let injector: TestBed;
  let service: VendorAdvPayRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorAdvPayRulesService]
    });
    injector = getTestBed();
    service = injector.get(VendorAdvPayRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getVendorAdvPayRuleses', () => {
    it('should return an Promise<VendorAdvPayRules[]>', () => {
      const vendorAdvPayRules = [
       {advPayType:'sample data', replenish:'sample data', offsetBy:'sample data', zeroPayOption:'sample data', accPayType:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {advPayType:'sample data', replenish:'sample data', offsetBy:'sample data', zeroPayOption:'sample data', accPayType:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {advPayType:'sample data', replenish:'sample data', offsetBy:'sample data', zeroPayOption:'sample data', accPayType:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getVendorAdvPayRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(vendorAdvPayRules);
    });
  });


  describe('#createVendorAdvPayRules', () => {
    var id = 1;
    it('should return an Promise<VendorAdvPayRules>', () => {
      const vendorAdvPayRules: VendorAdvPayRules = {advPayType:'sample data', replenish:'sample data', offsetBy:'sample data', zeroPayOption:'sample data', accPayType:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createVendorAdvPayRules(vendorAdvPayRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateVendorAdvPayRules', () => {
    var id = 1;
    it('should return an Promise<VendorAdvPayRules>', () => {
      const vendorAdvPayRules: VendorAdvPayRules = {advPayType:'sample data', replenish:'sample data', offsetBy:'sample data', zeroPayOption:'sample data', accPayType:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateVendorAdvPayRules(vendorAdvPayRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteVendorAdvPayRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteVendorAdvPayRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vendoradvpayruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});