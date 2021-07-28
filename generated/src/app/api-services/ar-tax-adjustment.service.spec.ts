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

import { ArTaxAdjustmentService } from './ar-tax-adjustment.service';
import { ArTaxAdjustment } from '../api-models/ar-tax-adjustment.model'
import { ArTaxAdjustments } from "../api-models/testing/fake-ar-tax-adjustment.model"

describe('ArTaxAdjustmentService', () => {
  let injector: TestBed;
  let service: ArTaxAdjustmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArTaxAdjustmentService]
    });
    injector = getTestBed();
    service = injector.get(ArTaxAdjustmentService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getArTaxAdjustments', () => {
    it('should return an Promise<ArTaxAdjustment[]>', () => {
      const arTaxAdjustment = [
       {seqAradjId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', transDate:'2018-01-01', glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'},
       {seqAradjId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', transDate:'2018-01-01', glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'},
       {seqAradjId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', transDate:'2018-01-01', glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'}

      ];
      service.getArTaxAdjustments().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/artaxadjustments/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(arTaxAdjustment);
    });
  });


  describe('#createArTaxAdjustment', () => {
    var id = 1;
    it('should return an Promise<ArTaxAdjustment>', () => {
      const arTaxAdjustment: ArTaxAdjustment = {seqAradjId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', transDate:'2018-01-01', glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'};
      service.createArTaxAdjustment(arTaxAdjustment).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/artaxadjustments`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateArTaxAdjustment', () => {
    var id = 1;
    it('should return an Promise<ArTaxAdjustment>', () => {
      const arTaxAdjustment: ArTaxAdjustment = {seqAradjId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', transDate:'2018-01-01', glRefCode:'sample data', taxPct:1234, taxAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', seqGpbilId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', taxType:'sample data'};
      service.updateArTaxAdjustment(arTaxAdjustment, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/artaxadjustments/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteArTaxAdjustment', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteArTaxAdjustment(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/artaxadjustments/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});