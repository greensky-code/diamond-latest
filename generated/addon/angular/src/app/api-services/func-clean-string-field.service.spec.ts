/* Copyright (c) 2021 . All Rights Reserved. */

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

import { FuncCleanStringFieldService } from './func-clean-string-field.service';
import { FuncCleanStringField } from '../api-models/func-clean-string-field.model'
import { FuncCleanStringFields } from "../api-models/testing/fake-func-clean-string-field.model"

describe('FuncCleanStringFieldService', () => {
  let injector: TestBed;
  let service: FuncCleanStringFieldService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncCleanStringFieldService]
    });
    injector = getTestBed();
    service = injector.get(FuncCleanStringFieldService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncCleanStringFields', () => {
    it('should return an Promise<FuncCleanStringField[]>', () => {
      const funcCleanStringField = [
       {pOriginalString:'sample data', pConvertForeign:'sample data', pEliminateControlChars:'sample data', pConvertToUpper:'sample data'},
       {pOriginalString:'sample data', pConvertForeign:'sample data', pEliminateControlChars:'sample data', pConvertToUpper:'sample data'},
       {pOriginalString:'sample data', pConvertForeign:'sample data', pEliminateControlChars:'sample data', pConvertToUpper:'sample data'}

      ];
      service.getFuncCleanStringFields().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funccleanstringfields/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcCleanStringField);
    });
  });


  describe('#createFuncCleanStringField', () => {
    var id = 1;
    it('should return an Promise<FuncCleanStringField>', () => {
      const funcCleanStringField: FuncCleanStringField = {pOriginalString:'sample data', pConvertForeign:'sample data', pEliminateControlChars:'sample data', pConvertToUpper:'sample data'};
      service.createFuncCleanStringField(funcCleanStringField).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funccleanstringfields`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncCleanStringField', () => {
    var id = 1;
    it('should return an Promise<FuncCleanStringField>', () => {
      const funcCleanStringField: FuncCleanStringField = {pOriginalString:'sample data', pConvertForeign:'sample data', pEliminateControlChars:'sample data', pConvertToUpper:'sample data'};
      service.updateFuncCleanStringField(funcCleanStringField, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funccleanstringfields/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncCleanStringField', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncCleanStringField(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funccleanstringfields/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});