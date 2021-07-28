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

import { CiebBankTermReasonCodeService } from './cieb-bank-term-reason-code.service';
import { CiebBankTermReasonCode } from '../api-models/cieb-bank-term-reason-code.model'
import { CiebBankTermReasonCodes } from "../api-models/testing/fake-cieb-bank-term-reason-code.model"

describe('CiebBankTermReasonCodeService', () => {
  let injector: TestBed;
  let service: CiebBankTermReasonCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebBankTermReasonCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebBankTermReasonCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebBankTermReasonCodes', () => {
    it('should return an Promise<CiebBankTermReasonCode[]>', () => {
      const ciebBankTermReasonCode = [
       {bankTermReasonCode:'sample data', bankTermReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {bankTermReasonCode:'sample data', bankTermReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {bankTermReasonCode:'sample data', bankTermReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebBankTermReasonCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbanktermreasoncodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebBankTermReasonCode);
    });
  });


  describe('#createCiebBankTermReasonCode', () => {
    var id = 1;
    it('should return an Promise<CiebBankTermReasonCode>', () => {
      const ciebBankTermReasonCode: CiebBankTermReasonCode = {bankTermReasonCode:'sample data', bankTermReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebBankTermReasonCode(ciebBankTermReasonCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbanktermreasoncodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebBankTermReasonCode', () => {
    var id = 1;
    it('should return an Promise<CiebBankTermReasonCode>', () => {
      const ciebBankTermReasonCode: CiebBankTermReasonCode = {bankTermReasonCode:'sample data', bankTermReasonDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebBankTermReasonCode(ciebBankTermReasonCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbanktermreasoncodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebBankTermReasonCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebBankTermReasonCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbanktermreasoncodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});