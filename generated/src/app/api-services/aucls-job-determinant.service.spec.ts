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

import { AuclsJobDeterminantService } from './aucls-job-determinant.service';
import { AuclsJobDeterminant } from '../api-models/aucls-job-determinant.model'
import { AuclsJobDeterminants } from "../api-models/testing/fake-aucls-job-determinant.model"

describe('AuclsJobDeterminantService', () => {
  let injector: TestBed;
  let service: AuclsJobDeterminantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuclsJobDeterminantService]
    });
    injector = getTestBed();
    service = injector.get(AuclsJobDeterminantService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuclsJobDeterminants', () => {
    it('should return an Promise<AuclsJobDeterminant[]>', () => {
      const auclsJobDeterminant = [
       {seqAuclsJobId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAuclsJobId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAuclsJobId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuclsJobDeterminants().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auclsjobdeterminants/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auclsJobDeterminant);
    });
  });


  describe('#createAuclsJobDeterminant', () => {
    var id = 1;
    it('should return an Promise<AuclsJobDeterminant>', () => {
      const auclsJobDeterminant: AuclsJobDeterminant = {seqAuclsJobId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuclsJobDeterminant(auclsJobDeterminant).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsjobdeterminants`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuclsJobDeterminant', () => {
    var id = 1;
    it('should return an Promise<AuclsJobDeterminant>', () => {
      const auclsJobDeterminant: AuclsJobDeterminant = {seqAuclsJobId:'sample data', authsColumnName:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', authsColumnTypeCode:1234, columnOccurrence:1234, columnType:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuclsJobDeterminant(auclsJobDeterminant, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsjobdeterminants/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuclsJobDeterminant', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuclsJobDeterminant(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclsjobdeterminants/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});