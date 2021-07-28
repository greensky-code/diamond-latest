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

import { ProcedureDeterminantService } from './procedure-determinant.service';
import { ProcedureDeterminant } from '../api-models/procedure-determinant.model'
import { ProcedureDeterminants } from "../api-models/testing/fake-procedure-determinant.model"

describe('ProcedureDeterminantService', () => {
  let injector: TestBed;
  let service: ProcedureDeterminantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcedureDeterminantService]
    });
    injector = getTestBed();
    service = injector.get(ProcedureDeterminantService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcedureDeterminants', () => {
    it('should return an Promise<ProcedureDeterminant[]>', () => {
      const procedureDeterminant = [
       {procedureCode:'sample data', determLineNo:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {procedureCode:'sample data', determLineNo:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {procedureCode:'sample data', determLineNo:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProcedureDeterminants().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/proceduredeterminants/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procedureDeterminant);
    });
  });


  describe('#createProcedureDeterminant', () => {
    var id = 1;
    it('should return an Promise<ProcedureDeterminant>', () => {
      const procedureDeterminant: ProcedureDeterminant = {procedureCode:'sample data', determLineNo:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProcedureDeterminant(procedureDeterminant).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proceduredeterminants`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcedureDeterminant', () => {
    var id = 1;
    it('should return an Promise<ProcedureDeterminant>', () => {
      const procedureDeterminant: ProcedureDeterminant = {procedureCode:'sample data', determLineNo:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProcedureDeterminant(procedureDeterminant, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proceduredeterminants/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcedureDeterminant', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcedureDeterminant(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proceduredeterminants/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});