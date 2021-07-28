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

import { CompanyMasterService } from './company-master.service';
import { CompanyMaster } from '../api-models/company-master.model'
import { CompanyMasters } from "../api-models/testing/fake-company-master.model"

describe('CompanyMasterService', () => {
  let injector: TestBed;
  let service: CompanyMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyMasterService]
    });
    injector = getTestBed();
    service = injector.get(CompanyMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCompanyMasters', () => {
    it('should return an Promise<CompanyMaster[]>', () => {
      const companyMaster = [
       {companyCode:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', medicalPayAcct:'sample data', capPayAcct:'sample data', tradePayAcct:'sample data', irsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', manMedPayAcct:'sample data', manCapPayAcct:'sample data', country:'sample data', vendorMinCheck:1234, subscriberMinCheck:1234, agentCommissionPayAcct:'sample data', userDefined1:'sample data'},
       {companyCode:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', medicalPayAcct:'sample data', capPayAcct:'sample data', tradePayAcct:'sample data', irsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', manMedPayAcct:'sample data', manCapPayAcct:'sample data', country:'sample data', vendorMinCheck:1234, subscriberMinCheck:1234, agentCommissionPayAcct:'sample data', userDefined1:'sample data'},
       {companyCode:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', medicalPayAcct:'sample data', capPayAcct:'sample data', tradePayAcct:'sample data', irsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', manMedPayAcct:'sample data', manCapPayAcct:'sample data', country:'sample data', vendorMinCheck:1234, subscriberMinCheck:1234, agentCommissionPayAcct:'sample data', userDefined1:'sample data'}

      ];
      service.getCompanyMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/companymasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(companyMaster);
    });
  });


  describe('#createCompanyMaster', () => {
    var id = 1;
    it('should return an Promise<CompanyMaster>', () => {
      const companyMaster: CompanyMaster = {companyCode:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', medicalPayAcct:'sample data', capPayAcct:'sample data', tradePayAcct:'sample data', irsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', manMedPayAcct:'sample data', manCapPayAcct:'sample data', country:'sample data', vendorMinCheck:1234, subscriberMinCheck:1234, agentCommissionPayAcct:'sample data', userDefined1:'sample data'};
      service.createCompanyMaster(companyMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/companymasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCompanyMaster', () => {
    var id = 1;
    it('should return an Promise<CompanyMaster>', () => {
      const companyMaster: CompanyMaster = {companyCode:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', medicalPayAcct:'sample data', capPayAcct:'sample data', tradePayAcct:'sample data', irsTaxId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', manMedPayAcct:'sample data', manCapPayAcct:'sample data', country:'sample data', vendorMinCheck:1234, subscriberMinCheck:1234, agentCommissionPayAcct:'sample data', userDefined1:'sample data'};
      service.updateCompanyMaster(companyMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/companymasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCompanyMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCompanyMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/companymasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});