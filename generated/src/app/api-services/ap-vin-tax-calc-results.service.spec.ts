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

import { ApVinTaxCalcResultsService } from './ap-vin-tax-calc-results.service';
import { ApVinTaxCalcResults } from '../api-models/ap-vin-tax-calc-results.model'
import { ApVinTaxCalcResultss } from "../api-models/testing/fake-ap-vin-tax-calc-results.model"

describe('ApVinTaxCalcResultsService', () => {
  let injector: TestBed;
  let service: ApVinTaxCalcResultsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApVinTaxCalcResultsService]
    });
    injector = getTestBed();
    service = injector.get(ApVinTaxCalcResultsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getApVinTaxCalcResultss', () => {
    it('should return an Promise<ApVinTaxCalcResults[]>', () => {
      const apVinTaxCalcResults = [
       {seqAptaxId:1234, irsTaxId:'sample data', taxIdPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {seqAptaxId:1234, irsTaxId:'sample data', taxIdPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {seqAptaxId:1234, irsTaxId:'sample data', taxIdPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'}

      ];
      service.getApVinTaxCalcResultss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/apvintaxcalcresultss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(apVinTaxCalcResults);
    });
  });


  describe('#createApVinTaxCalcResults', () => {
    var id = 1;
    it('should return an Promise<ApVinTaxCalcResults>', () => {
      const apVinTaxCalcResults: ApVinTaxCalcResults = {seqAptaxId:1234, irsTaxId:'sample data', taxIdPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.createApVinTaxCalcResults(apVinTaxCalcResults).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apvintaxcalcresultss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateApVinTaxCalcResults', () => {
    var id = 1;
    it('should return an Promise<ApVinTaxCalcResults>', () => {
      const apVinTaxCalcResults: ApVinTaxCalcResults = {seqAptaxId:1234, irsTaxId:'sample data', taxIdPayment:1234, taxRepEntity:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.updateApVinTaxCalcResults(apVinTaxCalcResults, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apvintaxcalcresultss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteApVinTaxCalcResults', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteApVinTaxCalcResults(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apvintaxcalcresultss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});