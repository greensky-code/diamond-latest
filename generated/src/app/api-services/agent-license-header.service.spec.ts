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

import { AgentLicenseHeaderService } from './agent-license-header.service';
import { AgentLicenseHeader } from '../api-models/agent-license-header.model'
import { AgentLicenseHeaders } from "../api-models/testing/fake-agent-license-header.model"

describe('AgentLicenseHeaderService', () => {
  let injector: TestBed;
  let service: AgentLicenseHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgentLicenseHeaderService]
    });
    injector = getTestBed();
    service = injector.get(AgentLicenseHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAgentLicenseHeaders', () => {
    it('should return an Promise<AgentLicenseHeader[]>', () => {
      const agentLicenseHeader = [
       {seqAgentLicenseHeader:1234, seqAgentId:1234, state:'sample data', companyCode:'sample data', status:'sample data', statusDate:'2018-01-01', renewedReason:'sample data', renewedDate:'2018-01-01', closedReason:'sample data', closedDate:'2018-01-01', deniedReason:'sample data', deniedDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentLicenseHeader:1234, seqAgentId:1234, state:'sample data', companyCode:'sample data', status:'sample data', statusDate:'2018-01-01', renewedReason:'sample data', renewedDate:'2018-01-01', closedReason:'sample data', closedDate:'2018-01-01', deniedReason:'sample data', deniedDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentLicenseHeader:1234, seqAgentId:1234, state:'sample data', companyCode:'sample data', status:'sample data', statusDate:'2018-01-01', renewedReason:'sample data', renewedDate:'2018-01-01', closedReason:'sample data', closedDate:'2018-01-01', deniedReason:'sample data', deniedDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAgentLicenseHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/agentlicenseheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(agentLicenseHeader);
    });
  });


  describe('#createAgentLicenseHeader', () => {
    var id = 1;
    it('should return an Promise<AgentLicenseHeader>', () => {
      const agentLicenseHeader: AgentLicenseHeader = {seqAgentLicenseHeader:1234, seqAgentId:1234, state:'sample data', companyCode:'sample data', status:'sample data', statusDate:'2018-01-01', renewedReason:'sample data', renewedDate:'2018-01-01', closedReason:'sample data', closedDate:'2018-01-01', deniedReason:'sample data', deniedDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAgentLicenseHeader(agentLicenseHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentlicenseheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAgentLicenseHeader', () => {
    var id = 1;
    it('should return an Promise<AgentLicenseHeader>', () => {
      const agentLicenseHeader: AgentLicenseHeader = {seqAgentLicenseHeader:1234, seqAgentId:1234, state:'sample data', companyCode:'sample data', status:'sample data', statusDate:'2018-01-01', renewedReason:'sample data', renewedDate:'2018-01-01', closedReason:'sample data', closedDate:'2018-01-01', deniedReason:'sample data', deniedDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAgentLicenseHeader(agentLicenseHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentlicenseheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAgentLicenseHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAgentLicenseHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentlicenseheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});