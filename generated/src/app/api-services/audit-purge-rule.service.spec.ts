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

import { AuditPurgeRuleService } from './audit-purge-rule.service';
import { AuditPurgeRule } from '../api-models/audit-purge-rule.model'
import { AuditPurgeRules } from "../api-models/testing/fake-audit-purge-rule.model"

describe('AuditPurgeRuleService', () => {
  let injector: TestBed;
  let service: AuditPurgeRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuditPurgeRuleService]
    });
    injector = getTestBed();
    service = injector.get(AuditPurgeRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuditPurgeRules', () => {
    it('should return an Promise<AuditPurgeRule[]>', () => {
      const auditPurgeRule = [
       {ruleName:'sample data', description:'sample data', changedRecordPath:'sample data', changedRecordFilename:'sample data', deletedRecordPath:'sample data', deletedRecordFilename:'sample data', purgeCriteriaTimeframe:'sample data', purgeCriteriaTime:1234, purgeCriteriaDate:'2018-01-01', keywords:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {ruleName:'sample data', description:'sample data', changedRecordPath:'sample data', changedRecordFilename:'sample data', deletedRecordPath:'sample data', deletedRecordFilename:'sample data', purgeCriteriaTimeframe:'sample data', purgeCriteriaTime:1234, purgeCriteriaDate:'2018-01-01', keywords:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {ruleName:'sample data', description:'sample data', changedRecordPath:'sample data', changedRecordFilename:'sample data', deletedRecordPath:'sample data', deletedRecordFilename:'sample data', purgeCriteriaTimeframe:'sample data', purgeCriteriaTime:1234, purgeCriteriaDate:'2018-01-01', keywords:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'}

      ];
      service.getAuditPurgeRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auditpurgerules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auditPurgeRule);
    });
  });


  describe('#createAuditPurgeRule', () => {
    var id = 1;
    it('should return an Promise<AuditPurgeRule>', () => {
      const auditPurgeRule: AuditPurgeRule = {ruleName:'sample data', description:'sample data', changedRecordPath:'sample data', changedRecordFilename:'sample data', deletedRecordPath:'sample data', deletedRecordFilename:'sample data', purgeCriteriaTimeframe:'sample data', purgeCriteriaTime:1234, purgeCriteriaDate:'2018-01-01', keywords:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.createAuditPurgeRule(auditPurgeRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditpurgerules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuditPurgeRule', () => {
    var id = 1;
    it('should return an Promise<AuditPurgeRule>', () => {
      const auditPurgeRule: AuditPurgeRule = {ruleName:'sample data', description:'sample data', changedRecordPath:'sample data', changedRecordFilename:'sample data', deletedRecordPath:'sample data', deletedRecordFilename:'sample data', purgeCriteriaTimeframe:'sample data', purgeCriteriaTime:1234, purgeCriteriaDate:'2018-01-01', keywords:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.updateAuditPurgeRule(auditPurgeRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditpurgerules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuditPurgeRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuditPurgeRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditpurgerules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});