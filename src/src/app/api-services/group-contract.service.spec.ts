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

import { GroupContractService } from './group-contract.service';
import { GroupContract } from '../api-models/group-contract.model'
import { GroupContracts } from "../api-models/testing/fake-group-contract.model"

describe('GroupContractService', () => {
  let injector: TestBed;
  let service: GroupContractService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupContractService]
    });
    injector = getTestBed();
    service = injector.get(GroupContractService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGroupContracts', () => {
    it('should return an Promise<GroupContract[]>', () => {
      const groupContract = [
       {userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', seqAgentId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', userDefined2:'sample data', userDefined1:'sample data', contractType:'sample data', studentAgeTo:1234, studentAgeFrom:1234, waitingPeriod:1234, numberOfEmployees:1234, openEnrollEnd:'2018-01-01', openEnrollStart:'2018-01-01', salespersonName:'sample data', brokerName:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, seqGroupContract:1234},
       {userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', seqAgentId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', userDefined2:'sample data', userDefined1:'sample data', contractType:'sample data', studentAgeTo:1234, studentAgeFrom:1234, waitingPeriod:1234, numberOfEmployees:1234, openEnrollEnd:'2018-01-01', openEnrollStart:'2018-01-01', salespersonName:'sample data', brokerName:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, seqGroupContract:1234},
       {userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', seqAgentId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', userDefined2:'sample data', userDefined1:'sample data', contractType:'sample data', studentAgeTo:1234, studentAgeFrom:1234, waitingPeriod:1234, numberOfEmployees:1234, openEnrollEnd:'2018-01-01', openEnrollStart:'2018-01-01', salespersonName:'sample data', brokerName:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, seqGroupContract:1234}

      ];
      service.getGroupContracts().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/groupcontracts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(groupContract);
    });
  });


  describe('#createGroupContract', () => {
    var id = 1;
    it('should return an Promise<GroupContract>', () => {
      const groupContract: GroupContract = {userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', seqAgentId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', userDefined2:'sample data', userDefined1:'sample data', contractType:'sample data', studentAgeTo:1234, studentAgeFrom:1234, waitingPeriod:1234, numberOfEmployees:1234, openEnrollEnd:'2018-01-01', openEnrollStart:'2018-01-01', salespersonName:'sample data', brokerName:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, seqGroupContract:1234};
      service.createGroupContract(groupContract).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupcontracts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGroupContract', () => {
    var id = 1;
    it('should return an Promise<GroupContract>', () => {
      const groupContract: GroupContract = {userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', seqAgentId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', userDefined2:'sample data', userDefined1:'sample data', contractType:'sample data', studentAgeTo:1234, studentAgeFrom:1234, waitingPeriod:1234, numberOfEmployees:1234, openEnrollEnd:'2018-01-01', openEnrollStart:'2018-01-01', salespersonName:'sample data', brokerName:'sample data', termReason:'sample data', termDate:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, seqGroupContract:1234};
      service.updateGroupContract(groupContract, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupcontracts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGroupContract', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGroupContract(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupcontracts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});