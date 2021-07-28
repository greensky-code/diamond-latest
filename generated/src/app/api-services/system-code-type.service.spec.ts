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

import { SystemCodeTypeService } from './system-code-type.service';
import { SystemCodeType } from '../api-models/system-code-type.model'
import { SystemCodeTypes } from "../api-models/testing/fake-system-code-type.model"

describe('SystemCodeTypeService', () => {
  let injector: TestBed;
  let service: SystemCodeTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SystemCodeTypeService]
    });
    injector = getTestBed();
    service = injector.get(SystemCodeTypeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSystemCodeTypes', () => {
    it('should return an Promise<SystemCodeType[]>', () => {
      const systemCodeType = [
       {systemCodeType:'sample data', systemCodeTypeDesc:'sample data', systemCodeTypeDataType:'sample data', systemCodeTypeMaxLength:'sample data', systemCodeTypeCase:'sample data', systemCodeTypeUpd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {systemCodeType:'sample data', systemCodeTypeDesc:'sample data', systemCodeTypeDataType:'sample data', systemCodeTypeMaxLength:'sample data', systemCodeTypeCase:'sample data', systemCodeTypeUpd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {systemCodeType:'sample data', systemCodeTypeDesc:'sample data', systemCodeTypeDataType:'sample data', systemCodeTypeMaxLength:'sample data', systemCodeTypeCase:'sample data', systemCodeTypeUpd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSystemCodeTypes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodetypes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(systemCodeType);
    });
  });


  describe('#createSystemCodeType', () => {
    var id = 1;
    it('should return an Promise<SystemCodeType>', () => {
      const systemCodeType: SystemCodeType = {systemCodeType:'sample data', systemCodeTypeDesc:'sample data', systemCodeTypeDataType:'sample data', systemCodeTypeMaxLength:'sample data', systemCodeTypeCase:'sample data', systemCodeTypeUpd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSystemCodeType(systemCodeType).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodetypes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSystemCodeType', () => {
    var id = 1;
    it('should return an Promise<SystemCodeType>', () => {
      const systemCodeType: SystemCodeType = {systemCodeType:'sample data', systemCodeTypeDesc:'sample data', systemCodeTypeDataType:'sample data', systemCodeTypeMaxLength:'sample data', systemCodeTypeCase:'sample data', systemCodeTypeUpd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSystemCodeType(systemCodeType, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodetypes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSystemCodeType', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSystemCodeType(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemcodetypes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});