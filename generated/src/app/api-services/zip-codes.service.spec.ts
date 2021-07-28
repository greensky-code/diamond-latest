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

import { ZipCodesService } from './zip-codes.service';
import { ZipCodes } from '../api-models/zip-codes.model'
import { ZipCodeses } from "../api-models/testing/fake-zip-codes.model"

describe('ZipCodesService', () => {
  let injector: TestBed;
  let service: ZipCodesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ZipCodesService]
    });
    injector = getTestBed();
    service = injector.get(ZipCodesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getZipCodeses', () => {
    it('should return an Promise<ZipCodes[]>', () => {
      const zipCodes = [
       {zip:'sample data', city:'sample data', state:'sample data', county:'sample data', areaCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', zipCodeQualifier:'sample data'},
       {zip:'sample data', city:'sample data', state:'sample data', county:'sample data', areaCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', zipCodeQualifier:'sample data'},
       {zip:'sample data', city:'sample data', state:'sample data', county:'sample data', areaCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', zipCodeQualifier:'sample data'}

      ];
      service.getZipCodeses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/zipcodeses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(zipCodes);
    });
  });


  describe('#createZipCodes', () => {
    var id = 1;
    it('should return an Promise<ZipCodes>', () => {
      const zipCodes: ZipCodes = {zip:'sample data', city:'sample data', state:'sample data', county:'sample data', areaCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', zipCodeQualifier:'sample data'};
      service.createZipCodes(zipCodes).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/zipcodeses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateZipCodes', () => {
    var id = 1;
    it('should return an Promise<ZipCodes>', () => {
      const zipCodes: ZipCodes = {zip:'sample data', city:'sample data', state:'sample data', county:'sample data', areaCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', zipCodeQualifier:'sample data'};
      service.updateZipCodes(zipCodes, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/zipcodeses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteZipCodes', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteZipCodes(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/zipcodeses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});