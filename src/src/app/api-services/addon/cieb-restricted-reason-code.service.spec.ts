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

import { CiebRestrictedReasonCodeService } from './cieb-restricted-reason-code.service';
import { CiebRestrictedReasonCode } from '../api-models/cieb-restricted-reason-code.model'
import { CiebRestrictedReasonCodes } from "../api-models/testing/fake-cieb-restricted-reason-code.model"

describe('CiebRestrictedReasonCodeService', () => {
  let injector: TestBed;
  let service: CiebRestrictedReasonCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebRestrictedReasonCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebRestrictedReasonCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebRestrictedReasonCodes', () => {
    it('should return an Promise<CiebRestrictedReasonCode[]>', () => {
      const ciebRestrictedReasonCode = [
       {restrictedCode:'sample data', restrictedReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {restrictedCode:'sample data', restrictedReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {restrictedCode:'sample data', restrictedReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebRestrictedReasonCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebrestrictedreasoncodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebRestrictedReasonCode);
    });
  });


  describe('#createCiebRestrictedReasonCode', () => {
    var id = 1;
    it('should return an Promise<CiebRestrictedReasonCode>', () => {
      const ciebRestrictedReasonCode: CiebRestrictedReasonCode = {restrictedCode:'sample data', restrictedReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebRestrictedReasonCode(ciebRestrictedReasonCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebrestrictedreasoncodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebRestrictedReasonCode', () => {
    var id = 1;
    it('should return an Promise<CiebRestrictedReasonCode>', () => {
      const ciebRestrictedReasonCode: CiebRestrictedReasonCode = {restrictedCode:'sample data', restrictedReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebRestrictedReasonCode(ciebRestrictedReasonCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebrestrictedreasoncodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebRestrictedReasonCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebRestrictedReasonCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebrestrictedreasoncodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});