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

import { AllTabColumnsService } from './all-tab-columns.service';
import { AllTabColumns } from '../api-models/all-tab-columns.model'
import { AllTabColumnss } from "../api-models/testing/fake-all-tab-columns.model"

describe('AllTabColumnsService', () => {
  let injector: TestBed;
  let service: AllTabColumnsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AllTabColumnsService]
    });
    injector = getTestBed();
    service = injector.get(AllTabColumnsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAllTabColumnss', () => {
    it('should return an Promise<AllTabColumns[]>', () => {
      const allTabColumns = [
       {owners:'sample data', tableName:'sample data', columnName:'sample data'},
       {owners:'sample data', tableName:'sample data', columnName:'sample data'},
       {owners:'sample data', tableName:'sample data', columnName:'sample data'}

      ];
      service.getAllTabColumnss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/alltabcolumnss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(allTabColumns);
    });
  });


  describe('#createAllTabColumns', () => {
    var id = 1;
    it('should return an Promise<AllTabColumns>', () => {
      const allTabColumns: AllTabColumns = {owners:'sample data', tableName:'sample data', columnName:'sample data'};
      service.createAllTabColumns(allTabColumns).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alltabcolumnss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAllTabColumns', () => {
    var id = 1;
    it('should return an Promise<AllTabColumns>', () => {
      const allTabColumns: AllTabColumns = {owners:'sample data', tableName:'sample data', columnName:'sample data'};
      service.updateAllTabColumns(allTabColumns, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alltabcolumnss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAllTabColumns', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAllTabColumns(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alltabcolumnss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});