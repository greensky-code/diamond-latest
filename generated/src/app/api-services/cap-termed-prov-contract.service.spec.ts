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

import { CapTermedProvContractService } from './cap-termed-prov-contract.service';
import { CapTermedProvContract } from '../api-models/cap-termed-prov-contract.model'
import { CapTermedProvContracts } from "../api-models/testing/fake-cap-termed-prov-contract.model"

describe('CapTermedProvContractService', () => {
  let injector: TestBed;
  let service: CapTermedProvContractService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapTermedProvContractService]
    });
    injector = getTestBed();
    service = injector.get(CapTermedProvContractService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapTermedProvContracts', () => {
    it('should return an Promise<CapTermedProvContract[]>', () => {
      const capTermedProvContract = [
       {seqProvContract:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {seqProvContract:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {seqProvContract:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'}

      ];
      service.getCapTermedProvContracts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/captermedprovcontracts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capTermedProvContract);
    });
  });


  describe('#createCapTermedProvContract', () => {
    var id = 1;
    it('should return an Promise<CapTermedProvContract>', () => {
      const capTermedProvContract: CapTermedProvContract = {seqProvContract:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.createCapTermedProvContract(capTermedProvContract).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captermedprovcontracts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapTermedProvContract', () => {
    var id = 1;
    it('should return an Promise<CapTermedProvContract>', () => {
      const capTermedProvContract: CapTermedProvContract = {seqProvContract:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.updateCapTermedProvContract(capTermedProvContract, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captermedprovcontracts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapTermedProvContract', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapTermedProvContract(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captermedprovcontracts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});