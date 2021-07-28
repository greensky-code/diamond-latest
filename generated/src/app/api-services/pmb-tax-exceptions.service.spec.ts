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

import { PmbTaxExceptionsService } from './pmb-tax-exceptions.service';
import { PmbTaxExceptions } from '../api-models/pmb-tax-exceptions.model'
import { PmbTaxExceptionss } from "../api-models/testing/fake-pmb-tax-exceptions.model"

describe('PmbTaxExceptionsService', () => {
  let injector: TestBed;
  let service: PmbTaxExceptionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbTaxExceptionsService]
    });
    injector = getTestBed();
    service = injector.get(PmbTaxExceptionsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbTaxExceptionss', () => {
    it('should return an Promise<PmbTaxExceptions[]>', () => {
      const pmbTaxExceptions = [
       {seqTaxExceptionId:1234, seqGpbilId:1234, seqGroupId:1234, procedureName:'sample data', tableName:'sample data', userName:'sample data', errorCode:'sample data', errorMessage:'sample data', errorDatetime:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqTaxExceptionId:1234, seqGpbilId:1234, seqGroupId:1234, procedureName:'sample data', tableName:'sample data', userName:'sample data', errorCode:'sample data', errorMessage:'sample data', errorDatetime:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqTaxExceptionId:1234, seqGpbilId:1234, seqGroupId:1234, procedureName:'sample data', tableName:'sample data', userName:'sample data', errorCode:'sample data', errorMessage:'sample data', errorDatetime:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPmbTaxExceptionss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbtaxexceptionss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbTaxExceptions);
    });
  });


  describe('#createPmbTaxExceptions', () => {
    var id = 1;
    it('should return an Promise<PmbTaxExceptions>', () => {
      const pmbTaxExceptions: PmbTaxExceptions = {seqTaxExceptionId:1234, seqGpbilId:1234, seqGroupId:1234, procedureName:'sample data', tableName:'sample data', userName:'sample data', errorCode:'sample data', errorMessage:'sample data', errorDatetime:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPmbTaxExceptions(pmbTaxExceptions).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbtaxexceptionss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbTaxExceptions', () => {
    var id = 1;
    it('should return an Promise<PmbTaxExceptions>', () => {
      const pmbTaxExceptions: PmbTaxExceptions = {seqTaxExceptionId:1234, seqGpbilId:1234, seqGroupId:1234, procedureName:'sample data', tableName:'sample data', userName:'sample data', errorCode:'sample data', errorMessage:'sample data', errorDatetime:'2018-01-01', comments:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePmbTaxExceptions(pmbTaxExceptions, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbtaxexceptionss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbTaxExceptions', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbTaxExceptions(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbtaxexceptionss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});