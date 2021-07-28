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

import { AgentLicenseDetailService } from './agent-license-detail.service';
import { AgentLicenseDetail } from '../api-models/agent-license-detail.model'
import { AgentLicenseDetails } from "../api-models/testing/fake-agent-license-detail.model"

describe('AgentLicenseDetailService', () => {
  let injector: TestBed;
  let service: AgentLicenseDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgentLicenseDetailService]
    });
    injector = getTestBed();
    service = injector.get(AgentLicenseDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAgentLicenseDetails', () => {
    it('should return an Promise<AgentLicenseDetail[]>', () => {
      const agentLicenseDetail = [
       {seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, seqAgentId:1234, lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, seqAgentId:1234, lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, seqAgentId:1234, lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAgentLicenseDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/agentlicensedetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(agentLicenseDetail);
    });
  });


  describe('#createAgentLicenseDetail', () => {
    var id = 1;
    it('should return an Promise<AgentLicenseDetail>', () => {
      const agentLicenseDetail: AgentLicenseDetail = {seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, seqAgentId:1234, lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAgentLicenseDetail(agentLicenseDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentlicensedetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAgentLicenseDetail', () => {
    var id = 1;
    it('should return an Promise<AgentLicenseDetail>', () => {
      const agentLicenseDetail: AgentLicenseDetail = {seqAgentLicenseDetail:1234, seqAgentLicenseHeader:1234, seqAgentId:1234, lineOfBusiness:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAgentLicenseDetail(agentLicenseDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentlicensedetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAgentLicenseDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAgentLicenseDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentlicensedetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});