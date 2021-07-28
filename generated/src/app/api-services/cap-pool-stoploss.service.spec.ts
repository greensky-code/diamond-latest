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

import { CapPoolStoplossService } from './cap-pool-stoploss.service';
import { CapPoolStoploss } from '../api-models/cap-pool-stoploss.model'
import { CapPoolStoplosses } from "../api-models/testing/fake-cap-pool-stoploss.model"

describe('CapPoolStoplossService', () => {
  let injector: TestBed;
  let service: CapPoolStoplossService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapPoolStoplossService]
    });
    injector = getTestBed();
    service = injector.get(CapPoolStoplossService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapPoolStoplosses', () => {
    it('should return an Promise<CapPoolStoploss[]>', () => {
      const capPoolStoploss = [
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, capStoplossId:'sample data', companyCodeStop:'sample data', glRefCodeStop:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRuleStop:'sample data', capPoolId:'sample data'},
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, capStoplossId:'sample data', companyCodeStop:'sample data', glRefCodeStop:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRuleStop:'sample data', capPoolId:'sample data'},
       {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, capStoplossId:'sample data', companyCodeStop:'sample data', glRefCodeStop:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRuleStop:'sample data', capPoolId:'sample data'}

      ];
      service.getCapPoolStoplosses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolstoplosses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capPoolStoploss);
    });
  });


  describe('#createCapPoolStoploss', () => {
    var id = 1;
    it('should return an Promise<CapPoolStoploss>', () => {
      const capPoolStoploss: CapPoolStoploss = {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, capStoplossId:'sample data', companyCodeStop:'sample data', glRefCodeStop:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRuleStop:'sample data', capPoolId:'sample data'};
      service.createCapPoolStoploss(capPoolStoploss).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolstoplosses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapPoolStoploss', () => {
    var id = 1;
    it('should return an Promise<CapPoolStoploss>', () => {
      const capPoolStoploss: CapPoolStoploss = {capModelId:'sample data', capEntityCode:'sample data', capEntityId:'sample data', seqCapPoolId:1234, capStoplossId:'sample data', companyCodeStop:'sample data', glRefCodeStop:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', postingRuleStop:'sample data', capPoolId:'sample data'};
      service.updateCapPoolStoploss(capPoolStoploss, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolstoplosses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapPoolStoploss', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapPoolStoploss(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolstoplosses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});