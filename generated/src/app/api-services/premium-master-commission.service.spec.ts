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

import { PremiumMasterCommissionService } from './premium-master-commission.service';
import { PremiumMasterCommission } from '../api-models/premium-master-commission.model'
import { PremiumMasterCommissions } from "../api-models/testing/fake-premium-master-commission.model"

describe('PremiumMasterCommissionService', () => {
  let injector: TestBed;
  let service: PremiumMasterCommissionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremiumMasterCommissionService]
    });
    injector = getTestBed();
    service = injector.get(PremiumMasterCommissionService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremiumMasterCommissions', () => {
    it('should return an Promise<PremiumMasterCommission[]>', () => {
      const premiumMasterCommission = [
       {seqPremCommissionId:1234, seqPremId:1234, seqGroupId:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPremCommissionId:1234, seqPremId:1234, seqGroupId:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPremCommissionId:1234, seqPremId:1234, seqGroupId:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPremiumMasterCommissions().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/premiummastercommissions/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premiumMasterCommission);
    });
  });


  describe('#createPremiumMasterCommission', () => {
    var id = 1;
    it('should return an Promise<PremiumMasterCommission>', () => {
      const premiumMasterCommission: PremiumMasterCommission = {seqPremCommissionId:1234, seqPremId:1234, seqGroupId:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPremiumMasterCommission(premiumMasterCommission).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummastercommissions`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremiumMasterCommission', () => {
    var id = 1;
    it('should return an Promise<PremiumMasterCommission>', () => {
      const premiumMasterCommission: PremiumMasterCommission = {seqPremCommissionId:1234, seqPremId:1234, seqGroupId:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePremiumMasterCommission(premiumMasterCommission, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummastercommissions/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremiumMasterCommission', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremiumMasterCommission(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/premiummastercommissions/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});