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

import { DeterminantValuesService } from './determinant-values.service';
import { DeterminantValues } from '../api-models/determinant-values.model'
import { DeterminantValueses } from "../api-models/testing/fake-determinant-values.model"

describe('DeterminantValuesService', () => {
  let injector: TestBed;
  let service: DeterminantValuesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeterminantValuesService]
    });
    injector = getTestBed();
    service = injector.get(DeterminantValuesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDeterminantValueses', () => {
    it('should return an Promise<DeterminantValues[]>', () => {
      const determinantValues = [
       {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantSequence:1234, operator:'sample data', valueFrom:'sample data', valueThru:'sample data', secDeterminantTable:'sample data', secDeterminantColumn:'sample data', secDeterminantDatatype:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantSequence:1234, operator:'sample data', valueFrom:'sample data', valueThru:'sample data', secDeterminantTable:'sample data', secDeterminantColumn:'sample data', secDeterminantDatatype:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantSequence:1234, operator:'sample data', valueFrom:'sample data', valueThru:'sample data', secDeterminantTable:'sample data', secDeterminantColumn:'sample data', secDeterminantDatatype:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getDeterminantValueses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/determinantvalueses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(determinantValues);
    });
  });


  describe('#createDeterminantValues', () => {
    var id = 1;
    it('should return an Promise<DeterminantValues>', () => {
      const determinantValues: DeterminantValues = {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantSequence:1234, operator:'sample data', valueFrom:'sample data', valueThru:'sample data', secDeterminantTable:'sample data', secDeterminantColumn:'sample data', secDeterminantDatatype:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createDeterminantValues(determinantValues).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinantvalueses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDeterminantValues', () => {
    var id = 1;
    it('should return an Promise<DeterminantValues>', () => {
      const determinantValues: DeterminantValues = {keyword:'sample data', seqRuleId:1234, searchSequence:1234, determinantSequence:1234, operator:'sample data', valueFrom:'sample data', valueThru:'sample data', secDeterminantTable:'sample data', secDeterminantColumn:'sample data', secDeterminantDatatype:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateDeterminantValues(determinantValues, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinantvalueses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDeterminantValues', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDeterminantValues(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinantvalueses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});