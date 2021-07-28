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

import { AgentCommissionService } from './agent-commission.service';
import { AgentCommission } from '../api-models/agent-commission.model'
import { AgentCommissions } from "../api-models/testing/fake-agent-commission.model"

describe('AgentCommissionService', () => {
  let injector: TestBed;
  let service: AgentCommissionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgentCommissionService]
    });
    injector = getTestBed();
    service = injector.get(AgentCommissionService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAgentCommissions', () => {
    it('should return an Promise<AgentCommission[]>', () => {
      const agentCommission = [
       {seqAgentCommissionId:1234, seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentCommissionId:1234, seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentCommissionId:1234, seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAgentCommissions().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/agentcommissions/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(agentCommission);
    });
  });


  describe('#createAgentCommission', () => {
    var id = 1;
    it('should return an Promise<AgentCommission>', () => {
      const agentCommission: AgentCommission = {seqAgentCommissionId:1234, seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAgentCommission(agentCommission).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentcommissions`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAgentCommission', () => {
    var id = 1;
    it('should return an Promise<AgentCommission>', () => {
      const agentCommission: AgentCommission = {seqAgentCommissionId:1234, seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, agentSalesType:'sample data', seqAgentId:1234, commissionPercentage:1234, seqVendId:1234, seqVendAddress:1234, userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAgentCommission(agentCommission, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentcommissions/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAgentCommission', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAgentCommission(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentcommissions/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});