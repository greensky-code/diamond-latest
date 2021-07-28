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

import { ManualCheckSummaryWorkService } from './manual-check-summary-work.service';
import { ManualCheckSummaryWork } from '../api-models/manual-check-summary-work.model'
import { ManualCheckSummaryWorks } from "../api-models/testing/fake-manual-check-summary-work.model"

describe('ManualCheckSummaryWorkService', () => {
  let injector: TestBed;
  let service: ManualCheckSummaryWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ManualCheckSummaryWorkService]
    });
    injector = getTestBed();
    service = injector.get(ManualCheckSummaryWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getManualCheckSummaryWorks', () => {
    it('should return an Promise<ManualCheckSummaryWork[]>', () => {
      const manualCheckSummaryWork = [
       {seqVendAddress:1234, seqVendId:1234, companyCode:'sample data', bankAccountCode:'sample data', checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', passNumber:1234, seqCkprtId:1234},
       {seqVendAddress:1234, seqVendId:1234, companyCode:'sample data', bankAccountCode:'sample data', checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', passNumber:1234, seqCkprtId:1234},
       {seqVendAddress:1234, seqVendId:1234, companyCode:'sample data', bankAccountCode:'sample data', checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', passNumber:1234, seqCkprtId:1234}

      ];
      service.getManualCheckSummaryWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/manualchecksummaryworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(manualCheckSummaryWork);
    });
  });


  describe('#createManualCheckSummaryWork', () => {
    var id = 1;
    it('should return an Promise<ManualCheckSummaryWork>', () => {
      const manualCheckSummaryWork: ManualCheckSummaryWork = {seqVendAddress:1234, seqVendId:1234, companyCode:'sample data', bankAccountCode:'sample data', checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', passNumber:1234, seqCkprtId:1234};
      service.createManualCheckSummaryWork(manualCheckSummaryWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/manualchecksummaryworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateManualCheckSummaryWork', () => {
    var id = 1;
    it('should return an Promise<ManualCheckSummaryWork>', () => {
      const manualCheckSummaryWork: ManualCheckSummaryWork = {seqVendAddress:1234, seqVendId:1234, companyCode:'sample data', bankAccountCode:'sample data', checkAmt:1234, checkDate:'2018-01-01', checkNumber:'sample data', passNumber:1234, seqCkprtId:1234};
      service.updateManualCheckSummaryWork(manualCheckSummaryWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/manualchecksummaryworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteManualCheckSummaryWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteManualCheckSummaryWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/manualchecksummaryworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});