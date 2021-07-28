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

import { StagePremPayCashService } from './stage-prem-pay-cash.service';
import { StagePremPayCash } from '../api-models/stage-prem-pay-cash.model'
import { StagePremPayCashes } from "../api-models/testing/fake-stage-prem-pay-cash.model"

describe('StagePremPayCashService', () => {
  let injector: TestBed;
  let service: StagePremPayCashService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePremPayCashService]
    });
    injector = getTestBed();
    service = injector.get(StagePremPayCashService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePremPayCashes', () => {
    it('should return an Promise<StagePremPayCash[]>', () => {
      const stagePremPayCash = [
       {batchId:'sample data', transactionId:1234, cashId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', checkEftDate:'2018-01-01', checkEftReceiptDate:'2018-01-01', orgIdCodeQualifier:'sample data', orgIdCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', arTransactionAmount:1234, arTransactionType:'sample data', transactionStatus:'sample data'},
       {batchId:'sample data', transactionId:1234, cashId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', checkEftDate:'2018-01-01', checkEftReceiptDate:'2018-01-01', orgIdCodeQualifier:'sample data', orgIdCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', arTransactionAmount:1234, arTransactionType:'sample data', transactionStatus:'sample data'},
       {batchId:'sample data', transactionId:1234, cashId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', checkEftDate:'2018-01-01', checkEftReceiptDate:'2018-01-01', orgIdCodeQualifier:'sample data', orgIdCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', arTransactionAmount:1234, arTransactionType:'sample data', transactionStatus:'sample data'}

      ];
      service.getStagePremPayCashes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempaycashes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePremPayCash);
    });
  });


  describe('#createStagePremPayCash', () => {
    var id = 1;
    it('should return an Promise<StagePremPayCash>', () => {
      const stagePremPayCash: StagePremPayCash = {batchId:'sample data', transactionId:1234, cashId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', checkEftDate:'2018-01-01', checkEftReceiptDate:'2018-01-01', orgIdCodeQualifier:'sample data', orgIdCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', arTransactionAmount:1234, arTransactionType:'sample data', transactionStatus:'sample data'};
      service.createStagePremPayCash(stagePremPayCash).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempaycashes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePremPayCash', () => {
    var id = 1;
    it('should return an Promise<StagePremPayCash>', () => {
      const stagePremPayCash: StagePremPayCash = {batchId:'sample data', transactionId:1234, cashId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', checkEftDate:'2018-01-01', checkEftReceiptDate:'2018-01-01', orgIdCodeQualifier:'sample data', orgIdCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', arTransactionAmount:1234, arTransactionType:'sample data', transactionStatus:'sample data'};
      service.updateStagePremPayCash(stagePremPayCash, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempaycashes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePremPayCash', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePremPayCash(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempaycashes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});