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

import { CapModelSelectService } from './cap-model-select.service';
import { CapModelSelect } from '../api-models/cap-model-select.model'
import { CapModelSelects } from "../api-models/testing/fake-cap-model-select.model"

describe('CapModelSelectService', () => {
  let injector: TestBed;
  let service: CapModelSelectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapModelSelectService]
    });
    injector = getTestBed();
    service = injector.get(CapModelSelectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapModelSelects', () => {
    it('should return an Promise<CapModelSelect[]>', () => {
      const capModelSelect = [
       {capModelId:'sample data', seqCapModelSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'},
       {capModelId:'sample data', seqCapModelSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'},
       {capModelId:'sample data', seqCapModelSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'}

      ];
      service.getCapModelSelects().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capmodelselects/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capModelSelect);
    });
  });


  describe('#createCapModelSelect', () => {
    var id = 1;
    it('should return an Promise<CapModelSelect>', () => {
      const capModelSelect: CapModelSelect = {capModelId:'sample data', seqCapModelSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'};
      service.createCapModelSelect(capModelSelect).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmodelselects`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapModelSelect', () => {
    var id = 1;
    it('should return an Promise<CapModelSelect>', () => {
      const capModelSelect: CapModelSelect = {capModelId:'sample data', seqCapModelSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'};
      service.updateCapModelSelect(capModelSelect, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmodelselects/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapModelSelect', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapModelSelect(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmodelselects/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});