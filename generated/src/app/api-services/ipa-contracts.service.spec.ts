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

import { IpaContractsService } from './ipa-contracts.service';
import { IpaContracts } from '../api-models/ipa-contracts.model'
import { IpaContractss } from "../api-models/testing/fake-ipa-contracts.model"

describe('IpaContractsService', () => {
  let injector: TestBed;
  let service: IpaContractsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpaContractsService]
    });
    injector = getTestBed();
    service = injector.get(IpaContractsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIpaContractss', () => {
    it('should return an Promise<IpaContracts[]>', () => {
      const ipaContracts = [
       {seqIpaContract:1234, ipaId:'sample data', lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', contractInformation:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', serviceAreaName:'sample data'},
       {seqIpaContract:1234, ipaId:'sample data', lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', contractInformation:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', serviceAreaName:'sample data'},
       {seqIpaContract:1234, ipaId:'sample data', lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', contractInformation:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', serviceAreaName:'sample data'}

      ];
      service.getIpaContractss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ipacontractss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ipaContracts);
    });
  });


  describe('#createIpaContracts', () => {
    var id = 1;
    it('should return an Promise<IpaContracts>', () => {
      const ipaContracts: IpaContracts = {seqIpaContract:1234, ipaId:'sample data', lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', contractInformation:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', serviceAreaName:'sample data'};
      service.createIpaContracts(ipaContracts).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipacontractss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIpaContracts', () => {
    var id = 1;
    it('should return an Promise<IpaContracts>', () => {
      const ipaContracts: IpaContracts = {seqIpaContract:1234, ipaId:'sample data', lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', contractInformation:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', serviceAreaName:'sample data'};
      service.updateIpaContracts(ipaContracts, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipacontractss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIpaContracts', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIpaContracts(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipacontractss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});