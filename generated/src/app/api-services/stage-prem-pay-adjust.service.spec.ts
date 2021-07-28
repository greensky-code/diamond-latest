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

import { StagePremPayAdjustService } from './stage-prem-pay-adjust.service';
import { StagePremPayAdjust } from '../api-models/stage-prem-pay-adjust.model'
import { StagePremPayAdjusts } from "../api-models/testing/fake-stage-prem-pay-adjust.model"

describe('StagePremPayAdjustService', () => {
  let injector: TestBed;
  let service: StagePremPayAdjustService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePremPayAdjustService]
    });
    injector = getTestBed();
    service = injector.get(StagePremPayAdjustService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePremPayAdjusts', () => {
    it('should return an Promise<StagePremPayAdjust[]>', () => {
      const stagePremPayAdjust = [
       {batchId:'sample data', transactionId:1234, adjustId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', orgIdCodeQualifier:'sample data', orgIdentificationCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', adjustmentTransactionId:1234, adjustmentTransactionAmount:1234, adjustmentTransactionDate:'2018-01-01', adjustmentReason:'sample data', description:'sample data', transactionStatus:'sample data'},
       {batchId:'sample data', transactionId:1234, adjustId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', orgIdCodeQualifier:'sample data', orgIdentificationCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', adjustmentTransactionId:1234, adjustmentTransactionAmount:1234, adjustmentTransactionDate:'2018-01-01', adjustmentReason:'sample data', description:'sample data', transactionStatus:'sample data'},
       {batchId:'sample data', transactionId:1234, adjustId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', orgIdCodeQualifier:'sample data', orgIdentificationCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', adjustmentTransactionId:1234, adjustmentTransactionAmount:1234, adjustmentTransactionDate:'2018-01-01', adjustmentReason:'sample data', description:'sample data', transactionStatus:'sample data'}

      ];
      service.getStagePremPayAdjusts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayadjusts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePremPayAdjust);
    });
  });


  describe('#createStagePremPayAdjust', () => {
    var id = 1;
    it('should return an Promise<StagePremPayAdjust>', () => {
      const stagePremPayAdjust: StagePremPayAdjust = {batchId:'sample data', transactionId:1234, adjustId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', orgIdCodeQualifier:'sample data', orgIdentificationCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', adjustmentTransactionId:1234, adjustmentTransactionAmount:1234, adjustmentTransactionDate:'2018-01-01', adjustmentReason:'sample data', description:'sample data', transactionStatus:'sample data'};
      service.createStagePremPayAdjust(stagePremPayAdjust).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayadjusts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePremPayAdjust', () => {
    var id = 1;
    it('should return an Promise<StagePremPayAdjust>', () => {
      const stagePremPayAdjust: StagePremPayAdjust = {batchId:'sample data', transactionId:1234, adjustId:1234, customerId:'sample data', customerType:'sample data', individualFirstName:'sample data', individualMiddleName:'sample data', individualLastName:'sample data', indivIdCodeQualifier:'sample data', indivIdentificationCode:'sample data', orgIdCodeQualifier:'sample data', orgIdentificationCode:'sample data', orgRefIdQualifier:'sample data', orgRefIdCode:'sample data', supplementalIdCodeQualifier:'sample data', supplementalIdCode:'sample data', companyCode:'sample data', glRefCode:'sample data', adjustmentTransactionId:1234, adjustmentTransactionAmount:1234, adjustmentTransactionDate:'2018-01-01', adjustmentReason:'sample data', description:'sample data', transactionStatus:'sample data'};
      service.updateStagePremPayAdjust(stagePremPayAdjust, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayadjusts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePremPayAdjust', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePremPayAdjust(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayadjusts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});