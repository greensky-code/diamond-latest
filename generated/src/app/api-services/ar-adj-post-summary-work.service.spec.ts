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

import { ArAdjPostSummaryWorkService } from './ar-adj-post-summary-work.service';
import { ArAdjPostSummaryWork } from '../api-models/ar-adj-post-summary-work.model'
import { ArAdjPostSummaryWorks } from "../api-models/testing/fake-ar-adj-post-summary-work.model"

describe('ArAdjPostSummaryWorkService', () => {
  let injector: TestBed;
  let service: ArAdjPostSummaryWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArAdjPostSummaryWorkService]
    });
    injector = getTestBed();
    service = injector.get(ArAdjPostSummaryWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getArAdjPostSummaryWorks', () => {
    it('should return an Promise<ArAdjPostSummaryWork[]>', () => {
      const arAdjPostSummaryWork = [
       {seqAradjId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234},
       {seqAradjId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234},
       {seqAradjId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234}

      ];
      service.getArAdjPostSummaryWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/aradjpostsummaryworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(arAdjPostSummaryWork);
    });
  });


  describe('#createArAdjPostSummaryWork', () => {
    var id = 1;
    it('should return an Promise<ArAdjPostSummaryWork>', () => {
      const arAdjPostSummaryWork: ArAdjPostSummaryWork = {seqAradjId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234};
      service.createArAdjPostSummaryWork(arAdjPostSummaryWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aradjpostsummaryworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateArAdjPostSummaryWork', () => {
    var id = 1;
    it('should return an Promise<ArAdjPostSummaryWork>', () => {
      const arAdjPostSummaryWork: ArAdjPostSummaryWork = {seqAradjId:1234, companyCode:'sample data', chartOfAcctCode:'sample data', postingMonth:'2018-01-01', debitAmt:1234, creditAmt:1234};
      service.updateArAdjPostSummaryWork(arAdjPostSummaryWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aradjpostsummaryworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteArAdjPostSummaryWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteArAdjPostSummaryWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aradjpostsummaryworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});