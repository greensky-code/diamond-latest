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

import { SystemParameterService } from './system-parameter.service';
import { SystemParameter } from '../api-models/system-parameter.model'
import { SystemParameters } from "../api-models/testing/fake-system-parameter.model"

describe('SystemParameterService', () => {
  let injector: TestBed;
  let service: SystemParameterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SystemParameterService]
    });
    injector = getTestBed();
    service = injector.get(SystemParameterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSystemParameters', () => {
    it('should return an Promise<SystemParameter[]>', () => {
      const systemParameter = [
       {parameter3:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', parameter2:'sample data', parameter1:'sample data', parameterId:'sample data'},
       {parameter3:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', parameter2:'sample data', parameter1:'sample data', parameterId:'sample data'},
       {parameter3:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', parameter2:'sample data', parameter1:'sample data', parameterId:'sample data'}

      ];
      service.getSystemParameters().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/systemparameters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(systemParameter);
    });
  });


  describe('#createSystemParameter', () => {
    var id = 1;
    it('should return an Promise<SystemParameter>', () => {
      const systemParameter: SystemParameter = {parameter3:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', parameter2:'sample data', parameter1:'sample data', parameterId:'sample data'};
      service.createSystemParameter(systemParameter).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemparameters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSystemParameter', () => {
    var id = 1;
    it('should return an Promise<SystemParameter>', () => {
      const systemParameter: SystemParameter = {parameter3:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', parameter2:'sample data', parameter1:'sample data', parameterId:'sample data'};
      service.updateSystemParameter(systemParameter, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemparameters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSystemParameter', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSystemParameter(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/systemparameters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});