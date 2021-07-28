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

import { ArAdjustmentService } from './ar-adjustment.service';
import { ArAdjustment } from '../api-models/ar-adjustment.model'
import { ArAdjustments } from "../api-models/testing/fake-ar-adjustment.model"

describe('ArAdjustmentService', () => {
  let injector: TestBed;
  let service: ArAdjustmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArAdjustmentService]
    });
    injector = getTestBed();
    service = injector.get(ArAdjustmentService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getArAdjustments', () => {
    it('should return an Promise<ArAdjustment[]>', () => {
      const arAdjustment = [
       {seqAradjId:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', transDesc:'sample data', adjReason:'sample data', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAradjId:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', transDesc:'sample data', adjReason:'sample data', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAradjId:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', transDesc:'sample data', adjReason:'sample data', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getArAdjustments().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/aradjustments/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(arAdjustment);
    });
  });


  describe('#createArAdjustment', () => {
    var id = 1;
    it('should return an Promise<ArAdjustment>', () => {
      const arAdjustment: ArAdjustment = {seqAradjId:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', transDesc:'sample data', adjReason:'sample data', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createArAdjustment(arAdjustment).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aradjustments`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateArAdjustment', () => {
    var id = 1;
    it('should return an Promise<ArAdjustment>', () => {
      const arAdjustment: ArAdjustment = {seqAradjId:1234, customerType:'sample data', customerId:'sample data', transDate:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', transAmt:1234, statementStatus:'sample data', invoiceNo:1234, postDate:'2018-01-01', transDesc:'sample data', adjReason:'sample data', seqGpbilId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateArAdjustment(arAdjustment, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aradjustments/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteArAdjustment', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteArAdjustment(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aradjustments/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});