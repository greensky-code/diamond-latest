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

import { CiebWlCountryXrefService } from './cieb-wl-country-xref.service';
import { CiebWlCountryXref } from '../api-models/cieb-wl-country-xref.model'
import { CiebWlCountryXrefs } from "../api-models/testing/fake-cieb-wl-country-xref.model"

describe('CiebWlCountryXrefService', () => {
  let injector: TestBed;
  let service: CiebWlCountryXrefService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebWlCountryXrefService]
    });
    injector = getTestBed();
    service = injector.get(CiebWlCountryXrefService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebWlCountryXrefs', () => {
    it('should return an Promise<CiebWlCountryXref[]>', () => {
      const ciebWlCountryXref = [
       {countryCode3:'sample data', countryCode2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {countryCode3:'sample data', countryCode2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {countryCode3:'sample data', countryCode2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebWlCountryXrefs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebwlcountryxrefs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebWlCountryXref);
    });
  });


  describe('#createCiebWlCountryXref', () => {
    var id = 1;
    it('should return an Promise<CiebWlCountryXref>', () => {
      const ciebWlCountryXref: CiebWlCountryXref = {countryCode3:'sample data', countryCode2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebWlCountryXref(ciebWlCountryXref).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebwlcountryxrefs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebWlCountryXref', () => {
    var id = 1;
    it('should return an Promise<CiebWlCountryXref>', () => {
      const ciebWlCountryXref: CiebWlCountryXref = {countryCode3:'sample data', countryCode2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebWlCountryXref(ciebWlCountryXref, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebwlcountryxrefs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebWlCountryXref', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebWlCountryXref(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebwlcountryxrefs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});