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

import { PriceRuleMasterService } from './price-rule-master.service';
import { PriceRuleMaster } from '../api-models/price-rule-master.model'
import { PriceRuleMasters } from "../api-models/testing/fake-price-rule-master.model"

describe('PriceRuleMasterService', () => {
  let injector: TestBed;
  let service: PriceRuleMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PriceRuleMasterService]
    });
    injector = getTestBed();
    service = injector.get(PriceRuleMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPriceRuleMasters', () => {
    it('should return an Promise<PriceRuleMaster[]>', () => {
      const priceRuleMaster = [
       {priceRule:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgGrouperType:'sample data', drgPricerType:'sample data', customTableLogic:'sample data', currAnesMinUnit:1234, currConvEffDate:'2018-01-01', priorAnesMinUnit:1234, assignDrg:'sample data', useExtDrgPricer:'sample data', fromMin1:1234, thruMin1:1234, currAnesMinUnit2:1234, priorAnesMinUnit2:1234, fromMin2:1234, thruMin2:1234, currAnesMinUnit3:1234, priorAnesMinUnit3:1234, fromMin3:1234, thruMin3:1234, currAnesMinUnit4:1234, priorAnesMinUnit4:1234, fromMin4:1234, thruMin4:1234, minimumMinForUnit:1234, procedurePriceOption:'sample data', modifierCode:'sample data'},
       {priceRule:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgGrouperType:'sample data', drgPricerType:'sample data', customTableLogic:'sample data', currAnesMinUnit:1234, currConvEffDate:'2018-01-01', priorAnesMinUnit:1234, assignDrg:'sample data', useExtDrgPricer:'sample data', fromMin1:1234, thruMin1:1234, currAnesMinUnit2:1234, priorAnesMinUnit2:1234, fromMin2:1234, thruMin2:1234, currAnesMinUnit3:1234, priorAnesMinUnit3:1234, fromMin3:1234, thruMin3:1234, currAnesMinUnit4:1234, priorAnesMinUnit4:1234, fromMin4:1234, thruMin4:1234, minimumMinForUnit:1234, procedurePriceOption:'sample data', modifierCode:'sample data'},
       {priceRule:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgGrouperType:'sample data', drgPricerType:'sample data', customTableLogic:'sample data', currAnesMinUnit:1234, currConvEffDate:'2018-01-01', priorAnesMinUnit:1234, assignDrg:'sample data', useExtDrgPricer:'sample data', fromMin1:1234, thruMin1:1234, currAnesMinUnit2:1234, priorAnesMinUnit2:1234, fromMin2:1234, thruMin2:1234, currAnesMinUnit3:1234, priorAnesMinUnit3:1234, fromMin3:1234, thruMin3:1234, currAnesMinUnit4:1234, priorAnesMinUnit4:1234, fromMin4:1234, thruMin4:1234, minimumMinForUnit:1234, procedurePriceOption:'sample data', modifierCode:'sample data'}

      ];
      service.getPriceRuleMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pricerulemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(priceRuleMaster);
    });
  });


  describe('#createPriceRuleMaster', () => {
    var id = 1;
    it('should return an Promise<PriceRuleMaster>', () => {
      const priceRuleMaster: PriceRuleMaster = {priceRule:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgGrouperType:'sample data', drgPricerType:'sample data', customTableLogic:'sample data', currAnesMinUnit:1234, currConvEffDate:'2018-01-01', priorAnesMinUnit:1234, assignDrg:'sample data', useExtDrgPricer:'sample data', fromMin1:1234, thruMin1:1234, currAnesMinUnit2:1234, priorAnesMinUnit2:1234, fromMin2:1234, thruMin2:1234, currAnesMinUnit3:1234, priorAnesMinUnit3:1234, fromMin3:1234, thruMin3:1234, currAnesMinUnit4:1234, priorAnesMinUnit4:1234, fromMin4:1234, thruMin4:1234, minimumMinForUnit:1234, procedurePriceOption:'sample data', modifierCode:'sample data'};
      service.createPriceRuleMaster(priceRuleMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pricerulemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePriceRuleMaster', () => {
    var id = 1;
    it('should return an Promise<PriceRuleMaster>', () => {
      const priceRuleMaster: PriceRuleMaster = {priceRule:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgGrouperType:'sample data', drgPricerType:'sample data', customTableLogic:'sample data', currAnesMinUnit:1234, currConvEffDate:'2018-01-01', priorAnesMinUnit:1234, assignDrg:'sample data', useExtDrgPricer:'sample data', fromMin1:1234, thruMin1:1234, currAnesMinUnit2:1234, priorAnesMinUnit2:1234, fromMin2:1234, thruMin2:1234, currAnesMinUnit3:1234, priorAnesMinUnit3:1234, fromMin3:1234, thruMin3:1234, currAnesMinUnit4:1234, priorAnesMinUnit4:1234, fromMin4:1234, thruMin4:1234, minimumMinForUnit:1234, procedurePriceOption:'sample data', modifierCode:'sample data'};
      service.updatePriceRuleMaster(priceRuleMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pricerulemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePriceRuleMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePriceRuleMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pricerulemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});