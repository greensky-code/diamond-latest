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

import { CapControlDtlService } from './cap-control-dtl.service';
import { CapControlDtl } from '../api-models/cap-control-dtl.model'
import { CapControlDtls } from "../api-models/testing/fake-cap-control-dtl.model"

describe('CapControlDtlService', () => {
  let injector: TestBed;
  let service: CapControlDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapControlDtlService]
    });
    injector = getTestBed();
    service = injector.get(CapControlDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapControlDtls', () => {
    it('should return an Promise<CapControlDtl[]>', () => {
      const capControlDtl = [
       {capModel:'sample data', firstContractMonth:'2018-01-01', lastContractMonth:'2018-01-01', runDate:'2018-01-01', capMonthRun:'2018-01-01', openClosed:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capModel:'sample data', firstContractMonth:'2018-01-01', lastContractMonth:'2018-01-01', runDate:'2018-01-01', capMonthRun:'2018-01-01', openClosed:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capModel:'sample data', firstContractMonth:'2018-01-01', lastContractMonth:'2018-01-01', runDate:'2018-01-01', capMonthRun:'2018-01-01', openClosed:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCapControlDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capcontroldtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capControlDtl);
    });
  });


  describe('#createCapControlDtl', () => {
    var id = 1;
    it('should return an Promise<CapControlDtl>', () => {
      const capControlDtl: CapControlDtl = {capModel:'sample data', firstContractMonth:'2018-01-01', lastContractMonth:'2018-01-01', runDate:'2018-01-01', capMonthRun:'2018-01-01', openClosed:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCapControlDtl(capControlDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcontroldtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapControlDtl', () => {
    var id = 1;
    it('should return an Promise<CapControlDtl>', () => {
      const capControlDtl: CapControlDtl = {capModel:'sample data', firstContractMonth:'2018-01-01', lastContractMonth:'2018-01-01', runDate:'2018-01-01', capMonthRun:'2018-01-01', openClosed:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCapControlDtl(capControlDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcontroldtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapControlDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapControlDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcontroldtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});