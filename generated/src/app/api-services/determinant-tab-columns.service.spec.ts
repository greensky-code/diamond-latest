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

import { DeterminantTabColumnsService } from './determinant-tab-columns.service';
import { DeterminantTabColumns } from '../api-models/determinant-tab-columns.model'
import { DeterminantTabColumnss } from "../api-models/testing/fake-determinant-tab-columns.model"

describe('DeterminantTabColumnsService', () => {
  let injector: TestBed;
  let service: DeterminantTabColumnsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeterminantTabColumnsService]
    });
    injector = getTestBed();
    service = injector.get(DeterminantTabColumnsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDeterminantTabColumnss', () => {
    it('should return an Promise<DeterminantTabColumns[]>', () => {
      const determinantTabColumns = [
       {keyword:'sample data', determinantTable:'sample data', determinantColumn:'sample data', columnId:1234, datatype:'sample data', dataLength:1234, primaryKey:'sample data', columnPosition:1234, subsInd:'sample data'},
       {keyword:'sample data', determinantTable:'sample data', determinantColumn:'sample data', columnId:1234, datatype:'sample data', dataLength:1234, primaryKey:'sample data', columnPosition:1234, subsInd:'sample data'},
       {keyword:'sample data', determinantTable:'sample data', determinantColumn:'sample data', columnId:1234, datatype:'sample data', dataLength:1234, primaryKey:'sample data', columnPosition:1234, subsInd:'sample data'}

      ];
      service.getDeterminantTabColumnss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/determinanttabcolumnss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(determinantTabColumns);
    });
  });


  describe('#createDeterminantTabColumns', () => {
    var id = 1;
    it('should return an Promise<DeterminantTabColumns>', () => {
      const determinantTabColumns: DeterminantTabColumns = {keyword:'sample data', determinantTable:'sample data', determinantColumn:'sample data', columnId:1234, datatype:'sample data', dataLength:1234, primaryKey:'sample data', columnPosition:1234, subsInd:'sample data'};
      service.createDeterminantTabColumns(determinantTabColumns).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinanttabcolumnss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDeterminantTabColumns', () => {
    var id = 1;
    it('should return an Promise<DeterminantTabColumns>', () => {
      const determinantTabColumns: DeterminantTabColumns = {keyword:'sample data', determinantTable:'sample data', determinantColumn:'sample data', columnId:1234, datatype:'sample data', dataLength:1234, primaryKey:'sample data', columnPosition:1234, subsInd:'sample data'};
      service.updateDeterminantTabColumns(determinantTabColumns, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinanttabcolumnss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDeterminantTabColumns', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDeterminantTabColumns(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinanttabcolumnss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});