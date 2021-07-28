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

import { CustservCodeService } from './custserv-code.service';
import { CustservCode } from '../api-models/custserv-code.model'
import { CustservCodes } from "../api-models/testing/fake-custserv-code.model"

describe('CustservCodeService', () => {
  let injector: TestBed;
  let service: CustservCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustservCodeService]
    });
    injector = getTestBed();
    service = injector.get(CustservCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCustservCodes', () => {
    it('should return an Promise<CustservCode[]>', () => {
      const custservCode = [
       {csCode:'sample data', codeType:'sample data', description:'sample data', adMaintainFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {csCode:'sample data', codeType:'sample data', description:'sample data', adMaintainFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {csCode:'sample data', codeType:'sample data', description:'sample data', adMaintainFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCustservCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/custservcodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(custservCode);
    });
  });


  describe('#createCustservCode', () => {
    var id = 1;
    it('should return an Promise<CustservCode>', () => {
      const custservCode: CustservCode = {csCode:'sample data', codeType:'sample data', description:'sample data', adMaintainFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCustservCode(custservCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/custservcodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCustservCode', () => {
    var id = 1;
    it('should return an Promise<CustservCode>', () => {
      const custservCode: CustservCode = {csCode:'sample data', codeType:'sample data', description:'sample data', adMaintainFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCustservCode(custservCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/custservcodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCustservCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCustservCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/custservcodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});