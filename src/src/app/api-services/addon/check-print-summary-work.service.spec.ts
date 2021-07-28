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

import { CheckPrintSummaryWorkService } from './check-print-summary-work.service';
import { CheckPrintSummaryWork } from '../api-models/check-print-summary-work.model'
import { CheckPrintSummaryWorks } from "../api-models/testing/fake-check-print-summary-work.model"

describe('CheckPrintSummaryWorkService', () => {
  let injector: TestBed;
  let service: CheckPrintSummaryWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckPrintSummaryWorkService]
    });
    injector = getTestBed();
    service = injector.get(CheckPrintSummaryWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCheckPrintSummaryWorks', () => {
    it('should return an Promise<CheckPrintSummaryWork[]>', () => {
      const checkPrintSummaryWork = [
       {seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', companyCode:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', checkNotes:'sample data', checkStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', category:'sample data'},
       {seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', companyCode:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', checkNotes:'sample data', checkStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', category:'sample data'},
       {seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', companyCode:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', checkNotes:'sample data', checkStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', category:'sample data'}

      ];
      service.getCheckPrintSummaryWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintsummaryworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(checkPrintSummaryWork);
    });
  });


  describe('#createCheckPrintSummaryWork', () => {
    var id = 1;
    it('should return an Promise<CheckPrintSummaryWork>', () => {
      const checkPrintSummaryWork: CheckPrintSummaryWork = {seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', companyCode:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', checkNotes:'sample data', checkStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', category:'sample data'};
      service.createCheckPrintSummaryWork(checkPrintSummaryWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintsummaryworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCheckPrintSummaryWork', () => {
    var id = 1;
    it('should return an Promise<CheckPrintSummaryWork>', () => {
      const checkPrintSummaryWork: CheckPrintSummaryWork = {seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, checkNumber:'sample data', checkDate:'2018-01-01', companyCode:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', checkNotes:'sample data', checkStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', category:'sample data'};
      service.updateCheckPrintSummaryWork(checkPrintSummaryWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintsummaryworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCheckPrintSummaryWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCheckPrintSummaryWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintsummaryworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});