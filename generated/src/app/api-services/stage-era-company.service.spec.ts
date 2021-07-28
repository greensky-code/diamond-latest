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

import { StageEraCompanyService } from './stage-era-company.service';
import { StageEraCompany } from '../api-models/stage-era-company.model'
import { StageEraCompanys } from "../api-models/testing/fake-stage-era-company.model"

describe('StageEraCompanyService', () => {
  let injector: TestBed;
  let service: StageEraCompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageEraCompanyService]
    });
    injector = getTestBed();
    service = injector.get(StageEraCompanyService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageEraCompanys', () => {
    it('should return an Promise<StageEraCompany[]>', () => {
      const stageEraCompany = [
       {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getStageEraCompanys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageeracompanys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageEraCompany);
    });
  });


  describe('#createStageEraCompany', () => {
    var id = 1;
    it('should return an Promise<StageEraCompany>', () => {
      const stageEraCompany: StageEraCompany = {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createStageEraCompany(stageEraCompany).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeracompanys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageEraCompany', () => {
    var id = 1;
    it('should return an Promise<StageEraCompany>', () => {
      const stageEraCompany: StageEraCompany = {batchId:'sample data', checkAmt:1234, abaRoutingNumber:'sample data', bankAccountNum:'sample data', companyCode:'sample data', vendAbaRoutingNumber:'sample data', vendBankAccountNumber:'sample data', checkDate:'2018-01-01', checkOrEftNumber:'sample data', payerIrsTaxId:'sample data', payerName:'sample data', payerAddressLine1:'sample data', payerAddressLine2:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', payeeFullName:'sample data', payeeIrsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateStageEraCompany(stageEraCompany, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeracompanys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageEraCompany', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageEraCompany(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeracompanys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});