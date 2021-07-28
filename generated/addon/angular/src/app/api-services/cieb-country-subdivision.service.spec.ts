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

import { CiebCountrySubdivisionService } from './cieb-country-subdivision.service';
import { CiebCountrySubdivision } from '../api-models/cieb-country-subdivision.model'
import { CiebCountrySubdivisions } from "../api-models/testing/fake-cieb-country-subdivision.model"

describe('CiebCountrySubdivisionService', () => {
  let injector: TestBed;
  let service: CiebCountrySubdivisionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebCountrySubdivisionService]
    });
    injector = getTestBed();
    service = injector.get(CiebCountrySubdivisionService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebCountrySubdivisions', () => {
    it('should return an Promise<CiebCountrySubdivision[]>', () => {
      const ciebCountrySubdivision = [
       {countryCode2:'sample data', countrySubDivCode:'sample data', regionalDivision:'sample data', subDivCategory:'sample data', subDivisionName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {countryCode2:'sample data', countrySubDivCode:'sample data', regionalDivision:'sample data', subDivCategory:'sample data', subDivisionName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {countryCode2:'sample data', countrySubDivCode:'sample data', regionalDivision:'sample data', subDivCategory:'sample data', subDivisionName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebCountrySubdivisions().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcountrysubdivisions/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebCountrySubdivision);
    });
  });


  describe('#createCiebCountrySubdivision', () => {
    var id = 1;
    it('should return an Promise<CiebCountrySubdivision>', () => {
      const ciebCountrySubdivision: CiebCountrySubdivision = {countryCode2:'sample data', countrySubDivCode:'sample data', regionalDivision:'sample data', subDivCategory:'sample data', subDivisionName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebCountrySubdivision(ciebCountrySubdivision).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcountrysubdivisions`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebCountrySubdivision', () => {
    var id = 1;
    it('should return an Promise<CiebCountrySubdivision>', () => {
      const ciebCountrySubdivision: CiebCountrySubdivision = {countryCode2:'sample data', countrySubDivCode:'sample data', regionalDivision:'sample data', subDivCategory:'sample data', subDivisionName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebCountrySubdivision(ciebCountrySubdivision, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcountrysubdivisions/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebCountrySubdivision', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebCountrySubdivision(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcountrysubdivisions/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});