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

import { ProcSavePricingAccntCodeService } from './proc-save-pricing-accnt-code.service';
import { ProcSavePricingAccntCode } from '../api-models/proc-save-pricing-accnt-code.model'
import { ProcSavePricingAccntCodes } from "../api-models/testing/fake-proc-save-pricing-accnt-code.model"

describe('ProcSavePricingAccntCodeService', () => {
  let injector: TestBed;
  let service: ProcSavePricingAccntCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcSavePricingAccntCodeService]
    });
    injector = getTestBed();
    service = injector.get(ProcSavePricingAccntCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcSavePricingAccntCodes', () => {
    it('should return an Promise<ProcSavePricingAccntCode[]>', () => {
      const procSavePricingAccntCode = [
       {pPricingAccntCode:'sample data', pSeqGroupId:1234, pTradingPartner:'sample data', pNewEffDate:'sample data', pNewTermDate:'sample data', pOldSeqPricingAccntId:1234, pOldChangeReasonCode:'sample data', pLanId:'sample data', pMsg:'sample data'},
       {pPricingAccntCode:'sample data', pSeqGroupId:1234, pTradingPartner:'sample data', pNewEffDate:'sample data', pNewTermDate:'sample data', pOldSeqPricingAccntId:1234, pOldChangeReasonCode:'sample data', pLanId:'sample data', pMsg:'sample data'},
       {pPricingAccntCode:'sample data', pSeqGroupId:1234, pTradingPartner:'sample data', pNewEffDate:'sample data', pNewTermDate:'sample data', pOldSeqPricingAccntId:1234, pOldChangeReasonCode:'sample data', pLanId:'sample data', pMsg:'sample data'}

      ];
      service.getProcSavePricingAccntCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procsavepricingaccntcodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procSavePricingAccntCode);
    });
  });


  describe('#createProcSavePricingAccntCode', () => {
    var id = 1;
    it('should return an Promise<ProcSavePricingAccntCode>', () => {
      const procSavePricingAccntCode: ProcSavePricingAccntCode = {pPricingAccntCode:'sample data', pSeqGroupId:1234, pTradingPartner:'sample data', pNewEffDate:'sample data', pNewTermDate:'sample data', pOldSeqPricingAccntId:1234, pOldChangeReasonCode:'sample data', pLanId:'sample data', pMsg:'sample data'};
      service.createProcSavePricingAccntCode(procSavePricingAccntCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsavepricingaccntcodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcSavePricingAccntCode', () => {
    var id = 1;
    it('should return an Promise<ProcSavePricingAccntCode>', () => {
      const procSavePricingAccntCode: ProcSavePricingAccntCode = {pPricingAccntCode:'sample data', pSeqGroupId:1234, pTradingPartner:'sample data', pNewEffDate:'sample data', pNewTermDate:'sample data', pOldSeqPricingAccntId:1234, pOldChangeReasonCode:'sample data', pLanId:'sample data', pMsg:'sample data'};
      service.updateProcSavePricingAccntCode(procSavePricingAccntCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsavepricingaccntcodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcSavePricingAccntCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcSavePricingAccntCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsavepricingaccntcodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});