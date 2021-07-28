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

import { AgentMasterService } from './agent-master.service';
import { AgentMaster } from '../api-models/agent-master.model'
import { AgentMasters } from "../api-models/testing/fake-agent-master.model"

describe('AgentMasterService', () => {
  let injector: TestBed;
  let service: AgentMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgentMasterService]
    });
    injector = getTestBed();
    service = injector.get(AgentMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAgentMasters', () => {
    it('should return an Promise<AgentMaster[]>', () => {
      const agentMaster = [
       {seqAgentId:1234, agentId:'sample data', agentType:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', shortName:'sample data', dateOfBirth:'2018-01-01', levelNumber:1234, seqParentAgentId:1234, backupWitholding:'sample data', commissionCalcThruDate:'2018-01-01', commissionPaidThruDate:'2018-01-01', commissionActivity:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentId:1234, agentId:'sample data', agentType:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', shortName:'sample data', dateOfBirth:'2018-01-01', levelNumber:1234, seqParentAgentId:1234, backupWitholding:'sample data', commissionCalcThruDate:'2018-01-01', commissionPaidThruDate:'2018-01-01', commissionActivity:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentId:1234, agentId:'sample data', agentType:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', shortName:'sample data', dateOfBirth:'2018-01-01', levelNumber:1234, seqParentAgentId:1234, backupWitholding:'sample data', commissionCalcThruDate:'2018-01-01', commissionPaidThruDate:'2018-01-01', commissionActivity:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAgentMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/agentmasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(agentMaster);
    });
  });


  describe('#createAgentMaster', () => {
    var id = 1;
    it('should return an Promise<AgentMaster>', () => {
      const agentMaster: AgentMaster = {seqAgentId:1234, agentId:'sample data', agentType:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', shortName:'sample data', dateOfBirth:'2018-01-01', levelNumber:1234, seqParentAgentId:1234, backupWitholding:'sample data', commissionCalcThruDate:'2018-01-01', commissionPaidThruDate:'2018-01-01', commissionActivity:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAgentMaster(agentMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentmasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAgentMaster', () => {
    var id = 1;
    it('should return an Promise<AgentMaster>', () => {
      const agentMaster: AgentMaster = {seqAgentId:1234, agentId:'sample data', agentType:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', shortName:'sample data', dateOfBirth:'2018-01-01', levelNumber:1234, seqParentAgentId:1234, backupWitholding:'sample data', commissionCalcThruDate:'2018-01-01', commissionPaidThruDate:'2018-01-01', commissionActivity:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAgentMaster(agentMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentmasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAgentMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAgentMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentmasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});