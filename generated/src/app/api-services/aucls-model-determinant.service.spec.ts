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

import { AuclsModelDeterminantService } from './aucls-model-determinant.service';
import { AuclsModelDeterminant } from '../api-models/aucls-model-determinant.model'
import { AuclsModelDeterminants } from "../api-models/testing/fake-aucls-model-determinant.model"

describe('AuclsModelDeterminantService', () => {
  let injector: TestBed;
  let service: AuclsModelDeterminantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuclsModelDeterminantService]
    });
    injector = getTestBed();
    service = injector.get(AuclsModelDeterminantService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuclsModelDeterminants', () => {
    it('should return an Promise<AuclsModelDeterminant[]>', () => {
      const auclsModelDeterminant = [
       {auclsModelId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {auclsModelId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {auclsModelId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuclsModelDeterminants().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auclsmodeldeterminants/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auclsModelDeterminant);
    });
  });


  describe('#createAuclsModelDeterminant', () => {
    var id = 1;
    it('should return an Promise<AuclsModelDeterminant>', () => {
      const auclsModelDeterminant: AuclsModelDeterminant = {auclsModelId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuclsModelDeterminant(auclsModelDeterminant).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsmodeldeterminants`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuclsModelDeterminant', () => {
    var id = 1;
    it('should return an Promise<AuclsModelDeterminant>', () => {
      const auclsModelDeterminant: AuclsModelDeterminant = {auclsModelId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuclsModelDeterminant(auclsModelDeterminant, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsmodeldeterminants/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuclsModelDeterminant', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuclsModelDeterminant(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsmodeldeterminants/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});