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

import { TaxReportingEntityService } from './tax-reporting-entity.service';
import { TaxReportingEntity } from '../api-models/tax-reporting-entity.model'
import { TaxReportingEntitys } from "../api-models/testing/fake-tax-reporting-entity.model"

describe('TaxReportingEntityService', () => {
  let injector: TestBed;
  let service: TaxReportingEntityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaxReportingEntityService]
    });
    injector = getTestBed();
    service = injector.get(TaxReportingEntityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getTaxReportingEntitys', () => {
    it('should return an Promise<TaxReportingEntity[]>', () => {
      const taxReportingEntity = [
       {taxRepEntity:'sample data', description:'sample data', payerName1:'sample data', payerName2:'sample data', payerAddress:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', transControlCode:'sample data', transName:'sample data', transAddress:'sample data', transCity:'sample data', transState:'sample data', transZipCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', payerCountry:'sample data', transCountry:'sample data', payerPhone:'sample data'},
       {taxRepEntity:'sample data', description:'sample data', payerName1:'sample data', payerName2:'sample data', payerAddress:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', transControlCode:'sample data', transName:'sample data', transAddress:'sample data', transCity:'sample data', transState:'sample data', transZipCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', payerCountry:'sample data', transCountry:'sample data', payerPhone:'sample data'},
       {taxRepEntity:'sample data', description:'sample data', payerName1:'sample data', payerName2:'sample data', payerAddress:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', transControlCode:'sample data', transName:'sample data', transAddress:'sample data', transCity:'sample data', transState:'sample data', transZipCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', payerCountry:'sample data', transCountry:'sample data', payerPhone:'sample data'}

      ];
      service.getTaxReportingEntitys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/taxreportingentitys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(taxReportingEntity);
    });
  });


  describe('#createTaxReportingEntity', () => {
    var id = 1;
    it('should return an Promise<TaxReportingEntity>', () => {
      const taxReportingEntity: TaxReportingEntity = {taxRepEntity:'sample data', description:'sample data', payerName1:'sample data', payerName2:'sample data', payerAddress:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', transControlCode:'sample data', transName:'sample data', transAddress:'sample data', transCity:'sample data', transState:'sample data', transZipCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', payerCountry:'sample data', transCountry:'sample data', payerPhone:'sample data'};
      service.createTaxReportingEntity(taxReportingEntity).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/taxreportingentitys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateTaxReportingEntity', () => {
    var id = 1;
    it('should return an Promise<TaxReportingEntity>', () => {
      const taxReportingEntity: TaxReportingEntity = {taxRepEntity:'sample data', description:'sample data', payerName1:'sample data', payerName2:'sample data', payerAddress:'sample data', payerCity:'sample data', payerState:'sample data', payerZipCode:'sample data', transControlCode:'sample data', transName:'sample data', transAddress:'sample data', transCity:'sample data', transState:'sample data', transZipCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', payerCountry:'sample data', transCountry:'sample data', payerPhone:'sample data'};
      service.updateTaxReportingEntity(taxReportingEntity, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/taxreportingentitys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteTaxReportingEntity', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteTaxReportingEntity(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/taxreportingentitys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});