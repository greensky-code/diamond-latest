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

import { AgentAddressContactService } from './agent-address-contact.service';
import { AgentAddressContact } from '../api-models/agent-address-contact.model'
import { AgentAddressContacts } from "../api-models/testing/fake-agent-address-contact.model"

describe('AgentAddressContactService', () => {
  let injector: TestBed;
  let service: AgentAddressContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgentAddressContactService]
    });
    injector = getTestBed();
    service = injector.get(AgentAddressContactService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAgentAddressContacts', () => {
    it('should return an Promise<AgentAddressContact[]>', () => {
      const agentAddressContact = [
       {seqAgentContact:1234, seqAgentId:1234, seqAgentAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', emailAddress:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentContact:1234, seqAgentId:1234, seqAgentAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', emailAddress:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAgentContact:1234, seqAgentId:1234, seqAgentAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', emailAddress:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAgentAddressContacts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/agentaddresscontacts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(agentAddressContact);
    });
  });


  describe('#createAgentAddressContact', () => {
    var id = 1;
    it('should return an Promise<AgentAddressContact>', () => {
      const agentAddressContact: AgentAddressContact = {seqAgentContact:1234, seqAgentId:1234, seqAgentAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', emailAddress:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAgentAddressContact(agentAddressContact).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentaddresscontacts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAgentAddressContact', () => {
    var id = 1;
    it('should return an Promise<AgentAddressContact>', () => {
      const agentAddressContact: AgentAddressContact = {seqAgentContact:1234, seqAgentId:1234, seqAgentAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', emailAddress:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAgentAddressContact(agentAddressContact, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentaddresscontacts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAgentAddressContact', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAgentAddressContact(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agentaddresscontacts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});