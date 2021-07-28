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

import { CaseMgmtImportUpdRuleService } from './case-mgmt-import-upd-rule.service';
import { CaseMgmtImportUpdRule } from '../api-models/case-mgmt-import-upd-rule.model'
import { CaseMgmtImportUpdRules } from "../api-models/testing/fake-case-mgmt-import-upd-rule.model"

describe('CaseMgmtImportUpdRuleService', () => {
  let injector: TestBed;
  let service: CaseMgmtImportUpdRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CaseMgmtImportUpdRuleService]
    });
    injector = getTestBed();
    service = injector.get(CaseMgmtImportUpdRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCaseMgmtImportUpdRules', () => {
    it('should return an Promise<CaseMgmtImportUpdRule[]>', () => {
      const caseMgmtImportUpdRule = [
       {caseMgmtImportUpdRuleSeq:1234, caseMgmtImportSegmentNm:'sample data', caseMgmtUpdColumnNm:'sample data', caseMgmtImportUpdRuleDes:'sample data'},
       {caseMgmtImportUpdRuleSeq:1234, caseMgmtImportSegmentNm:'sample data', caseMgmtUpdColumnNm:'sample data', caseMgmtImportUpdRuleDes:'sample data'},
       {caseMgmtImportUpdRuleSeq:1234, caseMgmtImportSegmentNm:'sample data', caseMgmtUpdColumnNm:'sample data', caseMgmtImportUpdRuleDes:'sample data'}

      ];
      service.getCaseMgmtImportUpdRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/casemgmtimportupdrules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(caseMgmtImportUpdRule);
    });
  });


  describe('#createCaseMgmtImportUpdRule', () => {
    var id = 1;
    it('should return an Promise<CaseMgmtImportUpdRule>', () => {
      const caseMgmtImportUpdRule: CaseMgmtImportUpdRule = {caseMgmtImportUpdRuleSeq:1234, caseMgmtImportSegmentNm:'sample data', caseMgmtUpdColumnNm:'sample data', caseMgmtImportUpdRuleDes:'sample data'};
      service.createCaseMgmtImportUpdRule(caseMgmtImportUpdRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casemgmtimportupdrules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCaseMgmtImportUpdRule', () => {
    var id = 1;
    it('should return an Promise<CaseMgmtImportUpdRule>', () => {
      const caseMgmtImportUpdRule: CaseMgmtImportUpdRule = {caseMgmtImportUpdRuleSeq:1234, caseMgmtImportSegmentNm:'sample data', caseMgmtUpdColumnNm:'sample data', caseMgmtImportUpdRuleDes:'sample data'};
      service.updateCaseMgmtImportUpdRule(caseMgmtImportUpdRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casemgmtimportupdrules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCaseMgmtImportUpdRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCaseMgmtImportUpdRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casemgmtimportupdrules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});