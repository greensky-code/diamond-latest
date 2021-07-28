/* Copyright (c) 2021 . All Rights Reserved. */

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

import { CiebCountryCodeService } from './cieb-country-code.service';
import { CiebCountryCode } from '../api-models/cieb-country-code.model'
import { CiebCountryCodes } from "../api-models/testing/fake-cieb-country-code.model"

describe('CiebCountryCodeService', () => {
  let injector: TestBed;
  let service: CiebCountryCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebCountryCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebCountryCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebCountryCodes', () => {
    it('should return an Promise<CiebCountryCode[]>', () => {
      const ciebCountryCode = [
       {countryCode:'sample data', currencyCode:'sample data', seqIsoTemplateId:1234, countryDesc:'sample data', euroClearingHouseAbbr:'sample data', sanctionedInd:'sample data', phonePrefix:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {countryCode:'sample data', currencyCode:'sample data', seqIsoTemplateId:1234, countryDesc:'sample data', euroClearingHouseAbbr:'sample data', sanctionedInd:'sample data', phonePrefix:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {countryCode:'sample data', currencyCode:'sample data', seqIsoTemplateId:1234, countryDesc:'sample data', euroClearingHouseAbbr:'sample data', sanctionedInd:'sample data', phonePrefix:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebCountryCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcountrycodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebCountryCode);
    });
  });


  describe('#createCiebCountryCode', () => {
    var id = 1;
    it('should return an Promise<CiebCountryCode>', () => {
      const ciebCountryCode: CiebCountryCode = {countryCode:'sample data', currencyCode:'sample data', seqIsoTemplateId:1234, countryDesc:'sample data', euroClearingHouseAbbr:'sample data', sanctionedInd:'sample data', phonePrefix:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebCountryCode(ciebCountryCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcountrycodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebCountryCode', () => {
    var id = 1;
    it('should return an Promise<CiebCountryCode>', () => {
      const ciebCountryCode: CiebCountryCode = {countryCode:'sample data', currencyCode:'sample data', seqIsoTemplateId:1234, countryDesc:'sample data', euroClearingHouseAbbr:'sample data', sanctionedInd:'sample data', phonePrefix:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebCountryCode(ciebCountryCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcountrycodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebCountryCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebCountryCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcountrycodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});