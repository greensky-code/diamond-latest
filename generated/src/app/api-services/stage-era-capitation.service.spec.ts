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

import { StageEraCapitationService } from './stage-era-capitation.service';
import { StageEraCapitation } from '../api-models/stage-era-capitation.model'
import { StageEraCapitations } from "../api-models/testing/fake-stage-era-capitation.model"

describe('StageEraCapitationService', () => {
  let injector: TestBed;
  let service: StageEraCapitationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageEraCapitationService]
    });
    injector = getTestBed();
    service = injector.get(StageEraCapitationService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageEraCapitations', () => {
    it('should return an Promise<StageEraCapitation[]>', () => {
      const stageEraCapitation = [
       {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', vendorId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', vendorId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', vendorId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getStageEraCapitations().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageeracapitations/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageEraCapitation);
    });
  });


  describe('#createStageEraCapitation', () => {
    var id = 1;
    it('should return an Promise<StageEraCapitation>', () => {
      const stageEraCapitation: StageEraCapitation = {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', vendorId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createStageEraCapitation(stageEraCapitation).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeracapitations`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageEraCapitation', () => {
    var id = 1;
    it('should return an Promise<StageEraCapitation>', () => {
      const stageEraCapitation: StageEraCapitation = {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', vendorId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateStageEraCapitation(stageEraCapitation, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeracapitations/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageEraCapitation', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageEraCapitation(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeracapitations/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});