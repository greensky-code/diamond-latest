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

import { ProcGetPricingAccntCodesService } from './proc-get-pricing-accnt-codes.service';
import { ProcGetPricingAccntCodes } from '../api-models/proc-get-pricing-accnt-codes.model'
import { ProcGetPricingAccntCode } from "../api-models/testing/fake-proc-get-pricing-accnt-codes.model"

describe('ProcGetPricingAccntCodesService', () => {
  let injector: TestBed;
  let service: ProcGetPricingAccntCodesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetPricingAccntCodesService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetPricingAccntCodesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetPricingAccntCode', () => {
    it('should return an Promise<ProcGetPricingAccntCodes[]>', () => {
      const procGetPricingAccntCodes = [
       {pGroupId:'sample data', pSeqGroupId:1234, pGroupName:'sample data'},
       {pGroupId:'sample data', pSeqGroupId:1234, pGroupName:'sample data'},
       {pGroupId:'sample data', pSeqGroupId:1234, pGroupName:'sample data'}

      ];
      service.getProcGetPricingAccntCode().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetpricingaccntcode/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetPricingAccntCodes);
    });
  });


  describe('#createProcGetPricingAccntCodes', () => {
    var id = 1;
    it('should return an Promise<ProcGetPricingAccntCodes>', () => {
      const procGetPricingAccntCodes: ProcGetPricingAccntCodes = {pGroupId:'sample data', pSeqGroupId:1234, pGroupName:'sample data'};
      service.createProcGetPricingAccntCodes(procGetPricingAccntCodes).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetpricingaccntcode`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetPricingAccntCodes', () => {
    var id = 1;
    it('should return an Promise<ProcGetPricingAccntCodes>', () => {
      const procGetPricingAccntCodes: ProcGetPricingAccntCodes = {pGroupId:'sample data', pSeqGroupId:1234, pGroupName:'sample data'};
      service.updateProcGetPricingAccntCodes(procGetPricingAccntCodes, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetpricingaccntcode/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetPricingAccntCodes', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetPricingAccntCodes(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetpricingaccntcode/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});