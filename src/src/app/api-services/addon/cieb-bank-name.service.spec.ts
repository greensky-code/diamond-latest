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

import { CiebBankNameService } from './cieb-bank-name.service';
import { CiebBankName } from '../api-models/cieb-bank-name.model'
import { CiebBankNames } from "../api-models/testing/fake-cieb-bank-name.model"

describe('CiebBankNameService', () => {
  let injector: TestBed;
  let service: CiebBankNameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebBankNameService]
    });
    injector = getTestBed();
    service = injector.get(CiebBankNameService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebBankNames', () => {
    it('should return an Promise<CiebBankName[]>', () => {
      const ciebBankName = [
       {seqBankNameId:1234, bankName:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'},
       {seqBankNameId:1234, bankName:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'},
       {seqBankNameId:1234, bankName:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'}

      ];
      service.getCiebBankNames().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbanknames/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebBankName);
    });
  });


  describe('#createCiebBankName', () => {
    var id = 1;
    it('should return an Promise<CiebBankName>', () => {
      const ciebBankName: CiebBankName = {seqBankNameId:1234, bankName:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'};
      service.createCiebBankName(ciebBankName).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbanknames`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebBankName', () => {
    var id = 1;
    it('should return an Promise<CiebBankName>', () => {
      const ciebBankName: CiebBankName = {seqBankNameId:1234, bankName:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'};
      service.updateCiebBankName(ciebBankName, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbanknames/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebBankName', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebBankName(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebbanknames/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});