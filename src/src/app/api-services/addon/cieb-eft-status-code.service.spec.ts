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

import { CiebEftStatusCodeService } from './cieb-eft-status-code.service';
import { CiebEftStatusCode } from '../api-models/cieb-eft-status-code.model'
import { CiebEftStatusCodes } from "../api-models/testing/fake-cieb-eft-status-code.model"

describe('CiebEftStatusCodeService', () => {
  let injector: TestBed;
  let service: CiebEftStatusCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebEftStatusCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebEftStatusCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebEftStatusCodes', () => {
    it('should return an Promise<CiebEftStatusCode[]>', () => {
      const ciebEftStatusCode = [
       {eftStatusCode:'sample data', eftStatusDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {eftStatusCode:'sample data', eftStatusDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {eftStatusCode:'sample data', eftStatusDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebEftStatusCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebeftstatuscodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebEftStatusCode);
    });
  });


  describe('#createCiebEftStatusCode', () => {
    var id = 1;
    it('should return an Promise<CiebEftStatusCode>', () => {
      const ciebEftStatusCode: CiebEftStatusCode = {eftStatusCode:'sample data', eftStatusDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebEftStatusCode(ciebEftStatusCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebeftstatuscodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebEftStatusCode', () => {
    var id = 1;
    it('should return an Promise<CiebEftStatusCode>', () => {
      const ciebEftStatusCode: CiebEftStatusCode = {eftStatusCode:'sample data', eftStatusDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebEftStatusCode(ciebEftStatusCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebeftstatuscodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebEftStatusCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebEftStatusCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebeftstatuscodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});