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

import { CiebProvinceService } from './cieb-province.service';
import { CiebProvince } from '../api-models/cieb-province.model'
import { CiebProvinces } from "../api-models/testing/fake-cieb-province.model"

describe('CiebProvinceService', () => {
  let injector: TestBed;
  let service: CiebProvinceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebProvinceService]
    });
    injector = getTestBed();
    service = injector.get(CiebProvinceService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebProvinces', () => {
    it('should return an Promise<CiebProvince[]>', () => {
      const ciebProvince = [
       {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', countryCode:'sample data'},
       {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', countryCode:'sample data'},
       {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', countryCode:'sample data'}

      ];
      service.getCiebProvinces().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebprovinces/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebProvince);
    });
  });


  describe('#createCiebProvince', () => {
    var id = 1;
    it('should return an Promise<CiebProvince>', () => {
      const ciebProvince: CiebProvince = {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', countryCode:'sample data'};
      service.createCiebProvince(ciebProvince).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebprovinces`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebProvince', () => {
    var id = 1;
    it('should return an Promise<CiebProvince>', () => {
      const ciebProvince: CiebProvince = {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', countryCode:'sample data'};
      service.updateCiebProvince(ciebProvince, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebprovinces/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebProvince', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebProvince(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebprovinces/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});