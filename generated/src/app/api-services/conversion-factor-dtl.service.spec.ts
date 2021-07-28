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

import { ConversionFactorDtlService } from './conversion-factor-dtl.service';
import { ConversionFactorDtl } from '../api-models/conversion-factor-dtl.model'
import { ConversionFactorDtls } from "../api-models/testing/fake-conversion-factor-dtl.model"

describe('ConversionFactorDtlService', () => {
  let injector: TestBed;
  let service: ConversionFactorDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConversionFactorDtlService]
    });
    injector = getTestBed();
    service = injector.get(ConversionFactorDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getConversionFactorDtls', () => {
    it('should return an Promise<ConversionFactorDtl[]>', () => {
      const conversionFactorDtl = [
       {seqConvFactor:1234, convFactorId:'sample data', factor:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqConvFactor:1234, convFactorId:'sample data', factor:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqConvFactor:1234, convFactorId:'sample data', factor:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getConversionFactorDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactordtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(conversionFactorDtl);
    });
  });


  describe('#createConversionFactorDtl', () => {
    var id = 1;
    it('should return an Promise<ConversionFactorDtl>', () => {
      const conversionFactorDtl: ConversionFactorDtl = {seqConvFactor:1234, convFactorId:'sample data', factor:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createConversionFactorDtl(conversionFactorDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactordtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateConversionFactorDtl', () => {
    var id = 1;
    it('should return an Promise<ConversionFactorDtl>', () => {
      const conversionFactorDtl: ConversionFactorDtl = {seqConvFactor:1234, convFactorId:'sample data', factor:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateConversionFactorDtl(conversionFactorDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactordtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteConversionFactorDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteConversionFactorDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/conversionfactordtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});