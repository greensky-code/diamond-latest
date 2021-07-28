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

import { CspGetPayeeNameService } from './csp-get-payee-name.service';
import { CspGetPayeeName } from '../api-models/csp-get-payee-name.model'
import { CspGetPayeeNames } from "../api-models/testing/fake-csp-get-payee-name.model"

describe('CspGetPayeeNameService', () => {
  let injector: TestBed;
  let service: CspGetPayeeNameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetPayeeNameService]
    });
    injector = getTestBed();
    service = injector.get(CspGetPayeeNameService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetPayeeNames', () => {
    it('should return an Promise<CspGetPayeeName[]>', () => {
      const cspGetPayeeName = [
       {pSeqAddrId:1234, pSeqEntityId:1234, pPayeeName:'sample data'},
       {pSeqAddrId:1234, pSeqEntityId:1234, pPayeeName:'sample data'},
       {pSeqAddrId:1234, pSeqEntityId:1234, pPayeeName:'sample data'}

      ];
      service.getCspGetPayeeNames().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetpayeenames/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetPayeeName);
    });
  });


  describe('#createCspGetPayeeName', () => {
    var id = 1;
    it('should return an Promise<CspGetPayeeName>', () => {
      const cspGetPayeeName: CspGetPayeeName = {pSeqAddrId:1234, pSeqEntityId:1234, pPayeeName:'sample data'};
      service.createCspGetPayeeName(cspGetPayeeName).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetpayeenames`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetPayeeName', () => {
    var id = 1;
    it('should return an Promise<CspGetPayeeName>', () => {
      const cspGetPayeeName: CspGetPayeeName = {pSeqAddrId:1234, pSeqEntityId:1234, pPayeeName:'sample data'};
      service.updateCspGetPayeeName(cspGetPayeeName, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetpayeenames/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetPayeeName', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetPayeeName(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetpayeenames/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});