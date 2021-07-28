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

import { EftSummaryWorkService } from './eft-summary-work.service';
import { EftSummaryWork } from '../api-models/eft-summary-work.model'
import { EftSummaryWorks } from "../api-models/testing/fake-eft-summary-work.model"

describe('EftSummaryWorkService', () => {
  let injector: TestBed;
  let service: EftSummaryWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EftSummaryWorkService]
    });
    injector = getTestBed();
    service = injector.get(EftSummaryWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getEftSummaryWorks', () => {
    it('should return an Promise<EftSummaryWork[]>', () => {
      const eftSummaryWork = [
       {eftTransNumber:'sample data', eftTransDate:'2018-01-01', seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, vendorId:'sample data', fullName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', vendBankAccountNumber:'sample data', vendBankAccountDescription:'sample data', vendAbaRoutingNumber:'sample data', bankAccountNumber:'sample data', bankAccountDescription:'sample data', abaRoutingNumber:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', eftNotes:'sample data', eftStatus:'sample data', country:'sample data', category:'sample data'},
       {eftTransNumber:'sample data', eftTransDate:'2018-01-01', seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, vendorId:'sample data', fullName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', vendBankAccountNumber:'sample data', vendBankAccountDescription:'sample data', vendAbaRoutingNumber:'sample data', bankAccountNumber:'sample data', bankAccountDescription:'sample data', abaRoutingNumber:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', eftNotes:'sample data', eftStatus:'sample data', country:'sample data', category:'sample data'},
       {eftTransNumber:'sample data', eftTransDate:'2018-01-01', seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, vendorId:'sample data', fullName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', vendBankAccountNumber:'sample data', vendBankAccountDescription:'sample data', vendAbaRoutingNumber:'sample data', bankAccountNumber:'sample data', bankAccountDescription:'sample data', abaRoutingNumber:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', eftNotes:'sample data', eftStatus:'sample data', country:'sample data', category:'sample data'}

      ];
      service.getEftSummaryWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/eftsummaryworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(eftSummaryWork);
    });
  });


  describe('#createEftSummaryWork', () => {
    var id = 1;
    it('should return an Promise<EftSummaryWork>', () => {
      const eftSummaryWork: EftSummaryWork = {eftTransNumber:'sample data', eftTransDate:'2018-01-01', seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, vendorId:'sample data', fullName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', vendBankAccountNumber:'sample data', vendBankAccountDescription:'sample data', vendAbaRoutingNumber:'sample data', bankAccountNumber:'sample data', bankAccountDescription:'sample data', abaRoutingNumber:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', eftNotes:'sample data', eftStatus:'sample data', country:'sample data', category:'sample data'};
      service.createEftSummaryWork(eftSummaryWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/eftsummaryworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateEftSummaryWork', () => {
    var id = 1;
    it('should return an Promise<EftSummaryWork>', () => {
      const eftSummaryWork: EftSummaryWork = {eftTransNumber:'sample data', eftTransDate:'2018-01-01', seqCkprtId:1234, seqVendId:1234, seqVendAddress:1234, vendorId:'sample data', fullName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', vendBankAccountNumber:'sample data', vendBankAccountDescription:'sample data', vendAbaRoutingNumber:'sample data', bankAccountNumber:'sample data', bankAccountDescription:'sample data', abaRoutingNumber:'sample data', bankAccountCode:'sample data', netAmt:1234, amtText:'sample data', eftNotes:'sample data', eftStatus:'sample data', country:'sample data', category:'sample data'};
      service.updateEftSummaryWork(eftSummaryWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/eftsummaryworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteEftSummaryWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteEftSummaryWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/eftsummaryworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});