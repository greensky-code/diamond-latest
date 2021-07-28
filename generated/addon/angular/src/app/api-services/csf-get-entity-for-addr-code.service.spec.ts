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

import { CsfGetEntityForAddrCodeService } from './csf-get-entity-for-addr-code.service';
import { CsfGetEntityForAddrCode } from '../api-models/csf-get-entity-for-addr-code.model'
import { CsfGetEntityForAddrCodes } from "../api-models/testing/fake-csf-get-entity-for-addr-code.model"

describe('CsfGetEntityForAddrCodeService', () => {
  let injector: TestBed;
  let service: CsfGetEntityForAddrCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfGetEntityForAddrCodeService]
    });
    injector = getTestBed();
    service = injector.get(CsfGetEntityForAddrCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfGetEntityForAddrCodes', () => {
    it('should return an Promise<CsfGetEntityForAddrCode[]>', () => {
      const csfGetEntityForAddrCode = [
       {pSeqEntityId:1234, pAddrCode:'sample data'},
       {pSeqEntityId:1234, pAddrCode:'sample data'},
       {pSeqEntityId:1234, pAddrCode:'sample data'}

      ];
      service.getCsfGetEntityForAddrCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityforaddrcodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfGetEntityForAddrCode);
    });
  });


  describe('#createCsfGetEntityForAddrCode', () => {
    var id = 1;
    it('should return an Promise<CsfGetEntityForAddrCode>', () => {
      const csfGetEntityForAddrCode: CsfGetEntityForAddrCode = {pSeqEntityId:1234, pAddrCode:'sample data'};
      service.createCsfGetEntityForAddrCode(csfGetEntityForAddrCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityforaddrcodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfGetEntityForAddrCode', () => {
    var id = 1;
    it('should return an Promise<CsfGetEntityForAddrCode>', () => {
      const csfGetEntityForAddrCode: CsfGetEntityForAddrCode = {pSeqEntityId:1234, pAddrCode:'sample data'};
      service.updateCsfGetEntityForAddrCode(csfGetEntityForAddrCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityforaddrcodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfGetEntityForAddrCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfGetEntityForAddrCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityforaddrcodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});