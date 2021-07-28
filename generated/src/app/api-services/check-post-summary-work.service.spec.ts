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

import { CheckPostSummaryWorkService } from './check-post-summary-work.service';
import { CheckPostSummaryWork } from '../api-models/check-post-summary-work.model'
import { CheckPostSummaryWorks } from "../api-models/testing/fake-check-post-summary-work.model"

describe('CheckPostSummaryWorkService', () => {
  let injector: TestBed;
  let service: CheckPostSummaryWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckPostSummaryWorkService]
    });
    injector = getTestBed();
    service = injector.get(CheckPostSummaryWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCheckPostSummaryWorks', () => {
    it('should return an Promise<CheckPostSummaryWork[]>', () => {
      const checkPostSummaryWork = [
       {seqCkprtId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', accumDebitAmt:1234, accumCreditAmt:1234},
       {seqCkprtId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', accumDebitAmt:1234, accumCreditAmt:1234},
       {seqCkprtId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', accumDebitAmt:1234, accumCreditAmt:1234}

      ];
      service.getCheckPostSummaryWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/checkpostsummaryworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(checkPostSummaryWork);
    });
  });


  describe('#createCheckPostSummaryWork', () => {
    var id = 1;
    it('should return an Promise<CheckPostSummaryWork>', () => {
      const checkPostSummaryWork: CheckPostSummaryWork = {seqCkprtId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', accumDebitAmt:1234, accumCreditAmt:1234};
      service.createCheckPostSummaryWork(checkPostSummaryWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkpostsummaryworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCheckPostSummaryWork', () => {
    var id = 1;
    it('should return an Promise<CheckPostSummaryWork>', () => {
      const checkPostSummaryWork: CheckPostSummaryWork = {seqCkprtId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', accumDebitAmt:1234, accumCreditAmt:1234};
      service.updateCheckPostSummaryWork(checkPostSummaryWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkpostsummaryworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCheckPostSummaryWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCheckPostSummaryWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkpostsummaryworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});