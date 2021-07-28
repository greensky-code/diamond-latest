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

import { AptaxCalcResultsService } from './aptax-calc-results.service';
import { AptaxCalcResults } from '../api-models/aptax-calc-results.model'
import { AptaxCalcResultss } from "../api-models/testing/fake-aptax-calc-results.model"

describe('AptaxCalcResultsService', () => {
  let injector: TestBed;
  let service: AptaxCalcResultsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AptaxCalcResultsService]
    });
    injector = getTestBed();
    service = injector.get(AptaxCalcResultsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAptaxCalcResultss', () => {
    it('should return an Promise<AptaxCalcResults[]>', () => {
      const aptaxCalcResults = [
       {seqAptaxId:1234, seqVendId:1234, vendorPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {seqAptaxId:1234, seqVendId:1234, vendorPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {seqAptaxId:1234, seqVendId:1234, vendorPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'}

      ];
      service.getAptaxCalcResultss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/aptaxcalcresultss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(aptaxCalcResults);
    });
  });


  describe('#createAptaxCalcResults', () => {
    var id = 1;
    it('should return an Promise<AptaxCalcResults>', () => {
      const aptaxCalcResults: AptaxCalcResults = {seqAptaxId:1234, seqVendId:1234, vendorPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.createAptaxCalcResults(aptaxCalcResults).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aptaxcalcresultss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAptaxCalcResults', () => {
    var id = 1;
    it('should return an Promise<AptaxCalcResults>', () => {
      const aptaxCalcResults: AptaxCalcResults = {seqAptaxId:1234, seqVendId:1234, vendorPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.updateAptaxCalcResults(aptaxCalcResults, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aptaxcalcresultss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAptaxCalcResults', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAptaxCalcResults(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/aptaxcalcresultss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});