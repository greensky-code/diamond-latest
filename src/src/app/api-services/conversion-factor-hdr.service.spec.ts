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

import { ConversionFactorHdrService } from './conversion-factor-hdr.service';
import { ConversionFactorHdr } from '../api-models/conversion-factor-hdr.model'
import { ConversionFactorHdrs } from "../api-models/testing/fake-conversion-factor-hdr.model"

describe('ConversionFactorHdrService', () => {
  let injector: TestBed;
  let service: ConversionFactorHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConversionFactorHdrService]
    });
    injector = getTestBed();
    service = injector.get(ConversionFactorHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getConversionFactorHdrs', () => {
    it('should return an Promise<ConversionFactorHdr[]>', () => {
      const conversionFactorHdr = [
       {seqConvFactor:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', description:'sample data', scaleType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqConvFactor:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', description:'sample data', scaleType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqConvFactor:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', description:'sample data', scaleType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getConversionFactorHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactorhdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(conversionFactorHdr);
    });
  });


  describe('#createConversionFactorHdr', () => {
    var id = 1;
    it('should return an Promise<ConversionFactorHdr>', () => {
      const conversionFactorHdr: ConversionFactorHdr = {seqConvFactor:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', description:'sample data', scaleType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createConversionFactorHdr(conversionFactorHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactorhdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateConversionFactorHdr', () => {
    var id = 1;
    it('should return an Promise<ConversionFactorHdr>', () => {
      const conversionFactorHdr: ConversionFactorHdr = {seqConvFactor:1234, priceSchedule:'sample data', pricingRegion:'sample data', effectiveDate:'2018-01-01', description:'sample data', scaleType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateConversionFactorHdr(conversionFactorHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactorhdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteConversionFactorHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteConversionFactorHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactorhdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});