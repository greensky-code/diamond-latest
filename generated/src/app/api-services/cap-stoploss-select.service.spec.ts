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

import { CapStoplossSelectService } from './cap-stoploss-select.service';
import { CapStoplossSelect } from '../api-models/cap-stoploss-select.model'
import { CapStoplossSelects } from "../api-models/testing/fake-cap-stoploss-select.model"

describe('CapStoplossSelectService', () => {
  let injector: TestBed;
  let service: CapStoplossSelectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapStoplossSelectService]
    });
    injector = getTestBed();
    service = injector.get(CapStoplossSelectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapStoplossSelects', () => {
    it('should return an Promise<CapStoplossSelect[]>', () => {
      const capStoplossSelect = [
       {capModelId:'sample data', capStoplossId:'sample data', seqStoplossSel:1234, columnName:'sample data', columnOccurrence:1234, fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', operator:'sample data', columnType:'sample data'},
       {capModelId:'sample data', capStoplossId:'sample data', seqStoplossSel:1234, columnName:'sample data', columnOccurrence:1234, fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', operator:'sample data', columnType:'sample data'},
       {capModelId:'sample data', capStoplossId:'sample data', seqStoplossSel:1234, columnName:'sample data', columnOccurrence:1234, fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', operator:'sample data', columnType:'sample data'}

      ];
      service.getCapStoplossSelects().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capstoplossselects/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capStoplossSelect);
    });
  });


  describe('#createCapStoplossSelect', () => {
    var id = 1;
    it('should return an Promise<CapStoplossSelect>', () => {
      const capStoplossSelect: CapStoplossSelect = {capModelId:'sample data', capStoplossId:'sample data', seqStoplossSel:1234, columnName:'sample data', columnOccurrence:1234, fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', operator:'sample data', columnType:'sample data'};
      service.createCapStoplossSelect(capStoplossSelect).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capstoplossselects`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapStoplossSelect', () => {
    var id = 1;
    it('should return an Promise<CapStoplossSelect>', () => {
      const capStoplossSelect: CapStoplossSelect = {capModelId:'sample data', capStoplossId:'sample data', seqStoplossSel:1234, columnName:'sample data', columnOccurrence:1234, fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', operator:'sample data', columnType:'sample data'};
      service.updateCapStoplossSelect(capStoplossSelect, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capstoplossselects/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapStoplossSelect', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapStoplossSelect(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capstoplossselects/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});