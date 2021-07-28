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

import { GeneralLedgerInterfaceService } from './general-ledger-interface.service';
import { GeneralLedgerInterface } from '../api-models/general-ledger-interface.model'
import { GeneralLedgerInterfaces } from "../api-models/testing/fake-general-ledger-interface.model"

describe('GeneralLedgerInterfaceService', () => {
  let injector: TestBed;
  let service: GeneralLedgerInterfaceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeneralLedgerInterfaceService]
    });
    injector = getTestBed();
    service = injector.get(GeneralLedgerInterfaceService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGeneralLedgerInterfaces', () => {
    it('should return an Promise<GeneralLedgerInterface[]>', () => {
      const generalLedgerInterface = [
       {companyCode:'sample data', glAccountNumber:'sample data', postingMonth:'2018-01-01', postRunDateTime:'2018-01-01', transactionType:'sample data', debitAmt:1234, creditAmt:1234, glPostingStatus:'sample data'},
       {companyCode:'sample data', glAccountNumber:'sample data', postingMonth:'2018-01-01', postRunDateTime:'2018-01-01', transactionType:'sample data', debitAmt:1234, creditAmt:1234, glPostingStatus:'sample data'},
       {companyCode:'sample data', glAccountNumber:'sample data', postingMonth:'2018-01-01', postRunDateTime:'2018-01-01', transactionType:'sample data', debitAmt:1234, creditAmt:1234, glPostingStatus:'sample data'}

      ];
      service.getGeneralLedgerInterfaces().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerinterfaces/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(generalLedgerInterface);
    });
  });


  describe('#createGeneralLedgerInterface', () => {
    var id = 1;
    it('should return an Promise<GeneralLedgerInterface>', () => {
      const generalLedgerInterface: GeneralLedgerInterface = {companyCode:'sample data', glAccountNumber:'sample data', postingMonth:'2018-01-01', postRunDateTime:'2018-01-01', transactionType:'sample data', debitAmt:1234, creditAmt:1234, glPostingStatus:'sample data'};
      service.createGeneralLedgerInterface(generalLedgerInterface).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerinterfaces`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGeneralLedgerInterface', () => {
    var id = 1;
    it('should return an Promise<GeneralLedgerInterface>', () => {
      const generalLedgerInterface: GeneralLedgerInterface = {companyCode:'sample data', glAccountNumber:'sample data', postingMonth:'2018-01-01', postRunDateTime:'2018-01-01', transactionType:'sample data', debitAmt:1234, creditAmt:1234, glPostingStatus:'sample data'};
      service.updateGeneralLedgerInterface(generalLedgerInterface, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerinterfaces/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGeneralLedgerInterface', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGeneralLedgerInterface(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerinterfaces/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});