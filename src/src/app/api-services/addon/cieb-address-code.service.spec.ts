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

import { CiebAddressCodeService } from './cieb-address-code.service';
import { CiebAddressCode } from '../api-models/cieb-address-code.model'
import { CiebAddressCodes } from "../api-models/testing/fake-cieb-address-code.model"

describe('CiebAddressCodeService', () => {
  let injector: TestBed;
  let service: CiebAddressCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebAddressCodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebAddressCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebAddressCodes', () => {
    it('should return an Promise<CiebAddressCode[]>', () => {
      const ciebAddressCode = [
       {addressCode:'sample data', addressDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {addressCode:'sample data', addressDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {addressCode:'sample data', addressDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebAddressCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaddresscodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebAddressCode);
    });
  });


  describe('#createCiebAddressCode', () => {
    var id = 1;
    it('should return an Promise<CiebAddressCode>', () => {
      const ciebAddressCode: CiebAddressCode = {addressCode:'sample data', addressDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebAddressCode(ciebAddressCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaddresscodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebAddressCode', () => {
    var id = 1;
    it('should return an Promise<CiebAddressCode>', () => {
      const ciebAddressCode: CiebAddressCode = {addressCode:'sample data', addressDesc:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebAddressCode(ciebAddressCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaddresscodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebAddressCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebAddressCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaddresscodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});