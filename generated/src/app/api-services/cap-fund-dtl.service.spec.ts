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

import { CapFundDtlService } from './cap-fund-dtl.service';
import { CapFundDtl } from '../api-models/cap-fund-dtl.model'
import { CapFundDtls } from "../api-models/testing/fake-cap-fund-dtl.model"

describe('CapFundDtlService', () => {
  let injector: TestBed;
  let service: CapFundDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapFundDtlService]
    });
    injector = getTestBed();
    service = injector.get(CapFundDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapFundDtls', () => {
    it('should return an Promise<CapFundDtl[]>', () => {
      const capFundDtl = [
       {capFundModelId:'sample data', capFundSubModelId:'sample data', capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capFundModelId:'sample data', capFundSubModelId:'sample data', capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capFundModelId:'sample data', capFundSubModelId:'sample data', capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCapFundDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capfunddtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capFundDtl);
    });
  });


  describe('#createCapFundDtl', () => {
    var id = 1;
    it('should return an Promise<CapFundDtl>', () => {
      const capFundDtl: CapFundDtl = {capFundModelId:'sample data', capFundSubModelId:'sample data', capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCapFundDtl(capFundDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfunddtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapFundDtl', () => {
    var id = 1;
    it('should return an Promise<CapFundDtl>', () => {
      const capFundDtl: CapFundDtl = {capFundModelId:'sample data', capFundSubModelId:'sample data', capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCapFundDtl(capFundDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfunddtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapFundDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapFundDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfunddtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});