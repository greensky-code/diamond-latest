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

import { AllTableService } from './all-table.service';
import { AllTable } from '../api-models/all-table.model'
import { AllTables } from "../api-models/testing/fake-all-table.model"

describe('AllTableService', () => {
  let injector: TestBed;
  let service: AllTableService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AllTableService]
    });
    injector = getTestBed();
    service = injector.get(AllTableService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAllTables', () => {
    it('should return an Promise<AllTable[]>', () => {
      const allTable = [
       {owners:'sample data', tableName:'sample data'},
       {owners:'sample data', tableName:'sample data'},
       {owners:'sample data', tableName:'sample data'}

      ];
      service.getAllTables().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/alltables/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(allTable);
    });
  });


  describe('#createAllTable', () => {
    var id = 1;
    it('should return an Promise<AllTable>', () => {
      const allTable: AllTable = {owners:'sample data', tableName:'sample data'};
      service.createAllTable(allTable).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alltables`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAllTable', () => {
    var id = 1;
    it('should return an Promise<AllTable>', () => {
      const allTable: AllTable = {owners:'sample data', tableName:'sample data'};
      service.updateAllTable(allTable, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alltables/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAllTable', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAllTable(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alltables/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});