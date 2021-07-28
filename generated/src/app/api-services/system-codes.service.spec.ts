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

import { SystemCodesService } from './system-codes.service';
import { SystemCodes } from '../api-models/system-codes.model'
import { SystemCodeses } from "../api-models/testing/fake-system-codes.model"

describe('SystemCodesService', () => {
  let injector: TestBed;
  let service: SystemCodesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SystemCodesService]
    });
    injector = getTestBed();
    service = injector.get(SystemCodesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSystemCodeses', () => {
    it('should return an Promise<SystemCodes[]>', () => {
      const systemCodes = [
       {systemCode:'sample data', systemCodeType:'sample data', systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', systemCodeParam1:'sample data', systemCodeParam2:'sample data', systemCodeUpd:'sample data', systemCodeActive:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {systemCode:'sample data', systemCodeType:'sample data', systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', systemCodeParam1:'sample data', systemCodeParam2:'sample data', systemCodeUpd:'sample data', systemCodeActive:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {systemCode:'sample data', systemCodeType:'sample data', systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', systemCodeParam1:'sample data', systemCodeParam2:'sample data', systemCodeUpd:'sample data', systemCodeActive:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSystemCodeses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodeses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(systemCodes);
    });
  });


  describe('#createSystemCodes', () => {
    var id = 1;
    it('should return an Promise<SystemCodes>', () => {
      const systemCodes: SystemCodes = {systemCode:'sample data', systemCodeType:'sample data', systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', systemCodeParam1:'sample data', systemCodeParam2:'sample data', systemCodeUpd:'sample data', systemCodeActive:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSystemCodes(systemCodes).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodeses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSystemCodes', () => {
    var id = 1;
    it('should return an Promise<SystemCodes>', () => {
      const systemCodes: SystemCodes = {systemCode:'sample data', systemCodeType:'sample data', systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', systemCodeParam1:'sample data', systemCodeParam2:'sample data', systemCodeUpd:'sample data', systemCodeActive:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSystemCodes(systemCodes, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodeses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSystemCodes', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSystemCodes(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodeses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});