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

import { DeterminantTablesService } from './determinant-tables.service';
import { DeterminantTables } from '../api-models/determinant-tables.model'
import { DeterminantTableses } from "../api-models/testing/fake-determinant-tables.model"

describe('DeterminantTablesService', () => {
  let injector: TestBed;
  let service: DeterminantTablesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeterminantTablesService]
    });
    injector = getTestBed();
    service = injector.get(DeterminantTablesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDeterminantTableses', () => {
    it('should return an Promise<DeterminantTables[]>', () => {
      const determinantTables = [
       {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantTable:'sample data', determinantColumn:'sample data', determinantDatatype:'sample data', subsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantTable:'sample data', determinantColumn:'sample data', determinantDatatype:'sample data', subsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantTable:'sample data', determinantColumn:'sample data', determinantDatatype:'sample data', subsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getDeterminantTableses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/determinanttableses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(determinantTables);
    });
  });


  describe('#createDeterminantTables', () => {
    var id = 1;
    it('should return an Promise<DeterminantTables>', () => {
      const determinantTables: DeterminantTables = {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantTable:'sample data', determinantColumn:'sample data', determinantDatatype:'sample data', subsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createDeterminantTables(determinantTables).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinanttableses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDeterminantTables', () => {
    var id = 1;
    it('should return an Promise<DeterminantTables>', () => {
      const determinantTables: DeterminantTables = {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantTable:'sample data', determinantColumn:'sample data', determinantDatatype:'sample data', subsInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateDeterminantTables(determinantTables, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinanttableses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDeterminantTables', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDeterminantTables(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinanttableses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});