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

import { IpaContractDelegationsService } from './ipa-contract-delegations.service';
import { IpaContractDelegations } from '../api-models/ipa-contract-delegations.model'
import { IpaContractDelegationss } from "../api-models/testing/fake-ipa-contract-delegations.model"

describe('IpaContractDelegationsService', () => {
  let injector: TestBed;
  let service: IpaContractDelegationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpaContractDelegationsService]
    });
    injector = getTestBed();
    service = injector.get(IpaContractDelegationsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIpaContractDelegationss', () => {
    it('should return an Promise<IpaContractDelegations[]>', () => {
      const ipaContractDelegations = [
       {seqIpaContract:1234, delegationServiceCode:'sample data', delegationFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaContract:1234, delegationServiceCode:'sample data', delegationFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaContract:1234, delegationServiceCode:'sample data', delegationFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getIpaContractDelegationss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ipacontractdelegationss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ipaContractDelegations);
    });
  });


  describe('#createIpaContractDelegations', () => {
    var id = 1;
    it('should return an Promise<IpaContractDelegations>', () => {
      const ipaContractDelegations: IpaContractDelegations = {seqIpaContract:1234, delegationServiceCode:'sample data', delegationFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createIpaContractDelegations(ipaContractDelegations).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipacontractdelegationss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIpaContractDelegations', () => {
    var id = 1;
    it('should return an Promise<IpaContractDelegations>', () => {
      const ipaContractDelegations: IpaContractDelegations = {seqIpaContract:1234, delegationServiceCode:'sample data', delegationFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateIpaContractDelegations(ipaContractDelegations, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipacontractdelegationss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIpaContractDelegations', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIpaContractDelegations(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipacontractdelegationss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});