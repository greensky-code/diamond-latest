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

import { CheckAuditService } from './check-audit.service';
import { CheckAudit } from '../api-models/check-audit.model'
import { CheckAudits } from "../api-models/testing/fake-check-audit.model"

describe('CheckAuditService', () => {
  let injector: TestBed;
  let service: CheckAuditService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckAuditService]
    });
    injector = getTestBed();
    service = injector.get(CheckAuditService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCheckAudits', () => {
    it('should return an Promise<CheckAudit[]>', () => {
      const checkAudit = [
       {bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', seqCvsupId:1234, securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'},
       {bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', seqCvsupId:1234, securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'},
       {bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', seqCvsupId:1234, securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'}

      ];
      service.getCheckAudits().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/checkaudits/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(checkAudit);
    });
  });


  describe('#createCheckAudit', () => {
    var id = 1;
    it('should return an Promise<CheckAudit>', () => {
      const checkAudit: CheckAudit = {bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', seqCvsupId:1234, securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'};
      service.createCheckAudit(checkAudit).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkaudits`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCheckAudit', () => {
    var id = 1;
    it('should return an Promise<CheckAudit>', () => {
      const checkAudit: CheckAudit = {bankAccountCode:'sample data', checkNumber:'sample data', checkTransSeq:1234, checkDate:'2018-01-01', transStatus:'sample data', priorStatus:'sample data', seqVendId:1234, seqVendAddress:1234, transReasonCode:'sample data', priorReasonCode:'sample data', transStatusDate:'2018-01-01', priorStatusDate:'2018-01-01', seqCvsupId:1234, securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'};
      service.updateCheckAudit(checkAudit, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkaudits/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCheckAudit', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCheckAudit(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkaudits/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});