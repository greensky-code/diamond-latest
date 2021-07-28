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

import { DelegationServiceCodesService } from './delegation-service-codes.service';
import { DelegationServiceCodes } from '../api-models/delegation-service-codes.model'
import { DelegationServiceCodeses } from "../api-models/testing/fake-delegation-service-codes.model"

describe('DelegationServiceCodesService', () => {
  let injector: TestBed;
  let service: DelegationServiceCodesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DelegationServiceCodesService]
    });
    injector = getTestBed();
    service = injector.get(DelegationServiceCodesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDelegationServiceCodeses', () => {
    it('should return an Promise<DelegationServiceCodes[]>', () => {
      const delegationServiceCodes = [
       {delegationServiceCode:'sample data', delegationServiceDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {delegationServiceCode:'sample data', delegationServiceDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {delegationServiceCode:'sample data', delegationServiceDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getDelegationServiceCodeses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/delegationservicecodeses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(delegationServiceCodes);
    });
  });


  describe('#createDelegationServiceCodes', () => {
    var id = 1;
    it('should return an Promise<DelegationServiceCodes>', () => {
      const delegationServiceCodes: DelegationServiceCodes = {delegationServiceCode:'sample data', delegationServiceDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createDelegationServiceCodes(delegationServiceCodes).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/delegationservicecodeses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDelegationServiceCodes', () => {
    var id = 1;
    it('should return an Promise<DelegationServiceCodes>', () => {
      const delegationServiceCodes: DelegationServiceCodes = {delegationServiceCode:'sample data', delegationServiceDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateDelegationServiceCodes(delegationServiceCodes, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/delegationservicecodeses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDelegationServiceCodes', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDelegationServiceCodes(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/delegationservicecodeses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});