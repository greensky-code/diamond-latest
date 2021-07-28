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

import { CapStoplossService } from './cap-stoploss.service';
import { CapStoploss } from '../api-models/cap-stoploss.model'
import { CapStoplosses } from "../api-models/testing/fake-cap-stoploss.model"

describe('CapStoplossService', () => {
  let injector: TestBed;
  let service: CapStoplossService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapStoplossService]
    });
    injector = getTestBed();
    service = injector.get(CapStoplossService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapStoplosses', () => {
    it('should return an Promise<CapStoploss[]>', () => {
      const capStoploss = [
       {capModelId:'sample data', capStoplossId:'sample data', description:'sample data', amountTypeSl:'sample data', stoplossThreshold:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capModelId:'sample data', capStoplossId:'sample data', description:'sample data', amountTypeSl:'sample data', stoplossThreshold:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capModelId:'sample data', capStoplossId:'sample data', description:'sample data', amountTypeSl:'sample data', stoplossThreshold:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCapStoplosses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capstoplosses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capStoploss);
    });
  });


  describe('#createCapStoploss', () => {
    var id = 1;
    it('should return an Promise<CapStoploss>', () => {
      const capStoploss: CapStoploss = {capModelId:'sample data', capStoplossId:'sample data', description:'sample data', amountTypeSl:'sample data', stoplossThreshold:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCapStoploss(capStoploss).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capstoplosses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapStoploss', () => {
    var id = 1;
    it('should return an Promise<CapStoploss>', () => {
      const capStoploss: CapStoploss = {capModelId:'sample data', capStoplossId:'sample data', description:'sample data', amountTypeSl:'sample data', stoplossThreshold:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCapStoploss(capStoploss, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capstoplosses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapStoploss', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapStoploss(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capstoplosses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});