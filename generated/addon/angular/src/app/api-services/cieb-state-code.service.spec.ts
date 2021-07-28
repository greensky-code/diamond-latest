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

import { CiebStateCodeService } from './cieb-state-code.service';
import { CiebStateCode } from '../api-models/cieb-state-code.model'
import { CiebStateCodes } from "../api-models/testing/fake-cieb-state-code.model"

describe('CiebStateCodeService', () => {
  let injector: TestBed;
  let service: CiebStateCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebStateCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebStateCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebStateCodes', () => {
    it('should return an Promise<CiebStateCode[]>', () => {
      const ciebStateCode = [
       {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'},
       {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'},
       {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'}

      ];
      service.getCiebStateCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstatecodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebStateCode);
    });
  });


  describe('#createCiebStateCode', () => {
    var id = 1;
    it('should return an Promise<CiebStateCode>', () => {
      const ciebStateCode: CiebStateCode = {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'};
      service.createCiebStateCode(ciebStateCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstatecodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebStateCode', () => {
    var id = 1;
    it('should return an Promise<CiebStateCode>', () => {
      const ciebStateCode: CiebStateCode = {stateCode:'sample data', stateDesc:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'};
      service.updateCiebStateCode(ciebStateCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstatecodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebStateCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebStateCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstatecodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});