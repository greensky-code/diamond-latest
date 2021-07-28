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

import { CapPoolService } from './cap-pool.service';
import { CapPool } from '../api-models/cap-pool.model'
import { CapPools } from "../api-models/testing/fake-cap-pool.model"

describe('CapPoolService', () => {
  let injector: TestBed;
  let service: CapPoolService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapPoolService]
    });
    injector = getTestBed();
    service = injector.get(CapPoolService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapPools', () => {
    it('should return an Promise<CapPool[]>', () => {
      const capPool = [
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, description:'sample data', mbrThresholdFrom:1234, mbrThresholdThru:1234, descriptionPmpm:'sample data', capRateId:'sample data', pctCapRate:1234, companyCodePmpm:'sample data', glRefCodePmpm:'sample data', pctWithholdPmpm:1234, descriptionWhld:'sample data', fileTypeWhld:'sample data', companyCodeWhld:'sample data', glRefCodeWhld:'sample data', descriptionDed:'sample data', fileTypeDed:'sample data', companyCodeDed:'sample data', glRefCodeDed:'sample data', amountTypeDed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRulePmpm:'sample data', postingRuleWhld:'sample data', postingRuleDed:'sample data', effectiveDate:'2018-01-01', terminationDate:'2018-01-01', capPoolId:'sample data'},
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, description:'sample data', mbrThresholdFrom:1234, mbrThresholdThru:1234, descriptionPmpm:'sample data', capRateId:'sample data', pctCapRate:1234, companyCodePmpm:'sample data', glRefCodePmpm:'sample data', pctWithholdPmpm:1234, descriptionWhld:'sample data', fileTypeWhld:'sample data', companyCodeWhld:'sample data', glRefCodeWhld:'sample data', descriptionDed:'sample data', fileTypeDed:'sample data', companyCodeDed:'sample data', glRefCodeDed:'sample data', amountTypeDed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRulePmpm:'sample data', postingRuleWhld:'sample data', postingRuleDed:'sample data', effectiveDate:'2018-01-01', terminationDate:'2018-01-01', capPoolId:'sample data'},
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, description:'sample data', mbrThresholdFrom:1234, mbrThresholdThru:1234, descriptionPmpm:'sample data', capRateId:'sample data', pctCapRate:1234, companyCodePmpm:'sample data', glRefCodePmpm:'sample data', pctWithholdPmpm:1234, descriptionWhld:'sample data', fileTypeWhld:'sample data', companyCodeWhld:'sample data', glRefCodeWhld:'sample data', descriptionDed:'sample data', fileTypeDed:'sample data', companyCodeDed:'sample data', glRefCodeDed:'sample data', amountTypeDed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRulePmpm:'sample data', postingRuleWhld:'sample data', postingRuleDed:'sample data', effectiveDate:'2018-01-01', terminationDate:'2018-01-01', capPoolId:'sample data'}

      ];
      service.getCapPools().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cappools/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capPool);
    });
  });


  describe('#createCapPool', () => {
    var id = 1;
    it('should return an Promise<CapPool>', () => {
      const capPool: CapPool = {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, description:'sample data', mbrThresholdFrom:1234, mbrThresholdThru:1234, descriptionPmpm:'sample data', capRateId:'sample data', pctCapRate:1234, companyCodePmpm:'sample data', glRefCodePmpm:'sample data', pctWithholdPmpm:1234, descriptionWhld:'sample data', fileTypeWhld:'sample data', companyCodeWhld:'sample data', glRefCodeWhld:'sample data', descriptionDed:'sample data', fileTypeDed:'sample data', companyCodeDed:'sample data', glRefCodeDed:'sample data', amountTypeDed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRulePmpm:'sample data', postingRuleWhld:'sample data', postingRuleDed:'sample data', effectiveDate:'2018-01-01', terminationDate:'2018-01-01', capPoolId:'sample data'};
      service.createCapPool(capPool).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappools`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapPool', () => {
    var id = 1;
    it('should return an Promise<CapPool>', () => {
      const capPool: CapPool = {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, description:'sample data', mbrThresholdFrom:1234, mbrThresholdThru:1234, descriptionPmpm:'sample data', capRateId:'sample data', pctCapRate:1234, companyCodePmpm:'sample data', glRefCodePmpm:'sample data', pctWithholdPmpm:1234, descriptionWhld:'sample data', fileTypeWhld:'sample data', companyCodeWhld:'sample data', glRefCodeWhld:'sample data', descriptionDed:'sample data', fileTypeDed:'sample data', companyCodeDed:'sample data', glRefCodeDed:'sample data', amountTypeDed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRulePmpm:'sample data', postingRuleWhld:'sample data', postingRuleDed:'sample data', effectiveDate:'2018-01-01', terminationDate:'2018-01-01', capPoolId:'sample data'};
      service.updateCapPool(capPool, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappools/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapPool', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapPool(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappools/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});