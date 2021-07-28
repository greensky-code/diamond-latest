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

import { CiebChangeReasonCodeService } from './cieb-change-reason-code.service';
import { CiebChangeReasonCode } from '../api-models/cieb-change-reason-code.model'
import { CiebChangeReasonCodes } from "../api-models/testing/fake-cieb-change-reason-code.model"

describe('CiebChangeReasonCodeService', () => {
  let injector: TestBed;
  let service: CiebChangeReasonCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebChangeReasonCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebChangeReasonCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebChangeReasonCodes', () => {
    it('should return an Promise<CiebChangeReasonCode[]>', () => {
      const ciebChangeReasonCode = [
       {changeReasonCode:'sample data', changeReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {changeReasonCode:'sample data', changeReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {changeReasonCode:'sample data', changeReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebChangeReasonCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebchangereasoncodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebChangeReasonCode);
    });
  });


  describe('#createCiebChangeReasonCode', () => {
    var id = 1;
    it('should return an Promise<CiebChangeReasonCode>', () => {
      const ciebChangeReasonCode: CiebChangeReasonCode = {changeReasonCode:'sample data', changeReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebChangeReasonCode(ciebChangeReasonCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebchangereasoncodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebChangeReasonCode', () => {
    var id = 1;
    it('should return an Promise<CiebChangeReasonCode>', () => {
      const ciebChangeReasonCode: CiebChangeReasonCode = {changeReasonCode:'sample data', changeReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebChangeReasonCode(ciebChangeReasonCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebchangereasoncodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebChangeReasonCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebChangeReasonCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebchangereasoncodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});