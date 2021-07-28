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

import { CapEntitySelectService } from './cap-entity-select.service';
import { CapEntitySelect } from '../api-models/cap-entity-select.model'
import { CapEntitySelects } from "../api-models/testing/fake-cap-entity-select.model"

describe('CapEntitySelectService', () => {
  let injector: TestBed;
  let service: CapEntitySelectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapEntitySelectService]
    });
    injector = getTestBed();
    service = injector.get(CapEntitySelectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapEntitySelects', () => {
    it('should return an Promise<CapEntitySelect[]>', () => {
      const capEntitySelect = [
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapEntitySel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'},
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapEntitySel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'},
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapEntitySel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'}

      ];
      service.getCapEntitySelects().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capentityselects/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capEntitySelect);
    });
  });


  describe('#createCapEntitySelect', () => {
    var id = 1;
    it('should return an Promise<CapEntitySelect>', () => {
      const capEntitySelect: CapEntitySelect = {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapEntitySel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'};
      service.createCapEntitySelect(capEntitySelect).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capentityselects`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapEntitySelect', () => {
    var id = 1;
    it('should return an Promise<CapEntitySelect>', () => {
      const capEntitySelect: CapEntitySelect = {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapEntitySel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'};
      service.updateCapEntitySelect(capEntitySelect, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capentityselects/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapEntitySelect', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapEntitySelect(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capentityselects/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});