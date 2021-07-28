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

import { SystemCodeTokenService } from './system-code-token.service';
import { SystemCodeToken } from '../api-models/system-code-token.model'
import { SystemCodeTokens } from "../api-models/testing/fake-system-code-token.model"

describe('SystemCodeTokenService', () => {
  let injector: TestBed;
  let service: SystemCodeTokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SystemCodeTokenService]
    });
    injector = getTestBed();
    service = injector.get(SystemCodeTokenService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSystemCodeTokens', () => {
    it('should return an Promise<SystemCodeToken[]>', () => {
      const systemCodeToken = [
       {systemCode:'sample data', systemCodeType:'sample data', languageId:1234, systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {systemCode:'sample data', systemCodeType:'sample data', languageId:1234, systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {systemCode:'sample data', systemCodeType:'sample data', languageId:1234, systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSystemCodeTokens().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodetokens/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(systemCodeToken);
    });
  });


  describe('#createSystemCodeToken', () => {
    var id = 1;
    it('should return an Promise<SystemCodeToken>', () => {
      const systemCodeToken: SystemCodeToken = {systemCode:'sample data', systemCodeType:'sample data', languageId:1234, systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSystemCodeToken(systemCodeToken).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodetokens`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSystemCodeToken', () => {
    var id = 1;
    it('should return an Promise<SystemCodeToken>', () => {
      const systemCodeToken: SystemCodeToken = {systemCode:'sample data', systemCodeType:'sample data', languageId:1234, systemCodeDesc1:'sample data', systemCodeDesc2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSystemCodeToken(systemCodeToken, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodetokens/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSystemCodeToken', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSystemCodeToken(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodetokens/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});