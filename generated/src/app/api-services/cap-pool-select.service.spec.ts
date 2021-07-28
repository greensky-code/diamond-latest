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

import { CapPoolSelectService } from './cap-pool-select.service';
import { CapPoolSelect } from '../api-models/cap-pool-select.model'
import { CapPoolSelects } from "../api-models/testing/fake-cap-pool-select.model"

describe('CapPoolSelectService', () => {
  let injector: TestBed;
  let service: CapPoolSelectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapPoolSelectService]
    });
    injector = getTestBed();
    service = injector.get(CapPoolSelectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapPoolSelects', () => {
    it('should return an Promise<CapPoolSelect[]>', () => {
      const capPoolSelect = [
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, seqCapPoolSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', capPoolId:'sample data'},
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, seqCapPoolSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', capPoolId:'sample data'},
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, seqCapPoolSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', capPoolId:'sample data'}

      ];
      service.getCapPoolSelects().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolselects/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capPoolSelect);
    });
  });


  describe('#createCapPoolSelect', () => {
    var id = 1;
    it('should return an Promise<CapPoolSelect>', () => {
      const capPoolSelect: CapPoolSelect = {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, seqCapPoolSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', capPoolId:'sample data'};
      service.createCapPoolSelect(capPoolSelect).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolselects`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapPoolSelect', () => {
    var id = 1;
    it('should return an Promise<CapPoolSelect>', () => {
      const capPoolSelect: CapPoolSelect = {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, seqCapPoolSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', capPoolId:'sample data'};
      service.updateCapPoolSelect(capPoolSelect, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolselects/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapPoolSelect', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapPoolSelect(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolselects/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});