/* Copyright (c) 2021 . All Rights Reserved. */

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

import { EbBusRuleService } from './eb-bus-rule.service';
import { EbBusRule } from '../api-models/eb-bus-rule.model'
import { EbBusRules } from "../api-models/testing/fake-eb-bus-rule.model"

describe('EbBusRuleService', () => {
  let injector: TestBed;
  let service: EbBusRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EbBusRuleService]
    });
    injector = getTestBed();
    service = injector.get(EbBusRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getEbBusRules', () => {
    it('should return an Promise<EbBusRule[]>', () => {
      const ebBusRule = [
       {pRuleType:'sample data', pEbField:'sample data', pDataElem:'sample data'},
       {pRuleType:'sample data', pEbField:'sample data', pDataElem:'sample data'},
       {pRuleType:'sample data', pEbField:'sample data', pDataElem:'sample data'}

      ];
      service.getEbBusRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ebbusrules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ebBusRule);
    });
  });


  describe('#createEbBusRule', () => {
    var id = 1;
    it('should return an Promise<EbBusRule>', () => {
      const ebBusRule: EbBusRule = {pRuleType:'sample data', pEbField:'sample data', pDataElem:'sample data'};
      service.createEbBusRule(ebBusRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ebbusrules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateEbBusRule', () => {
    var id = 1;
    it('should return an Promise<EbBusRule>', () => {
      const ebBusRule: EbBusRule = {pRuleType:'sample data', pEbField:'sample data', pDataElem:'sample data'};
      service.updateEbBusRule(ebBusRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ebbusrules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteEbBusRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteEbBusRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ebbusrules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});